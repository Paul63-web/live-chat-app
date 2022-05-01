import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../Auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    private Auth: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
      let token = localStorage.Auth;
      req = req.clone( { headers: req.headers.set( 'Authorization', 'Bearer ' + token ) } );
      req = req.clone( { headers: req.headers.set( 'Content-Type', 'application/json' ) } );
      req = req.clone( { headers: req.headers.set( 'Accept', 'application/json' ) } );
      // req = req.clone( { headers: req.headers.set( 'Content-Type', 'multipart/form-data'  ) } );

      return next.handle(req)
      .pipe(catchError((err: HttpErrorResponse) => {
        if (err) {
          this.Auth.signOut();
        }
        return throwError(err);
      } ));
  }
}
