import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    this.authService.currentUser.subscribe(currentUser => {
      if (currentUser) {
        request = request.clone({
          headers: request.headers.set('x-access-token', currentUser.token)
        });
      }
    });

    request = request.clone({
      headers: request.headers.set('Content-Type', 'application/json')
    });

    if (!request.headers.has('Accept')) {
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json')
      });
    }

    return next.handle(request);
  }
}
