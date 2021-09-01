import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  constructor(private authService: AuthService) {}

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

    if (this.isLoginMode) {

    } else {
      this.authService.signup(email, password).subscribe(
        (response) => {
          this.isLoading = false; // stop spinner 
        },
        errorMessage => {
          this.error = errorMessage;
          this.isLoading = false; // stop spinner 
        }
      );
    }

    form.reset();
  }
}
