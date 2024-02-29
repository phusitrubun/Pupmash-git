import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass],
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
}
