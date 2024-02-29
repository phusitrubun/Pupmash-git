import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
// import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Main2Component } from './components/main2/main2.component';
import { ProfilemComponent } from './components/profilem/profilem.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: 'main1', component: MainComponent },
  { path: '', component: Main2Component },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile2', component: ProfilemComponent },
  { path: 'profile', component:ProfileComponent }, 
];
