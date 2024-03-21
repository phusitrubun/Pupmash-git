import { Component } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MashImageService } from '../../services/api/mash-image.service';
import { VoteService } from '../../services/api/vote.service';
import { Rank } from '../../model/voteResponse';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Header3Component } from '../all-header/header3/header3.component';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-chart-image',
  standalone: true,
  imports: [NgChartsModule, Header3Component, DatePipe, CommonModule, RouterLink, MatButtonModule],
  templateUrl: './chart-image.component.html',
  styleUrl: './chart-image.component.scss'
})
export class ChartImageComponent {
  dates: string[] = [];
  userId: any;
  id : any;
  Images: any = '';
  currentDate: Date = new Date();
  currentScore: number = 0;
  Puppy : Rank [] = [];
  constructor(private mashImageService: MashImageService, private vote: VoteService, private activeatedRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.id = this.activeatedRoute.snapshot.paramMap.get('id') || '';  
    console.log(this.id);
    


    // get the last 7 days
    for (let i = 7; i >= 1; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      this.dates.push(date.toDateString());
    }
    this.dates.push(new Date().toDateString());
  
    // Update current date every second
    // วันที่แบบเรียลไทม์
    setInterval(() => {
      this.currentDate  = new Date();
    }, 1000);
  
    this.getImgage(); // Call getImgage() here
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

        // // Create a temporary span element to measure the width of the content
        const tempSpan = document.createElement('span');
        // tempSpan.textContent = value;
        tempSpan.style.visibility = 'hidden'; // Ensure it's not visible

        document.body.appendChild(tempSpan);
        

        // Remove the temporary span from the DOM
        document.body.removeChild(tempSpan);
        // absolute increase value ^ , or decrease
        const tr2 = document.createElement('tr');
        tr2.style.backgroundColor = 'inherit';
        tr2.style.borderWidth = '0';

        const td2 = document.createElement('td');
        td2.style.borderWidth = '0';

        text2.appendChild(span2);
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


  public scatterChartData: ChartConfiguration<'scatter'>['data'] | undefined;


  
  public async getImgage() {
    try {      
      this.Images = await this.vote.chart_image(this.id);
      console.log(this.Images);

      this.updateScatterChartData();
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }


  // อัพเดตข้อมูลของรูปภาพลงในกราฟ
  private updateScatterChartData() {
    const datasets: { data: { x: any; y: any; }[]; label: any; fill: boolean; tension: number; borderColor: string; backgroundColor: string; pointStyle: HTMLCanvasElement; pointRadius: number; pointHoverRadius: number; showLine: boolean; }[] = [];
  
    this.Images.forEach((image: { ScoreArray: string; DateArray: string; name: any; url: string; }) => {
      const data: { x: any; y: any; }[] = [];
  
      const scoreArray = image.ScoreArray.split(',').map(Number);
      const dateArray = image.DateArray.split(',');
  
      if (scoreArray && dateArray) {
        for (let index = 0; index < dateArray.length; index++) {
          const currentDate = new Date(dateArray[index]).toDateString();
          const dateIndex = this.dates.indexOf(currentDate); 
          if (dateIndex !== -1) { 
            data.push({ x: dateIndex, y: scoreArray[index] }); 
          }
        }
      }
  
      const dataset = {
        data: data,
        label: image.name,
        fill: false,
        tension: 0.5,
        borderColor: this.getRandomColor(),
        backgroundColor: 'rgba(255,0,0,0.3)',
        pointStyle: this.createCanvas(image.url),
        pointRadius: 10,
        pointHoverRadius: 30,
        showLine: true,
      };
  
      datasets.push(dataset);
    });
  
    console.log(datasets);
  
    this.scatterChartData = { datasets: datasets };
  }
  
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
        text: '',
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
