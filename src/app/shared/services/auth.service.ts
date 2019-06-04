import { Injectable, Output, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

// const apiUrl = 'http://localhost:3000';
// const apiUrl = 'https://54.94.211.199:3000';
const apiUrl = 'https://ufc-fighter-manager-server.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  @Output() screenPicker = new EventEmitter<string>();

  constructor(public jwtHelper: JwtHelperService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    // Check whether the token is expired and return true or false
    if (!user) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(user.token);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    const api = apiUrl + '/users/authenticate';
    console.log(api);
    return this.http.post<any>(api, { 'email': email, 'password': password }).pipe(
      map(user => {
        this.startSession(user);
        return user;
      })
    );
  }

  startSession(user) {
    // login successful if there's a jwt token in the response
    if (user && user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  showLogin() {
    this.screenPicker.emit('login');
  }

  hideLogin() {
    this.screenPicker.emit('');
  }

  showSignup() {
    this.screenPicker.emit('signup');
  }

  hideSignup() {
    this.screenPicker.emit('');
  }
}
