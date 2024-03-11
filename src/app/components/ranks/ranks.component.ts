import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { RouterLink } from '@angular/router';
import { ImageGetResponse } from '../../model/ImageGetResponse';
import { MashImageService } from '../../services/api/mash-image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranks',
  standalone: true,
  imports: [Header3Component, RouterLink, CommonModule],
  templateUrl: './ranks.component.html',
  styleUrl: './ranks.component.scss'
})
export class RanksComponent implements OnInit {
  Puppy : ImageGetResponse [] = [];
  currentDate: Date = new Date();
  
  
  constructor(private mashImageService: MashImageService){}
  
  
  ngOnInit(): void {
    this.getPuppy();

    // Update current date every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  async getPuppy(){
    this.Puppy = await this.mashImageService.getRanks();
    console.log(this.Puppy);
    
  }  

}
