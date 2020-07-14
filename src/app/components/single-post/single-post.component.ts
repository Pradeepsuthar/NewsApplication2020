import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  showCommentBox=false;
  @Input() post: any;
  userLiked=true;

  comment_message:string;
  commentMess:string;

  constructor() { }

  ngOnInit(): void {
  }

  CommentBox(){
    this.showCommentBox=!this.showCommentBox;
  }

  getLikes(){
    this.userLiked=!this.userLiked;
  }

  getComments(){
    this.commentMess=this.comment_message;
  }

}
