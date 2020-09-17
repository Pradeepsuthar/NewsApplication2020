import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  
  @Input() userProfileData: any;
  @Input() myPostData: any[];

  constructor() { }

  ngOnInit(): void {
    console.log("profile data",this.myPostData)
  }

}
