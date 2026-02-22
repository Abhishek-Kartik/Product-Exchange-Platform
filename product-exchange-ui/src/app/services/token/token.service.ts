import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

   private jwtHelper = new JwtHelperService();
  isTokenNotValid() {
    return !this.isTokenValid();
  }

  isTokenValid() {
    const token = this.token;
    if(!token)
      return false;

   
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);

    if(isTokenExpired){
      localStorage.clear()
      return false;
    }

    return true;
  }

  set token(token: string){
    localStorage.setItem('token', token);
  }

  get token(){
    return localStorage.getItem('token') as string;
  }

  getUsername():string {
    const token = this.token;
    if(!token) return '';
    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken?.fullName || '';
  }
}
