import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { UserGetResponse } from '../../../model/UserGetResponse';
import { AuthenService } from '../../../services/api/authen.service';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/api/admin.service';
import { Times } from '../../../model/Times';

@Component({
  selector: 'app-header4',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgClass,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './header4.component.html',
  styleUrl: './header4.component.scss',
})
export class Header4Component {
  isMenuActive: boolean = false;
  isSettingMenuActive: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();
  @Output() settingMenuToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuToggle.emit();
  }

  toggleSettingMenu(): void {
    this.isSettingMenuActive = !this.isSettingMenuActive;
    this.settingMenuToggle.emit();
  }

  user: UserGetResponse | undefined;
  id: number = 0;
  userprofile: UserGetResponse | undefined;

  secound: number = 0;

  constructor(private authenService: AuthenService, private adminService: AdminService) {}
  ngOnInit(): void {
    const userIdString = localStorage.getItem('userID');
    if (userIdString) {
      this.id = parseInt(userIdString);
      console.log('User : ', this.id);
    }
    this.getUser(this.id);
    console.log(this.id);
    this.updateTime();
  }

  async getUser(id: number) {
    this.userprofile = await this.authenService.getUser(id);
  }

  async updateTime() {
    let fetchedTime: Times[] = await this.adminService.getTimeSetting();
    if (fetchedTime.length > 0) {
        let numberValue: number = fetchedTime[0].times;
        this.secound = numberValue;
        console.log(this.secound);
    } else {
        console.log("No time settings found");
    }
}


  async setTimes() {
    console.log('timesหหหหห : ', this.secound);
    await this.adminService.setTime(this.secound);
    console.log('Update successfully'); // แจ้งเตือนเมื่ออัปเดตสำเร็จ
}


  // clear localStroge
  detroyLocalStrorage() {
    localStorage.removeItem('userID');
  }
}
