// import { Update } from './../../model/ImageGetResponse';
import { Component, OnInit } from '@angular/core';
import { Header3Component } from "../all-header/header3/header3.component";
import { AuthenService } from '../../services/api/authen.service';
import { UserGetResponse } from '../../model/UserGetResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateService } from '../../services/api/update.service';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';
import { UploadTableImage } from '../../services/api/upload-taimage.service';

@Component({
    selector: 'app-profilem',
    standalone: true,
    templateUrl: './profilem.component.html',
    styleUrl: './profilem.component.scss',
    imports: [Header3Component,FormsModule,CommonModule]
})
export class ProfilemComponent implements OnInit{
  imageUrl: string = "";
  id: number = 0;
  userprofile: UserGetResponse | undefined;
  name: string = "";
  bio: string = "";
  password: string = "";
  confirmPassword: string = "";
  file!: File;

  constructor(
      private authenService: AuthenService,
      private updatepro: UpdateService,
      private upload: UploadTableImage // Injected UploadTableImage service
  ) { }

  ngOnInit(): void {
      const userIdString = localStorage.getItem('userID');
      if (userIdString) {
          this.id = parseInt(userIdString);
          console.log("User : ", this.id);
      }
      this.getUser(this.id);
  }

  async getUser(id: number) {
      this.userprofile = await this.authenService.getUser(id);
      this.imageUrl = this.userprofile.image;
  }

  onFileSelected(event: any) {
      this.file = event.target.files[0];
      if (this.file) {
          this.readURL(this.file);
      }
  }

  readURL(file: File) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
          this.imageUrl = e.target.result;
        //   console.log(this.imageUrl);
      };
      reader.readAsDataURL(file);
  }

  async updateprofile() {
      if (this.name || this.bio || this.password || this.file) {
          if (!this.name) {
              this.name = this.userprofile?.name as string;
          }
          if (!this.bio) {
              this.bio = this.userprofile?.bio as string;
          }

          if (this.password !== this.confirmPassword) {
              Swal.fire('Error', 'Passwords do not match', 'error');
              return;
          }

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(this.password, salt);

          let imageUrl = this.userprofile?.image;

          if (this.file) {
              const uploadedImage = await this.upload.urlImageProfile(this.file); // Upload new image
              console.log(uploadedImage);

              imageUrl = uploadedImage.file; // Use URL of the newly uploaded image'
              console.log(imageUrl);

          }

          const body = {
              name: this.name,
              bio: this.bio,
              password: hashedPassword,
              image: imageUrl,
              userID: this.id
          };

          try {
              await this.updatepro.updateprofile(body);
              Swal.fire('Success', 'Profile updated successfully', 'success').then(() => {
                  location.reload();
              });
          } catch (error) {
              Swal.fire('Error', 'Failed to update profile', 'error').then(() => {
                  location.reload();
              });
          }

          console.log(body);
      } else {
          Swal.fire('Info', 'No data found to update', 'info').then(() => {
              location.reload();
          });
          console.log("Not Found Data to update");
      }
  }
}
