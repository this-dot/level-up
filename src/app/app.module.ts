import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './services';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDCLlM1cUCTY-WjH0kByrkUF2P2ujGsanM",
  authDomain: "level-up-26722.firebaseapp.com",
  databaseURL: "https://level-up-26722.firebaseio.com",
  projectId: "level-up-26722",
  storageBucket: "level-up-26722.appspot.com",
  messagingSenderId: "161878697354"
};

firebase.initializeApp(config);

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthService]
  }, {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthService]
  }, {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, ProfileComponent, LoginComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
