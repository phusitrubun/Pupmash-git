import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../all-header/header/header.component';
import { Header2Component } from '../../all-header/header2/header2.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthenService } from '../../../services/api/authen.service';
import * as bcrypt from "bcryptjs";
import Swal from 'sweetalert2';
import { UploadTableImage } from '../../../services/api/upload-taimage.service';


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
  user: any;
  id: number | undefined;
  someurl: any;
  file!: File;

  constructor(private authenService: AuthenService, private router : Router, private upload : UploadTableImage) {}

  ngOnInit(): void {


  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.readURL(file);
    }
  }

  readURL(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  async signUp() {
    const dbemail = await this.authenService.checkUser(this.email);
    if (!dbemail) {
        const saltRound = 10;
        try {
            // Display "Please wait" SweetAlert
            Swal.fire({
                title: 'Please wait...',
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });

            this.someurl = await this.upload.urlImageProfile(this.file);
            console.log(this.someurl.file);

            const hashedPassword = await bcrypt.hash(this.password, saltRound);
            const data = {
                name: this.name,
                email: this.email,
                password: hashedPassword,
                image: this.someurl.file,
                type: 1,
            };

            await this.authenService.InsertUser(data);

            // Close the SweetAlert when the operation is complete
            Swal.close();

            // Show Sweet Alert for successful signup
            Swal.fire({
                icon: 'success',
                title: 'Sign Up Successful',
                showConfirmButton: false,
                timer: 1500
            });

            const user = await this.authenService.checkUser(this.email);
            if (user) {
                const userId = user.userID;
                localStorage.setItem('userID', userId.toString());
                this.router.navigate(['mash']);
            }
        } catch (error) {
            console.error(error);
            // Close the SweetAlert on error
            Swal.close();
            // Show an error message
            Swal.fire('Error!', 'An error occurred. Please try again.', 'error');
        }
    } else {
        // If the email is already in the database, show a Sweet Alert
        Swal.fire({
            icon: 'warning',
            title: 'Email Exists',
            text: 'This email is already registered in the system. Please use a different email.',
            confirmButtonText: 'OK'
        });
    }
}


}
