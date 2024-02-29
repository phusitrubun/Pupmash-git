import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Header3Component } from '../all-header/header3/header3.component';
import { UserGetResponse } from '../../model/UserGetResponse';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [CommonModule, Header3Component, MatIconModule, RouterLink]
})
export class ProfileComponent {
    user: UserGetResponse | undefined;
    id: number = 0;

    constructor() {
        const userIdString = localStorage.getItem('userID');
        if (userIdString) {
            this.id = parseInt(userIdString, 10);
            console.log("User : ",this.id);
        }
    }
}