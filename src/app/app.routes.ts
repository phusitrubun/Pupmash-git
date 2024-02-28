import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
// import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { Main2Component } from './components/main2/main2.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserslistComponent } from './components/userslist/userslist.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'main1', component: Main2Component },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  {path: 'userslist', component:UserslistComponent}
  
];
