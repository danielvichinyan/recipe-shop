import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { AuthResponseData } from '../payload/auth.response';
import { User } from '../payload/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDJU_ALm-Pk-3GohsyoBktprCwWiEsi2V8`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn // convert from string to number with +
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDJU_ALm-Pk-3GohsyoBktprCwWiEsi2V8`,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    // new Date().getTime() + +response.expiresIn * 1000 is the expiration date in milliseconds
    // then, we convert it back to a Date object by callind new Date(new Date().getTime() + +response.expiresIn * 1000)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000); // using + in front of expiresIn to convert it from string to number

    const user = new User(email, userId, token, expirationDate);

    this.user.next(user); // send the user
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error ocurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid password!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled!';
        break;
    }

    return throwError(errorMessage);
  }
}
