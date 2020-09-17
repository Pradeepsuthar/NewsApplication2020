import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-single-user-list',
  templateUrl: './single-user-list.component.html',
  styleUrls: ['./single-user-list.component.scss']
})
export class SingleUserListComponent implements OnInit {

  follow=true;
  @Input() user: any;
  
  constructor(
    public _authService:AuthService
  ) { }

  logedInUserEmail = this._authService.getEmail()

  ngOnInit(): void {
    
  }

  followThisUser(){
    if (this._authService.isAuthenticated()) {
      this.follow=!this.follow;
      if (!this.follow) {
        console.log("this User : ", this._authService.getEmail())
        console.log("follow this user UID: ", this.user.email)
      } else {
        console.log("unfollow User")
      }
    } else {
      console.log("Please login than follow the users")
      this.follow
    }
  }

}
