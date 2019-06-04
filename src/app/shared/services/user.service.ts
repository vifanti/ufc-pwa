import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
// const apiUrl = 'http://localhost:3000/users';
// const apiUrl = 'https://54.94.211.199:3000/users';
const apiUrl = 'https://ufc-fighter-manager-server.herokuapp.com/users';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(apiUrl + '?key=4ccc9336b467b9cf58051ea123493ef114eae029')
      .pipe(catchError(this.handleError('getUsers', [])));
  }

  searchUsers(termo: string): Observable<User[]> {
    return this.http.get<User[]>(apiUrl + '/search?key=4ccc9336b467b9cf58051ea123493ef114eae029&name=' + termo).pipe(
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  addUser(user: User): Observable<User> {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
    return this.http.post<User>(apiUrl, user, httpOptions).pipe(catchError(this.handleError<User>('addUser')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
