import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { CanActivate, Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';

var provider = new firebase.auth.GithubAuthProvider();

@Injectable()
export class AuthService implements CanActivate {
    constructor(private router: Router) { }

    public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());

    public token: any;
    public user: any;

    public isAuthenticated(): Observable<boolean> {
        return this.isAuthenticatedSubject.asObservable();
    };

    private hasToken(): boolean {
        return !!localStorage.getItem('user_token');
    }

    canActivate() {
        if (this.hasToken()) {
            return true;
        }
        this.router.navigate(['']);
        return false;
    }

    public open = () => {
        firebase.auth().signInWithPopup(provider).then((result) => {
            this._setSession(result);
            this.isAuthenticatedSubject.next(true);
            this.router.navigate(['/dashboard']);
        }).catch(() => {
            this.router.navigate(['']);
        });
    }

    public fetch = () => {
        this._getSession();
    }

    public close = () => {
        firebase.auth().signOut().then(() => {
            this._removeSession();
            this.isAuthenticatedSubject.next(false);
            this.router.navigate(['']);
        }).catch(() => {
            this.router.navigate(['']);
        });
    }

    private _setSession(result) {
        this.token = result.credential.accessToken;
        this.user = result.user;
        localStorage.setItem('user_token', result.credential.accessToken);
        localStorage.setItem('user', JSON.stringify(result.user));
    }

    private _getSession() {
        let token = localStorage.getItem('user_token');
        let user = localStorage.getItem('user');

        this.token = token ? token : '';

        this.user = user ? JSON.parse(user) : {};
    }

    private _removeSession() {
        this.token = '';
        this.user = {};
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
    }
}
