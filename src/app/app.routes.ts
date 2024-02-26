import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'header', component: HeaderComponent },
];
