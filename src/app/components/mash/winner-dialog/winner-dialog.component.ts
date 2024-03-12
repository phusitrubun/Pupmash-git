import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ImageGetResponse } from '../../../model/ImageGetResponse';
import { MashImageService } from '../../../services/api/mash-image.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-winner-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './winner-dialog.component.html',
  styleUrl: './winner-dialog.component.scss'
})
export class WinnerDialogComponent implements OnInit{
  player1: ImageGetResponse | undefined;
  player2: ImageGetResponse | undefined;
  image : ImageGetResponse | undefined;
  
  Ra: number | undefined;
  Rb: number | undefined;

  diff : number = 0;
  oldScore:number = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mashImageService: MashImageService){}


  ngOnInit(): void {
    this.calculate(this.data.winnerId, this.data.loserId, this.data.Ra, this.data.Rb);
    console.log('thisthsths');
    console.log( this.data.Ra, this.data.Rb);
    
    
  }
  
  
  async getImage(id : any){
    this.image = await this.mashImageService.getImage(id);
    // console.log(this.image);
  }
  
  async calculate(winnerId: number, loserId: number, Ra : number, Rb : number) {
   

    this.player1 = await this.mashImageService.getImage(winnerId);
    this.player2 = await this.mashImageService.getImage(loserId);
    
    // this.Ra = this.data.Ra; // กำหนดค่า Ra
    // this.Rb = this.data.Rb; // กำหนดค่า Rb
    
    this.diff = Math.floor(Ra - this.player1.score);
    this.oldScore = this.player1.score;
    
    this.rating(Ra,Rb);
    
    // console.log("winner score : ", Ra);
    // console.log("loser score : ", Rb);
   
  }
  
  Ea: number = 0;
  Eb: number = 0;
  
  async rating(Ra: number, Rb: number) {
    this.Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400));
    this.Eb = 1 / (0 + Math.pow(10, (Ra - Rb) / 400));
    
    // console.log(this.Ea);
    // console.log(this.Eb);
  }
  

}

