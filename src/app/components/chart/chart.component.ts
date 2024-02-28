import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

import { ChartConfiguration, ChartOptions, PluginChartOptions } from 'chart.js';
import { Header3Component } from '../header3/header3.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgChartsModule, Header3Component],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  dates: string[] = [];
  ngOnInit(): void {
    
    // get the last 7 days
    for (let i = 8; i >= 1; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      this.dates.push(date.toDateString());
    }
    this.dates.push(new Date().toDateString());
  }

  getOrCreateTooltip = (chart: {
    canvas: {
      parentNode: {
        querySelector: (arg0: string) => any;
        appendChild: (arg0: any) => void;
      };
    };
  }) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
      tooltipEl.style.borderRadius = '3px';
      tooltipEl.style.color = 'white';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  externalTooltipHandler = (context: { chart: any; tooltip: any }) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = this.getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b: { lines: any }) => b.lines);

      const tableHead = document.createElement('thead');

      titleLines.forEach((title: string) => {
        const tr = document.createElement('tr');
        tr.style.borderWidth = '0';

        const th = document.createElement('th');
        th.style.borderWidth = '0';
        const text = document.createTextNode(title);

        th.appendChild(text);
        tr.appendChild(th);
        tableHead.appendChild(tr);
      });

      const tableBody = document.createElement('tbody');
      bodyLines.forEach((body: string, i: string | number) => {
        const colors = tooltip.labelColors[i];

        const span = document.createElement('span');
        span.style.background = colors.backgroundColor;
        span.style.borderColor = colors.borderColor;
        span.style.borderWidth = '2px';
        span.style.marginRight = '10px';
        span.style.height = '10px';
        span.style.width = '10px';
        span.style.display = 'inline-block';

        const tr = document.createElement('tr');
        tr.style.backgroundColor = 'inherit';
        tr.style.borderWidth = '0';

        const td = document.createElement('td');
        td.style.borderWidth = '0';

        // create custom text 1
        const text1 = document.createTextNode(`${body[0].split(':')[0]}`);

        td.appendChild(span);
        td.appendChild(text1);
        tr.appendChild(td);
        tableBody.appendChild(tr);

        // create custom text 2
        const value = body[0].split(', ')[1].slice(0, -1);
        const isIncrease = parseInt(value.replace(',', '')) > 1000;
        const text3 = document.createElement('div');
        text3.style.position = 'relative';
        const text2 = document.createElement('div');
        text2.textContent = `Score: ${value}`;
        text2.style.position = 'relative';
        text2.style.padding = '5px';

        const span2 = document.createElement('span');
        span2.textContent = isIncrease ? '↑' : '↓';
        span2.style.top = `-10px`;
        span2.style.right = '10px';
        span2.style.color = isIncrease ? '#4caf50' : '#f44336';
        span2.style.fontSize = '12px';

        // new span value text position follow span2
        const spanValue = document.createElement('span');
        spanValue.textContent = value;
        spanValue.style.textAlign = 'right';
        spanValue.style.fontSize = '10px';
        spanValue.style.position = 'absolute';
        spanValue.style.top = `0px`;
        // Create a temporary span element to measure the width of the content
        const tempSpan = document.createElement('span');
        tempSpan.textContent = value;
        tempSpan.style.visibility = 'hidden'; // Ensure it's not visible

        // Append the temporary span to the body to calculate its width
        document.body.appendChild(tempSpan);
        const width = tempSpan.offsetWidth; // Get the calculated width

        // Remove the temporary span from the DOM
        document.body.removeChild(tempSpan);

        // Set the right property based on the calculated width
        spanValue.style.right = `-${width / 2 - 9}px`;
        spanValue.style.color = isIncrease ? '#4caf50' : '#f44336';

        // absolute increase value ^ , or decrease
        const tr2 = document.createElement('tr');
        tr2.style.backgroundColor = 'inherit';
        tr2.style.borderWidth = '0';

        const td2 = document.createElement('td');
        td2.style.borderWidth = '0';

        text2.appendChild(span2);
        text3.appendChild(spanValue);
        text3.appendChild(text2);
        td2.appendChild(text3);
        tr2.appendChild(td2);
        tableBody.appendChild(tr2);
      });

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  createCanvas(src: string) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.width = 30;
    img.height = 30;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.beginPath();
        ctx.arc(img.width / 2, img.height / 2, img.width / 2, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, 0, 0, img.width, img.height);
      }
    };
    img.src = src;
    return canvas;
  }

  Images = [
    {
      name: 'bulldog',
      imageURL: 'https://dooplearn.com/wp-content/uploads/2023/01/pitbull-terrier-007.webp',
      score: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000)),
    },
    {
      name: 'samoyed',
      imageURL: 'https://t1.blockdit.com/photos/2022/01/61f17400b0d3b7b013b31f0a_800x0xcover_2BeCt6zH.jpg',
      score: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000)),
    },
    {
      name: 'french-bulldog',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQJmk0zj6MyBQ_yjQmBvTyW2gsmmGI95k9UfAWRvomBC0uhts2',
      score: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000)),
    },
    {
      name: 'test4',
      imageURL: 'https://s.isanook.com/ca/0/ud/281/1406195/mayormax1_182115849_324778162.jpg?ip/resize/w728/q80/jpg',
      score: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000)),
    },
    {
      name: 'test5',
      imageURL: 'https://assets-global.website-files.com/61c1522cd03553569e619b01/649bea677ec0e0d990ac1b90_%E0%B8%A3%E0%B8%A7%E0%B8%A1%203%20%E0%B8%AA%E0%B8%B2%E0%B8%A2%E0%B8%9E%E0%B8%B1%E0%B8%99%E0%B8%98%E0%B8%B8%E0%B9%8C%E0%B8%99%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A1%E0%B8%B2%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%83%E0%B8%84%E0%B8%A3%20%E0%B9%86%20%E0%B9%80%E0%B8%AB%E0%B9%87%E0%B8%99%E0%B9%80%E0%B8%9B%E0%B9%87%E0%B8%99%E0%B8%95%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AB%E0%B8%A5%E0%B8%87%E0%B8%A3%E0%B8%B1%E0%B8%81-01.jpg',
      score: Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000)),
    },
  ];

  public scatterChartData: ChartConfiguration<'scatter'>['data'] = {
    datasets: this.Images.map((image) => {
      return {
        data: image.score.map((score, index) => {
          return { x: index + 1, y: score };
        }),
        label: image.name,
        fill: false,
        tension: 0.5,
        borderColor: this.getRandomColor(),
        backgroundColor: 'rgba(255,0,0,0.3)',
        pointStyle: this.createCanvas(image.imageURL),
        pointRadius: 10,
        pointHoverRadius: 30,
        showLine: true,
      };
    }),
  };

  public scatterChartOptions: ChartOptions<'scatter'> = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        min: 0.6,
        max: 7.3,
        ticks: {
          // color of date
          color: '#000',
          font: {
            size: 10,
            weight: 700,
          },
          callback: (value: any, index: any, values: any) => {
            if (index == 0 || index == 8) return '';
            return this.dates[index] + '';
          },
        },
      },
      y: {
        ticks: {
          // color of score
          color: '#000',
          font: {
            size: 10,
            weight: 700,
          },
        },
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Score vs Date',
        color: '#000',
        font: {
          size: 20,
          weight: 700,
        },
      },
      legend: {
        display: false,
        labels: {
          color: '#fff',
          font: {
            size: 20,
            weight: 700,
          },
        },
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: this.externalTooltipHandler,
      },
    },
  };

  public scatterChartLegend = false;
  public scatterChartPlugins: ChartConfiguration<'scatter'>['plugins'] = [
    {
      id: 'customCanvasBackgroundColor',
      beforeDraw: (chart, args, options) => {
        const { ctx } = chart;
        ctx.save();
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = 'rgb(255, 237, 136)';
        ctx.fillRect(0, 0, chart.width, chart.height);
        ctx.restore();
      },
    },
  ];
}
