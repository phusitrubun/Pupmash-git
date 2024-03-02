import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { UserGetResponse } from '../../../model/UserGetResponse';
import { AuthenService } from '../../../services/api/authen.service';

@Component({
  selector: 'app-header4',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, MatMenuModule, MatButtonModule],
  templateUrl: './header4.component.html',
  styleUrl: './header4.component.scss',
})
export class Header4Component {
  isMenuActive: boolean = false;


  @Output() menuToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuToggle.emit();
  }

  user: UserGetResponse | undefined;
  id: number = 0;
  userprofile: UserGetResponse | undefined;

  constructor(private authenService: AuthenService) {}
  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
    if (userIdString) {
      this.id = parseInt(userIdString);
      console.log('User : ', this.id);
    }
    this.getUser(this.id);
    console.log(this.id);
  }

  async getUser(id: number) {
    this.userprofile = await this.authenService.getUser(id);
  }
}
