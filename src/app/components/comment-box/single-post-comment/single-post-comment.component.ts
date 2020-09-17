import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-post-comment',
  templateUrl: './single-post-comment.component.html',
  styleUrls: ['./single-post-comment.component.scss']
})
export class SinglePostCommentComponent implements OnInit {

  @Input() comment: any;
  userData: any = {};

  constructor(
    private _userService: UsersService,
  ) { }

  ngOnInit(): void {
    this._userService.getUserById(this.comment.uid).subscribe(res => {
      this.userData = res;
    })
  }

}
