import {Component} from '@angular/core';
import {AuthService} from './services';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
  constructor(private auth : AuthService, private router : Router) {}

  ngOnInit() {
    this
      .auth
      .fetch();
  }

  login() {
    this
      .auth
      .open();
  }

  logout() {
    this
      .auth
      .close();
  }
}
