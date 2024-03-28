import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ImageGetResponse } from '../../../model/ImageGetResponse';
import { MashImageService } from '../../../services/api/mash-image.service';
import { CommonModule } from '@angular/common';
import Elo from '@studimax/elo';

@Component({
  selector: 'app-winner-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './winner-dialog.component.html',
  styleUrl: './winner-dialog.component.scss'
})
export class WinnerDialogComponent implements OnInit{
[x: string]: any;
  player1: ImageGetResponse | undefined;
  player2: ImageGetResponse | undefined;
  image : ImageGetResponse | undefined;
  

  diff : number = 0;
  oldScore:number = 0;
  Ra: number | undefined;
  Rb: number | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mashImageService: MashImageService){}


  ngOnInit(): void {
    this.calculate(this.data.winnerId, this.data.loserId);
  
  }
  
  
  async getImage(id : any){
    this.image = await this.mashImageService.getImage(id);
  }
  
  async calculate(winnerId: number, loserId: number) {
   

    this.player1 = await this.mashImageService.getImage(winnerId);
    this.player2 = await this.mashImageService.getImage(loserId);

    const elo = new Elo();
    const {Ra, Rb} = elo.calculateRating(this.player1.score, this.player2.score, 1);

    this.Ra = Math.floor(Ra);
    this.Rb = Math.floor(Rb);

    this.diff = Math.floor(Ra - this.player1.score);
    this.oldScore = Math.floor(this.player1.score);

    
    this.rating(Ra,Rb);

  }
  
  Ea: number = 0;
  Eb: number = 0;
  
  async rating(Ra: number, Rb: number) {
    this.Ea = +(1 / (1 + Math.pow(10, (Rb - Ra) / 400))).toFixed(4);
    this.Eb = +(1 / (0 + Math.pow(10, (Ra - Rb) / 400))).toFixed(4);

    

  }
  

}

