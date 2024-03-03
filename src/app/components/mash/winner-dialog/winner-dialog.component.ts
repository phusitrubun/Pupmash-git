import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Elo from '@studimax/elo';
import { ImageGetResponse } from '../../../model/ImageGetResponse';
import { MashImageService } from '../../../services/api/mash-image.service';

@Component({
  selector: 'app-winner-dialog',
  standalone: true,
  imports: [],
  templateUrl: './winner-dialog.component.html',
  styleUrl: './winner-dialog.component.scss'
})
export class WinnerDialogComponent implements OnInit{
  player1: ImageGetResponse | undefined;
  player2: ImageGetResponse | undefined;
  image : ImageGetResponse | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mashImageService: MashImageService){}
  
  
  ngOnInit(): void {
    console.log(this.data);
    this.getImage(this.data);
    console.log(this.image);
    
  }


  async getImage(id : any){
    this.image = await this.mashImageService.getImage(this.data);
    console.log(this.image); 
  }

  async calculate(winnerId: number, loserId: number) {
    const elo = new Elo();

    this.player1 = await this.mashImageService.getImage(winnerId);
    this.player2 = await this.mashImageService.getImage(loserId);

    const {Ra, Rb} = elo.calculateRating(this.player1.score, this.player2.score, 1);

    // Log the updated ratings
  }

    
}

