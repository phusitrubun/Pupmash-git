import { Component } from '@angular/core';
import { Header3Component } from "../all-header/header3/header3.component";

@Component({
    selector: 'app-upload',
    standalone: true,
    templateUrl: './upload.component.html',
    styleUrl: './upload.component.scss',
    imports: [Header3Component]
})
export class UploadComponent {

}
