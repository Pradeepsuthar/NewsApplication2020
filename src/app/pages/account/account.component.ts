import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user:any={
    imgUrl:"",
    displayName:"",
    email:"", 
    phone:""
  }
  isauthenticated=false;

  constructor(
    private auth:AuthService
  ) { }

  ngOnInit(): void {
    this.auth.afAuth.authState.subscribe(res=>{
      console.log(res)
      this.user={
        imgUrl:res.photoURL,
        displayName:res.displayName,
        email:res.email,
        phone:res.phoneNumber
      }
    })
   this.isauthenticated = this.auth.isAuthenticated()
  }
  

  logout(){
    this.auth.userLogout()
  }

}
