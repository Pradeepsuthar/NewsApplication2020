import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { PostDataService } from 'src/app/services/post-data.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  user: any = {
    imgUrl: "",
    displayName: "",
    email: "",
    phone: ""
  }
  userImg = "";
  username = "";
  selectedImg = null;

  constructor(
    private auth: AuthService,
    public postService:PostDataService
  ) { }

  ngOnInit(): void {
    this.auth.afAuth.authState.subscribe(res => {
      // console.log(res)
      this.user = {
        imgUrl: res.photoURL,
        displayName: res.displayName,
        email: res.email,
        phone: res.phoneNumber
      }
      this.userImg = res.photoURL;
      this.username = res.displayName
    })
  }

  postCreated(form: NgForm) {
    let data = Object.assign({}, form.value);
    let postImgPath=this.selectedImg['name'];
    let newPost = {
      uid: this.auth.getUid(),
      uname: this.username,
      uPhotoUrl: this.userImg,
      pdesc: data['postDesc'],
    }

    console.log(newPost)
    this.postService.createNewPost(newPost,postImgPath);

    form.reset()
    // console.log(this.userImg)
    // console.log(this.username)
    console.log(postImgPath)
  }

  imageProcessing(event) {
    this.selectedImg = event.target.files[0];
  }

}
