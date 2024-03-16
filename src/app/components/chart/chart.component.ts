import { Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';

import { ChartConfiguration, ChartOptions, PluginChartOptions } from 'chart.js';
import { Header3Component } from '../all-header/header3/header3.component';
import { MashImageService } from '../../services/api/mash-image.service';
import { CommonModule, DatePipe } from '@angular/common';
import { VoteService } from '../../services/api/vote.service';
import { Rank } from '../../model/voteResponse';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [NgChartsModule, Header3Component, DatePipe, CommonModule, RouterLink, MatButtonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit {
  dates: string[] = [];
  userId: any;
  id:number = 0;
  Images: any = '';
  currentDate: Date = new Date();
  currentScore: number = 0;
  Puppy : Rank [] = [];
  constructor(private mashImageService: MashImageService, private vote:VoteService){}
  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
        if (userIdString) {
            this.id = parseInt(userIdString);
            console.log("User : ",this.id);

        }
        this.getImgage();

    // get the last 7 days
    for (let i = 7; i >= 1; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      this.dates.push(date.toDateString());
    }
    this.dates.push(new Date().toDateString());

    // Update current date every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
    
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

    // Calculate current score for each puppy
    
    // if (this.Puppy && this.Puppy.length > 0) {
    //   for (let i = 0; i < this.Puppy.length; i++) {
    //     const item = this.Puppy[i];
    //     item.currentScore = item.today_score - (item.yesterday_score || item.today_score);

    //     console.log(`Current score for ${item.name}: ${item.currentScore}`);
    //   }
    // }
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
        // spanValue.textContent = currentScore.toString();
        spanValue.style.textAlign = 'right';
        spanValue.style.fontSize = '10px';
        spanValue.style.position = 'absolute';
        spanValue.style.top = `0px`;
        // Create a temporary span element to measure the width of the content
        const tempSpan = document.createElement('span');
        // tempSpan.textContent = value;
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

  // Images: any[] = []; // Initialize Images with an empty array

  public scatterChartData: ChartConfiguration<'scatter'>['data'] | undefined;

  public async getImgage() {
    try {
      this.Images = await this.mashImageService.stattistic(this.id);
      console.log(this.Images);

      this.updateScatterChartData();
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  private updateScatterChartData() {
    const datasets: { data: { x: number; y: any; }[]; label: any; fill: boolean; tension: number; borderColor: string; backgroundColor: string; pointStyle: HTMLCanvasElement; pointRadius: number; pointHoverRadius: number; showLine: boolean; }[] = [];

    this.Images.forEach((image: { ScoreArray: string; name: any; url: string;}) => {
        // Initialize data array inside the loop
        const data: { x: number; y: any; }[] = [];

        // แปลง ScoreArray ให้เป็นอาร์เรย์ของตัวเลข
        const scoreArray = image.ScoreArray.split(',').map(Number);
        if (scoreArray) {
            for (let index = 7; index >= 0; index--) {
                const scoreIndex = scoreArray.length - 1 - index;
                if (scoreIndex >= 0) {
                    data.push({ x: 7 - index, y: scoreArray[scoreIndex] });
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

        datasets.push(dataset); // Push the dataset object once after iterating through all scores
    });

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
