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
  imageUrl: string = "";

  constructor() { }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.readURL(file);
    }
  }

  readURL(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}
