import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/services';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit{
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;
  email:string ='';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.queryParamMap.get('email') || '';
    console.log(this.email);
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  private confirmAccount(token: string) {
    this.authService.confirm({token})
      .subscribe({
        next: () => {
          this.message ='Your account has been successfully activated.\nNow you can proceed to login';
          this.submitted = true;
          this.isOkay = true;
        },
        error: () => {
          this.message = 'Token has been expired or invalid';
          this.submitted = true;
          this.isOkay = false;
        },
      });
  }

  resendCode(email:string) {
    this.authService.resendActivationCode({email}).subscribe({
      next: () => {
        this.message = 'A new code has been sent to your email.';
        this.startCountdown();
      },
      error: () => {
        this.message = 'Too many requests. Please try again later.';
        this.isOkay = false;
      },
    });
  }

  startCountdown(){

  }
}
