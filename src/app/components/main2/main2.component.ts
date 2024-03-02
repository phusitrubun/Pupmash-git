import { Component } from '@angular/core';
import { HeaderComponent } from "../all-header/header/header.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-main2',
    standalone: true,
    templateUrl: './main2.component.html',
    styleUrl: './main2.component.scss',
    imports: [HeaderComponent, RouterLink]
})
export class Main2Component {

}
