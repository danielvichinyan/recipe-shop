import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthResponseData } from './payload/auth.response';
import { AuthService } from './services/auth.service';
import * as fromApp from '../store/reducers/app.reducer';
import * as AuthActions from '../store/actions/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        // this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true; // start spinner

    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      authObservable = this.authService.signup(email, password); // register
    }

    // authObservable.subscribe(
    //   (response) => {
    //     this.isLoading = false; // stop spinner
    //     this.router.navigate(['/recipes']);
    //   },
    //   (errorMessage) => {
    //     this.error = errorMessage;
    //     this.isLoading = false; // stop spinner
    //   }
    // );

    form.reset();
  }

  ngOnDestroy() {}
}
