import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserGetResponse } from '../../../model/UserGetResponse';
import { AuthenService } from '../../../services/api/authen.service';

@Component({
  selector: 'app-header3',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgClass, CommonModule, NgIf],
  templateUrl: './header3.component.html',
  styleUrl: './header3.component.scss',
})
export class Header3Component {
  isMenuActive: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();
  typeof: any;

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuToggle.emit();
  }
  userId: any;
  // chevk user
  id: number = 0;
  userprofile: UserGetResponse | undefined;
  gurstID: boolean = false;

  constructor(private authenService: AuthenService) {}
  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
    let guestID = false;

    if (userIdString) {
      console.log('userID String : ', userIdString);

      if (userIdString.length > 5) {
        guestID = true;
        console.log('guestID: ', guestID);
      } else {
        this.id = parseInt(userIdString);
        // console.log('User : ', this.id);
        this.getUser(this.id);
      }
    }
  }
  

  isMenuOpen: boolean = false;

  toggleMenu1() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  async getUser(id: number) {
    this.userprofile = await this.authenService.getUser(id);
  }

  // clear localStroge
  detroyLocalStrorage() {
    localStorage.removeItem('userID');
  }

  @HostListener('document:click', ['$event'])
handleOutsideClick(event: any) {
  if (!event.target.closest('.LO') && !event.target.closest('.hamburger') && !event.target.closest('.profile')) {
    this.isMenuOpen = false;
  }
}
}
