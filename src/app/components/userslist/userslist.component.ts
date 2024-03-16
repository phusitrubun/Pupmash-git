import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header4Component } from '../all-header/header4/header4.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthenService } from '../../services/api/authen.service';
import { UserGetResponse } from '../../model/UserGetResponse';
import { AdminService } from '../../services/api/admin.service';

@Component({
  selector: 'app-userslist',
  standalone: true,
  templateUrl: './userslist.component.html',
  styleUrl: './userslist.component.scss',
  imports: [CommonModule, Header4Component, MatIconModule, RouterLink],
})
export class UserslistComponent implements OnInit {
  id: number = 0;
  userprofile: UserGetResponse | undefined;
  users: UserGetResponse[] = [];

  constructor(
    private authenService: AuthenService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
    if (userIdString) {
      this.id = parseInt(userIdString);
    }
    this.getUser(this.id);
    this.allUser();
  }

  async getUser(id: number) {
    this.userprofile = await this.authenService.getUser(id);
  }

  async allUser() {
    this.users = await this.adminService.getAllUser();
  }
}
