// import { Update } from './../../model/ImageGetResponse';
import { Component, OnInit } from '@angular/core';
import { Header3Component } from "../all-header/header3/header3.component";
import { AuthenService } from '../../services/api/authen.service';
import { UserGetResponse } from '../../model/UserGetResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateService } from '../../services/api/update.service';


@Component({
    selector: 'app-profilem',
    standalone: true,
    templateUrl: './profilem.component.html',
    styleUrl: './profilem.component.scss',
    imports: [Header3Component,FormsModule,CommonModule]
})
export class ProfilemComponent implements OnInit{
  imageUrl: string = "";
  id : number = 0;
  userprofile : UserGetResponse | undefined;
  name: string = "";
  bio: string = "";
  constructor(private authenService: AuthenService,private updatepro:UpdateService) { }

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
    if (userIdString) {
        this.id = parseInt(userIdString);
        console.log("User : ",this.id);

    }
    this.getUser(this.id);

}

async getUser(id : number){
  this.userprofile = await this.authenService.getUser(id);
  this.imageUrl = this.userprofile.image;
  // console.log(this.userprofile);

}


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


  async updateprofile() {
    if(this.name || this.bio) {
      if (this.name && !this.bio) {
        this.bio = this.userprofile?.bio as string;
      } else if (!this.name && this.bio) {
        this.name = this.userprofile?.name as string;
      }

      const body = {
        name:this.name,
        bio:this.bio,
        userID:this.id
      }
      this.updatepro.updateprofile(body);
      console.log(body);
    } else {
      console.log("Not Found Data to update");
    }
    location.reload()
}
}
