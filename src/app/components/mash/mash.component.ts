import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { MashImageService } from '../../services/api/mash-image.service';
import { ImageGetResponse } from '../../model/ImageGetResponse';
import { CommonModule } from '@angular/common';
import Elo from '@studimax/elo';
import { AuthenService } from '../../services/api/authen.service';


@Component({
  selector: 'app-mash',
  standalone: true,
  templateUrl: './mash.component.html',
  styleUrl: './mash.component.scss',
  imports: [Header3Component, CommonModule],
})
export class MashComponent implements OnInit {
  images: ImageGetResponse[] = [];
  imageleft: ImageGetResponse | undefined;
  imageRight: ImageGetResponse | undefined;
  image: ImageGetResponse | undefined;
  loser:ImageGetResponse | undefined;
  winnerId : number = 0;
  loserId : number = 0

  player1: ImageGetResponse | undefined;
  player2: ImageGetResponse | undefined;
  

  constructor(private mashImageService: MashImageService, private authenService: AuthenService) {}

  ngOnInit(): void {
    this.getImage();
  }

  async getImage() {
    this.images = await this.mashImageService.random();

    console.log(this.images);
    
    if (this.images.length > 0) {
      this.image = this.images[0];
      if (this.images.length > 1) {
        this.imageleft = this.images[0];
        this.imageRight = this.images[1];
      }
    }
  }


  async winner(winnerId : number) {
    this.loser = this.images.find((image) => image.imageID != winnerId)
    this.winnerId = winnerId;
    this.loserId = this.loser!.imageID;

    console.log(this.loserId);
    console.log(this.winnerId);
    
    
    this.getImage();
    this.calculate(winnerId, this.loserId);
    
}

async calculate(winnerId: number, loserId: number) {
    const elo = new Elo();
    
    this.player1 = await this.mashImageService.getImage(winnerId);
    this.player2 = await this.mashImageService.getImage(loserId);
    
    const {Ra, Rb} = elo.calculateRating(this.player1.score, this.player2.score, 1);

    // Log the updated ratings
    console.log('Player 1 new rating:', Ra);
    console.log('Player 2 new rating:', Rb);
  }
  
}
