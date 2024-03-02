import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthenService } from '../../../services/api/authen.service';
import { UserGetResponse } from '../../../model/UserGetResponse';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isMenuActive: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();
userId: any;

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
