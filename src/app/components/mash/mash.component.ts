    import { Component, OnInit } from '@angular/core';
    import { Header3Component } from '../all-header/header3/header3.component';
    import { MashImageService } from '../../services/api/mash-image.service';
    import { ImageGetResponse } from '../../model/ImageGetResponse';
    import { CommonModule } from '@angular/common';
    import Elo from '@studimax/elo';
    import { AuthenService } from '../../services/api/authen.service';
    import { MatDialog, MatDialogModule } from '@angular/material/dialog';
    import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';
    import { DeviceUUID } from 'device-uuid';

    @Component({
    selector: 'app-mash',
    standalone: true,
    templateUrl: './mash.component.html',
    styleUrl: './mash.component.scss',
    imports: [Header3Component, CommonModule, MatDialogModule],
    })
    export class MashComponent implements OnInit {
    images: ImageGetResponse[] = [];
    imageleft: ImageGetResponse | undefined;
    imageRight: ImageGetResponse | undefined;
    image: ImageGetResponse | undefined;
    loser: ImageGetResponse | undefined;
    winnerId: number = 0;
    loserId: number = 0;
    userIdString: string = ''; // Define userIdString as a class property

    lastWinnerId: number = 0;
    lastWinnerTimestamp: number | undefined;

    constructor(
        private mashImageService: MashImageService,
        private authenService: AuthenService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getUserId(); // Call getUserId to retrieve or generate userIdString
        this.getImage();
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

    async getImage() {
        this.images = await this.mashImageService.random();

        if (this.images.length > 0) {
        this.image = this.images[0];
        if (this.images.length > 1) {
            this.imageleft = this.images[0];
            this.imageRight = this.images[1];
        }
        }
    }

    votedImageIds: number[] = []; // สร้างอาร์เรย์เก็บรหัสรูปภาพที่ถูกโหวตไปแล้ว

    openWinnerDialog(winnerId: number, loserId: number) {
        // ตรวจสอบว่ารูปนี้ถูกโหวตไปแล้วหรือไม่
        if (this.votedImageIds.includes(winnerId)) {
            console.log("You have already voted for this image.");
            // this.getImage(); 
        }

        const dialogRef = this.dialog.open(WinnerDialogComponent, {
            width: '40vw',
            height: '60vh',
            data: { winnerId: winnerId, loserId: loserId }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            // this.getImage(); 
        });

        // เพิ่มรหัสรูปภาพที่โหวตไปแล้วลงในอาร์เรย์
        this.votedImageIds.push(winnerId);

        // ระงับการโหวตเป็นเวลาที่กำหนด (เช่น 10 วินาที)
        setTimeout(async () => {
            const index = this.votedImageIds.indexOf(winnerId);
            if (index !== -1) {
                this.votedImageIds.splice(index, 1);
                this.images = await this.mashImageService.randomexcept(this.votedImageIds);
            }
        }, 120000); // 10 วินาที
        
        this.getImage();
        this.mashImageService.calculateElo(winnerId, loserId);
        this.record(winnerId, loserId);
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
    }
