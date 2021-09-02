import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData } from './payload/auth.response';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

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
      authObservable = this.authService.login(email, password); // login
    } else {
      authObservable = this.authService.signup(email, password); // register
    }

    authObservable.subscribe(
      (response) => {
        this.isLoading = false; // stop spinner
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false; // stop spinner
      }
    );

    form.reset();
  }
}
