import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Elo from '@studimax/elo';
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
    this.calculate(this.data.winnerId, this.data.loserId);
  }
  
  
  async getImage(id : any){
    this.image = await this.mashImageService.getImage(id);
    // console.log(this.image);
  }
  
  async calculate(winnerId: number, loserId: number) {
    const elo = new Elo();

    this.player1 = await this.mashImageService.getImage(winnerId);
    this.player2 = await this.mashImageService.getImage(loserId);
    
    const {Ra, Rb} = elo.calculateRating(this.player1.score, this.player2.score, 1);
    
    this.Ra = Ra; // กำหนดค่า Ra
    this.Rb = Rb; // กำหนดค่า Rb
    
    this.diff = Math.floor(this.Ra - this.player1.score);
    this.oldScore = this.player1.score;
    
    this.rating(this.Ra, this.Rb);
    
    // console.log("winner score : ", Ra);
    // console.log("loser score : ", Rb);
    this.recordStat(this.data.winnerId, this.data.loserId, this.Ra, this.Rb);
  }
  
  Ea: number = 0;
  Eb: number = 0;
  
  async rating(Ra: number, Rb: number) {
    this.Ea = 1 / (1 + Math.pow(10, (Rb - Ra) / 400));
    this.Eb = 1 / (1 + Math.pow(10, (Ra - Rb) / 400));
    
    // console.log(this.Ea);
    // console.log(this.Eb);
  }
  
  async recordStat(winnerId: number, loserId: number, Ra: number, Rb: number){
    // console.log(Ra, Rb);
    
    let date = new Date();
    date.setHours(date.getHours() + 7);
    let updateDate = date.toISOString().slice(0, 19).replace('T', ' ');
  
    const data1 = {
      score : Ra,
      DateTime : updateDate ,
      imageID : winnerId
    }
  
    await this.mashImageService.recordStat(data1);
  
    const data2 = {
      score : Rb,
      DateTime : updateDate ,
      imageID : loserId
    }
    await this.mashImageService.recordStat(data2);
  }
  


}

