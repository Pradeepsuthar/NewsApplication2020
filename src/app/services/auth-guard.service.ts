import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth:AuthService,public router:Router) { }
  canActivate():boolean{
    if(this.auth.isAuthenticated()){
      return true
    }
    else{
      this.router.navigateByUrl("/signin")
      return false
    }
  }
}