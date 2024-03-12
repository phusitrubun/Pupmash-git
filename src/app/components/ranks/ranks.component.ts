import { VoteService } from './../../services/api/vote.service';
import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { RouterLink } from '@angular/router';
import { ImageGetResponse } from '../../model/ImageGetResponse';
import { MashImageService } from '../../services/api/mash-image.service';
import { CommonModule } from '@angular/common';
// import { VoteService } from '../../services/api/vote.service';
import { Rank } from '../../model/voteResponse';

@Component({
  selector: 'app-ranks',
  standalone: true,
  imports: [Header3Component, RouterLink, CommonModule],
  templateUrl: './ranks.component.html',
  styleUrl: './ranks.component.scss'
})
export class RanksComponent implements OnInit {
  Puppy : Rank [] = [];
  currentDate: Date = new Date();
  currentScore: number = 0;
  currentRank: number = 0;
  userID:any;
  constructor(private mashImageService: MashImageService, private vote:VoteService){}


  ngOnInit(): void {
    this.getPuppy();

    // Update current date every second
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }

  async getPuppy(){
    this.Puppy = await this.vote.voteshow();
    console.log(this.Puppy);
    for (let i = 0; i < this.Puppy.length; i++) {
      const item = this.Puppy[i];
      item.currentScore = item.today_score - item.yesterday_score;
      console.log(`Current score for ${item.name}: ${item.currentScore}`);

      item.currentRank = item.yesterday_rank - item.today_rank  ;
      console.log(`Current rank for ${item.name}: ${item.currentRank}`);
    }

  }

  // async voteshow() {

  // }
}
