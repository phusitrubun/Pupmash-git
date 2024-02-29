import { Component } from '@angular/core';
import { Header3Component } from '../all-header/header3/header3.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ranks',
  standalone: true,
  imports: [Header3Component, RouterLink],
  templateUrl: './ranks.component.html',
  styleUrl: './ranks.component.scss'
})
export class RanksComponent {

}
