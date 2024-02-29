import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header3',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass],
  templateUrl: './header3.component.html',
  styleUrl: './header3.component.scss'
})
export class Header3Component {
  isMenuActive: boolean = false;

  @Output() menuToggle = new EventEmitter<void>();

  toggleMenu(): void {
    this.isMenuActive = !this.isMenuActive;
    this.menuToggle.emit();
  }
}
