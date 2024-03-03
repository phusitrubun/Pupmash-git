import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header3Component } from '../all-header/header3/header3.component';
import { UserGetResponse } from '../../model/UserGetResponse';
import { AuthenService } from '../../services/api/authen.service';
import { AdminService } from '../../services/api/admin.service';
import { ImageUserUpload } from '../../model/ImageGetResponse';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [CommonModule, Header3Component, MatIconModule, RouterLink ]
})
export class ProfileComponent implements OnInit {
    id: number = 0;
    useruserID = '';
    userprofile : UserGetResponse | undefined;
    userImages : ImageUserUpload [] =[];

    constructor(private authenService: AuthenService, private activeatedRoute: ActivatedRoute, private adminServeice : AdminService) {
    }
    ngOnInit(): void {
        this.useruserID = this.activeatedRoute.snapshot.paramMap.get('id') || '';
        this.getUser(this.useruserID);
        this.getImageUserUpload(this.useruserID);
    }

    goBack() {
        window.history.back();
    }


    async getUser(id : any){
        this.userprofile = await this.authenService.getUser(id);
        console.log(this.userprofile);
    }
    
    async getImageUserUpload(id : any){
        this.userImages = await this.adminServeice.getImageUser(id);
        console.log(this.userImages);
        
    }

   
}
