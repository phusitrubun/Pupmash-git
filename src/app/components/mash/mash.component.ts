import { Component, OnInit } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { MashImageService } from '../../services/api/mash-image.service';
import { ImageGetResponse, ImageUserUpload } from '../../model/ImageGetResponse';
import { CommonModule } from '@angular/common';
import Elo from '@studimax/elo';
import { AuthenService } from '../../services/api/authen.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';
import { DeviceUUID } from 'device-uuid';
import { MatButtonModule } from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/api/admin.service';


@Component({
  selector: 'app-mash',
  standalone: true,
  templateUrl: './mash.component.html',
  styleUrl: './mash.component.scss',
  imports: [Header3Component, CommonModule, MatDialogModule, MatButtonModule,MatSlideToggleModule, FormsModule],
})
export class MashComponent implements OnInit {
  images: ImageGetResponse[] = [];
  imageLeft: ImageGetResponse | undefined;
  imageRight: ImageGetResponse | undefined;
  image: ImageGetResponse | undefined;
  loser: ImageGetResponse | undefined;
  winnerId: number = 0;
  loserId: number = 0;
  userIdString: string = ''; // Define userIdString as a class property


  lastWinnerId: number = 0;
  lastWinnerTimestamp: number | undefined;

  hidecalculate : boolean = false;
  selectedImages : number[] = [];

  picture : ImageGetResponse | undefined;
  player1: ImageGetResponse | undefined;
  player2: ImageGetResponse | undefined;
  Ra : number = 0;
  Rb : number = 0;

  constructor(
    private mashImageService: MashImageService,
    private adminService: AdminService,
    public dialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.getUserId(); // Call getUserId to retrieve or generate userIdString
      this.getImage();
    }

    // close function celculate
    hideCalculation() {
      this.hidecalculate = true;
    }


  getUserId(): void {
    // Check LocalStorage
    this.userIdString = localStorage.getItem('userID') || '';

    // If userID is not found in LocalStorage, generate a new one
    if (!this.userIdString) {
      const deviceUUID = new DeviceUUID();
      this.userIdString = deviceUUID.get();
      localStorage.setItem('userID', this.userIdString);
    }
  }

  async getImages(id : any){
    this.picture = await this.mashImageService.getImage(id);
    // console.log(this.image);
  }


  async getImage() {
    this.images = await this.mashImageService.random();

    if (this.images.length > 0) {
      if (this.images.length > 1) {
          this.imageLeft = this.images[0];
          this.imageRight = this.images[1];
      }
    }
    // console.log(this.images);
    // console.log(this.selectedImages);

}


  async openWinnerDialog(winnerId: number, loserId: number) {
    this.selectedImages.push(winnerId);

    this.player1 = await this.mashImageService.getImage(winnerId);
    this.player2 = await this.mashImageService.getImage(loserId);
    const elo = new Elo();
    const {Ra, Rb} = elo.calculateRating(this.player1.score, this.player2.score, 1);

    this.Ra = Ra;
    this.Rb = Rb;

    this.mashImageService.calculateElo(winnerId, loserId);
    if (!this.hidecalculate) {
      const dialogRef = this.dialog.open(WinnerDialogComponent, {
        width: '40vw',
        height: '60vh',
        data: { winnerId: winnerId, loserId: loserId, Ra : Ra, Rb: Rb },
      });
      // this.selectedImages.push(winnerId);
      dialogRef.afterClosed().subscribe(async (result) => {
        console.log('The dialog was closed');
        
      });
    } 
    this.record(winnerId, loserId);
    this.recordStat(winnerId, loserId, this.Ra, this.Rb)
    this.getImage();
  }

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  //   record vote
  currentDate: string = new Date().toISOString().slice(0, 19).replace('T', ' ');
  async record(winnerId: number, loserId: number) {
    const data = {
      userID: this.userIdString, // Use userIdString obtained from getUserId()
      imageID: winnerId,
      voteDate: this.currentDate,
      winner: winnerId,
      loser: loserId,
    };
    await this.mashImageService.recordVote(data);
  }


  // record stat
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
