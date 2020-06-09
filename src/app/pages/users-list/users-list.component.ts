import { Component, OnInit } from '@angular/core';
import { PostDataService } from 'src/app/services/post-data.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  showMobileSearch=false;
  userList=[];

  constructor(
    public postService:PostDataService
  ) { }

  ngOnInit(): void {
    this.postService.getUsers().subscribe(res => {
      this.userList = res;
    });
  }

  toggleNobileNav(){
    this.showMobileSearch=!this.showMobileSearch
  }

}
