import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // only wanna take 1 value from the observable and automatically unsubscribe
    // waits for the 1st observable to complete, take its value and load next observable
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // Modify the token only if we HAVE a user
        if (!user) {
            return next.handle(req);
        }

        const modifiedRequest = req.clone({
          params: new HttpParams().set('auth', user.token),
        });

        return next.handle(modifiedRequest);
      })
    );
  }
}
