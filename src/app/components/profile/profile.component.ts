import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Header3Component } from '../header3/header3.component';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [CommonModule, Header3Component, MatIconModule, RouterLink]
})
export class ProfileComponent {

}
