import { Component } from '@angular/core';
import { Header3Component } from "../header3/header3.component";

@Component({
    selector: 'app-profilem',
    standalone: true,
    templateUrl: './profilem.component.html',
    styleUrl: './profilem.component.scss',
    imports: [Header3Component]
})
export class ProfilemComponent {
  imageUrl: string = "../../../assets/Puppy/happy.png";

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
