import {Injectable, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {CanActivate, Router} from '@angular/router';

var provider = new firebase
    .auth
    .GithubAuthProvider();

@Injectable()
export class AuthService implements CanActivate {
    constructor(private router : Router) {}

    public token : any;
    public user : any;

    get isAuthenticated() {
        return this.token
            ? true
            : false;
    };

    canActivate() {
        if (this.isAuthenticated) {
            return true;
        }
        this
            .router
            .navigate(['']);
        return false;
    }

    public open = () => {
        firebase
            .auth()
            .signInWithPopup(provider)
            .then((result) => {
                this._setSession(result);
                this.token = result.credential.accessToken;
                this.user = result.user;
                this
                    .router
                    .navigate(['/dashboard']);
            })
            .catch((error) => {
                this
                    .router
                    .navigate(['']);
            });
    }

    public fetch = () => {
        this._getSession();
    }

    public close = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                this._removeSession();
                this.token = '';
                this.user = {};
                this
                    .router
                    .navigate(['']);
            })
            .catch((error) => {
                this
                    .router
                    .navigate(['']);
            });
    }

    private _setSession(result) {
        localStorage.setItem('user_token', result.credential.accessToken);
        localStorage.setItem('user', JSON.stringify(result.user));
    }

    private _getSession() {
        let token = localStorage.getItem('user_token');
        let user = localStorage.getItem('user');

        this.token = token
            ? token
            : '';

        this.user = user
            ? JSON.parse(user)
            : {};
    }

    private _removeSession() {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
    }
}
