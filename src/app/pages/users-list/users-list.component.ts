import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  search_name : string;
  showMobileSearch=false;
  userList=[];
  

  constructor(
    private _userService:UsersService,
    private _auth:AuthService
  ) { }
  
  ngOnInit() {
    this._userService.getAllUsers().subscribe(res=>{
      this.userList = res
    })
   }

  toggleMobileNav(){
    this.showMobileSearch=!this.showMobileSearch
  }
  
}
