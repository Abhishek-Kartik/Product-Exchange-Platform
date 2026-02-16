import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from 'src/app/services/models';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  errorMsg: Array<String> = [];
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;
  resendCooldown = 0;
  timerInterval: any;
  showPassword = false;
  confirmPassword = '';
  forgotPasswordRequest: ForgotPasswordRequest = { email: '' };
  resetPasswordRequest: ResetPasswordRequest = {
    email: '',
    otp: '',
    newPassword: '',
  };
  isOtpSend: boolean = false;
  isOtpVerified: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

  onCodeCompleted(token: string) {
    this.resetPasswordRequest.otp = token;
    this.isOtpVerified = true;
  }


  forgotPasswordOtp(email: string) {
    this.authService
      .forgotPassword({ body: this.forgotPasswordRequest })
      .subscribe({
        next: () => {
          this.isOtpSend = true;
          this.resetPasswordRequest.email = this.forgotPasswordRequest.email;
          this.startCountdown(30);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg.push('Something went wrong');
        },
      });
  }

  resendCode(email: string) {
    if (this.resendCooldown > 0) return;
    this.authService.resendActivationCode({ email }).subscribe({
      next: () => {
        this.message = 'A new code has been sent to your email.';
        this.startCountdown(30);
      },
      error: () => {
        this.message = 'Too many requests. Please try again later.';
        this.isOkay = false;
      },
    });
  }

  startCountdown(seconds: number) {
    this.resendCooldown = seconds;
    this.timerInterval = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  backToLoginPage() {
    this.router.navigate(['login']);
  }

  resetPassword() {
    this.authService
      .resetPassword({ body: this.resetPasswordRequest })
      .subscribe({
        next: () => {},
        error: () => {},
      });
  }
}
