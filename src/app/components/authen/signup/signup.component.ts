import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../all-header/header/header.component';
import { Header2Component } from '../../all-header/header2/header2.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../../../services/api/authen.service';
import * as bcrypt from "bcryptjs";

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  imports: [
    HeaderComponent,
    Header2Component,
    RouterLink,
    CommonModule,
    FormsModule,
  ],
})
export class SignupComponent implements OnInit {
  imageUrl: string = '../../../assets/Puppy/happy.png';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authenService: AuthenService, private router : Router) {}

  ngOnInit(): void {}

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

  async signUp() {
    const dbemail = await this.authenService.checkUser(this.email);
    if (!dbemail) {
      const saltRound = 10;
      const hashedPassword = await bcrypt.hash(this.password, saltRound);
      const data = {
        name: this.name,
        email: this.email,
        password: hashedPassword,
        image: this.imageUrl,
        type: 1,
      };
      this.authenService.InsertUser(data);
      this.router.navigate(['profile']);
    }
  }
}
