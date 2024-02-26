import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header4',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass],
  templateUrl: './header4.component.html',
  styleUrl: './header4.component.scss'
})
export class Header4Component {
  isMenuActive: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuToggle.emit();
  }
}
