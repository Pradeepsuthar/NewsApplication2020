import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ManageAppService } from 'src/app/services/manage-app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  user: any = {
    imgUrl: "",
    displayName: "",
    email: "",
  }
  isauthenticated = false;

  constructor(
    private auth: AuthService,
    private manageApp: ManageAppService,
  ) { }

  ngOnInit(): void {
    this.manageApp.getUserData().subscribe(res => {
      this.user = {
        imgUrl: res['photoURL'],
        displayName: res['displayName'],
        email: res['email']
      }
      // console.log(res['photoURL'])
    })



    this.isauthenticated = this.auth.isAuthenticated()
  }


  logout() {
    this.auth.userLogout()
  }

}
