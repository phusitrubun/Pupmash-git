import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-profile',
    standalone: true,
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss',
    imports: [CommonModule, HeaderComponent, MatIconModule, RouterLink]
})
export class ProfileComponent {

}
