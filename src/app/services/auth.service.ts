import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { CanActivate, Router } from '@angular/router';

var provider = new firebase
    .auth
    .GithubAuthProvider();

@Injectable()
export class AuthService implements CanActivate {
    constructor(private router: Router) { }

    public token: string;
    public user: object;
    public isAuthenticated: boolean;

    canActivate() {
        if (this.isAuthenticated) {
            return true;
        }
        this
            .router
            .navigate(['']);
        return false;
    }

    public open() {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                this._setSession(result);
                this.token = result.credential.accessToken;
                this.user = result.user;
                this.isAuthenticated = true;
                this.router.navigate(['/dashboard']);
            })
            .catch((error) => {
                this.router.navigate(['']);
            });
    }

    public fetch() {
        this._getSession();
    }

    public close() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this._removeSession();
                this.token = '';
                this.user = {};
                this.isAuthenticated = false;
                this.router.navigate(['']);
            })
            .catch((error) => {
                this.router.navigate(['']);
            });
    }

    private _setSession(result) {
        localStorage.setItem('user_token', result.credential.accessToken);
        localStorage.setItem('user', JSON.stringify(result.user));
    }

    private _getSession() {
        let token = localStorage.getItem('user_token');
        let user = localStorage.getItem('user');

        this.token = token ? token : null;
        this.user = user ? JSON.parse(user) : {};
        this.isAuthenticated = !!token;
    }

    private _removeSession() {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
    }
}
