import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    public auth:AuthService,
  ) { }

  ngOnInit(): void {
  }

  googleSignin(){
    this.auth.signinWithGoogle()
  }

}
