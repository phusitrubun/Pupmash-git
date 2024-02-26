import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isMenuActive: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuToggle.emit();
  }
}

