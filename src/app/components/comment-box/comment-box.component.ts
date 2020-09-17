import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostDataService } from 'src/app/services/post-data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit {

  @Input() showComp: boolean;
  @Input() postID: string;

  constructor(
    private _authService: AuthService,
    private _postService: PostDataService,
  ) { }

  is_auth = this._authService.isAuthenticated();
  comment_message: string; // Input comment mess from user
  newComment: any = {}; // create new obje of comment save in db with userid and mess 
  comments: any = [] // all comments with repect this post
  userData: any = {};

  ngOnInit(): void {
    // this._userService.getUserById(this.post.uid).subscribe(res=>{
    //   this.userData = res; 
    // })
    // console.log("Post Id is : ", this.postID)
    this._postService.getAllCommentsById(this.postID).subscribe(commentsList => {
      // console.log('my comments : ',commentsList)
      this.comments = commentsList;
    })
  }


  getComments() {
    this.newComment = {
      "uid": this._authService.uid,
      "message": this.comment_message
    }
    if(this.newComment.message!==''){
      this.comments.push(this.newComment);
      this.comment_message = "";
    }
  }

}
