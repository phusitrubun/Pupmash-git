import { Component } from '@angular/core';
import { Header3Component } from "../all-header/header3/header3.component";

@Component({
    selector: 'app-mash',
    standalone: true,
    templateUrl: './mash.component.html',
    styleUrl: './mash.component.scss',
    imports: [Header3Component]
})
export class MashComponent {

}
