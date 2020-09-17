import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { PostDataService } from 'src/app/services/post-data.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  showCommentBox = false;
  @Input() post: any;
  userLiked = true;
  userData: any = {};

  constructor(
    private _authService: AuthService,
    private _userService: UsersService,
  ) { }

  ngOnInit(): void {
    this._userService.getUserById(this.post.uid).subscribe(res => {
      this.userData = res;
    })
  }

  CommentBox() {
    this.showCommentBox = !this.showCommentBox;
  }

  getLikes() {
    if (this._authService.isAuthenticated()) {
      this.userLiked = !this.userLiked;
      if (!this.userLiked) {
        console.log("User : ", this._authService.uid)
        console.log("like this post UID: ", this.post.id)
      } else {
        console.log("User dislike this post")
      }
    } else {
      console.log("Please login than like the post")
      this.userLiked
    }
  }



}
