import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserGetResponse } from '../../../model/UserGetResponse';
import { AuthenService } from '../../../services/api/authen.service';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass,CommonModule],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.scss'
})
export class Header2Component {
  isMenuActive: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuToggle.emit();
  }
userId: any;
  user: UserGetResponse | undefined;
  id: number = 0;
  userprofile: UserGetResponse | undefined;

  constructor(private authenService: AuthenService) {}
  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
    if (userIdString) {
      this.userId=this.id;
      this.id = parseInt(userIdString);
      console.log('User : ', this.id);
    }
    this.getUser(this.id);
    // console.log(this.id);
  }

  async getUser(id: number) {
    this.userprofile = await this.authenService.getUser(id);
  }
}
