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
import { MashComponent } from './components/mash/mash.component';

export const routes: Routes = [
  { path: '', component: Main2Component },
  { path: 'main1', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'profile/:id', component: ProfileComponent },
  {path: 'ranks' ,component:RanksComponent},
  {path: 'chart' ,component:ChartComponent},
  { path: 'profile2/:userid', component: ProfilemComponent },
  {path: 'userslist', component:UserslistComponent},
  {path: 'upload' ,component:UploadComponent},
  {path: 'mash' ,component:MashComponent}

];
