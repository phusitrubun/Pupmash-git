import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Header2Component } from "../header2/header2.component";
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-signup',
    standalone: true,
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
    imports: [HeaderComponent, Header2Component,RouterLink]
})
export class SignupComponent {
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
