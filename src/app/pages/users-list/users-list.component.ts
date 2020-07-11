import { Component, OnInit } from '@angular/core';
import { ManageAppService } from 'src/app/services/manage-app.service';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  showMobileSearch=false;
  userList=[];
  search_name : string;
  
  constructor(
    public manageApp:ManageAppService,
    public auth:AuthService
    ) { }

  logedInUserEmail = this.auth.getEmail()

  ngOnInit(): void {
    this.manageApp.getAllUsers().toPromise().then(data=>{
      data.docs.forEach(doc => {
        this.userList.push(doc.data())
      })
    })
  }

  toggleMobileNav(){
    this.showMobileSearch=!this.showMobileSearch
  }

}
