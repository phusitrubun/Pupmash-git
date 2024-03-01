import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Header3Component } from '../all-header/header3/header3.component';
import { UserGetResponse } from '../../model/UserGetResponse';
import { AuthenService } from '../../services/api/authen.service';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [CommonModule, Header3Component, MatIconModule, RouterLink]
})
export class ProfileComponent implements OnInit {
    user: UserGetResponse | undefined;
    id: number = 0;
    userprofile : UserGetResponse | undefined;

    constructor(private authenService: AuthenService) {
    }
    ngOnInit(): void {
        const userIdString = localStorage.getItem('userID');
        if (userIdString) {
            this.id = parseInt(userIdString);
            console.log("User : ",this.id);
    
        }
        this.getUser(this.id);
    }
    
    
    async getUser(id : number){
        this.userprofile = await this.authenService.getUser(id);
        console.log(this.userprofile);
        
    }
}