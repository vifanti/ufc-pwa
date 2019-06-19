import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';

const apiUrl = 'http://localhost:3040/api/v2/users/';
// const apiUrl = 'https://54.94.211.199:3000/users';
// const apiUrl = 'https://ufc-fighter-manager-server.herokuapp.com/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    let userList: any;
    userList = this.http
      .get(apiUrl)
      .pipe(catchError(this.handleError('getUsers', [])));

    if (userList) {
      return userList;
    } else {
      userList = [];
      return userList;
    }
  }

  getUser(_id: string): Observable<any> {
    return this.http
      .get(apiUrl + _id)
      .pipe(catchError(this.handleError<User>('getLutador id= ' + _id)));
  }

  searchUsers(termo: string): Observable<any> {
    return this.http
      .get(
        apiUrl +
          'search?name=' +
          termo
      )
      .pipe(catchError(this.handleError<User[]>('searchUsers', [])));
  }

  addUser(user: User): Observable<User> {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    return this.http
      .post<User>(apiUrl, user)
      .pipe(catchError(this.handleError<User>('addUser')));
  }

  deleteUser(id: any) {
    throw new Error('Method not implemented.');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
