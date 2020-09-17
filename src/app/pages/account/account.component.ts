import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { PostDataService } from 'src/app/services/post-data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  isauthenticated = false;
  userData:any={};
  myPostData:any=[];

  constructor(
    private _auth: AuthService,
    private _userService: UsersService,
    private _postService: PostDataService
  ) { }

  ngOnInit(): void {
    this._postService.getPostByUserId(this._auth.getUid()).pipe(
      map(data => {
        const myPost = [];
        for(var i in data){
          // console.log(data[i]['postId'])
          this._postService.getPostByPostId(data[i]['postId']).subscribe(res => {
            // console.log("MY all post",res)
            myPost.push(res);
          })
        }
        return myPost;
      })
    ).subscribe(res=>{
      this.myPostData = res;
      console.log('My All Post :',this.myPostData) 
    })
    this._userService.getUserById(this._auth.getUid()).subscribe(res=>{
      this.userData = res; 
    })
    this.isauthenticated = this._auth.isAuthenticated()
  }

  logout() {
    this._auth.userLogout()
  }

}
