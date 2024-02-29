import { Component } from '@angular/core';
import { Header3Component } from "../all-header/header3/header3.component";
import { HeaderComponent } from "../all-header/header/header.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.scss',
    imports: [Header3Component, HeaderComponent]
})
export class MainComponent {

}
