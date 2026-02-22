import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router,
    private tokenService: TokenService
  ) {}

  username: string = 'USER';

  ngOnInit(): void {
   this.username = this.tokenService.getUsername();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
