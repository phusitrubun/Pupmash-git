import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
// import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/authen/login/login.component';
import { SignupComponent } from './components/authen/signup/signup.component';
import { Main2Component } from './components/main2/main2.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserslistComponent } from './components/userslist/userslist.component';
import { RanksComponent } from './components/ranks/ranks.component';
import { ChartComponent } from './components/chart/chart.component';
import { ProfilemComponent } from './components/profilem/profilem.component';
import { UploadComponent } from './components/upload/upload.component';

export const routes: Routes = [
  { path: 'main1', component: MainComponent },
  { path: '', component: Main2Component },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'profile', component: ProfileComponent },
  {path: 'userslist', component:UserslistComponent},
  {path: 'ranks' ,component:RanksComponent},
  {path: 'chart' ,component:ChartComponent},
  { path: 'profile2', component: ProfilemComponent },
  { path: 'profile', component:ProfileComponent },
  {path: 'upload' ,component:UploadComponent}

];
