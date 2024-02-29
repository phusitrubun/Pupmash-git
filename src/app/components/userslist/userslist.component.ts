import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header4Component } from "../all-header/header4/header4.component";
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-userslist',
    standalone: true,
    templateUrl: './userslist.component.html',
    styleUrl: './userslist.component.scss',
    imports: [CommonModule,  Header4Component, MatIconModule, RouterLink]
})
export class UserslistComponent {

}
