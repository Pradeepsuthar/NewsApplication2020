import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { PostDataService } from 'src/app/services/post-data.service';
import { Post } from 'src/app/modals/post-modal';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  post:Post[];
  newPost:any={};

  userData:any={};
  imgSrc: string = "https://cdn.osxdaily.com/wp-content/uploads/2015/04/photos-app-icon-mac.jpg";
  selectedImage = null;

  constructor(
    private _auth: AuthService,
    private _postService:PostDataService,
    private _userService:UsersService
  ) { }

  ngOnInit(): void {
    this._userService.getUserById(this._auth.getUid()).subscribe(res=>{
      this.userData = res; 
    })
  }

  postCreated(form: NgForm) {
    let data = Object.assign({}, form.value);
    this.newPost = {
      uid: this._auth.getUid(),
      postTitle: data['postTitle']?data['postTitle']:null,
      postDesc: data['postDesc']?data['postDesc']:null,
      // postImgUrl: this.selectedImage.name?this.selectedImage.name:null,
      totalComments: 0,
      totalLikes: 0
    }

    
    // if(this.newPost['postTitle']==="" && this.newPost['pdesc']==="" && this.newPost['pImgPath']===""){
    //   alert("Please fill the form")
    // }else{
    // }
    
    // this._postService.addNewPost(this.newPost, this.selectedImage).then(res=>{
    //   console.log("success", "Upload Post Successful", "Post uploda Successfully")
    //   this.selectedImage=null;
    //   console.log(res);
    // }).catch(err=>{
    //   console.log(err);
    // })
    // console.log(postImgPath)

    if(this.newPost['postTitle']!=null || this.newPost['postDesc']!=null || this.selectedImage!=null){
      this._postService.addNewPost(this.newPost, this.selectedImage).then(res=>{
        console.log("success", "Upload Post Successful", "Post uploda Successfully")
        this.selectedImage=null;
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
      console.log("Time Stapm : ",this._auth.getTimestamp())
      console.log(this.newPost)
    
    }else{
      console.log('Please fill the form')
      alert("Please fill the form")
    }


    // this.postService.createNewPost(newPost,postImgPath);

    form.reset()
    this.imgSrc = 'https://cdn.osxdaily.com/wp-content/uploads/2015/04/photos-app-icon-mac.jpg';
    this.selectedImage = null;
    // console.log(this.userImg)
    // console.log(this.username)
  }

  // imageProcessing(event) {
  //   this.selectedImg = event.target.files[0];
  // }



  imageProcessing(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      console.log(this.selectedImage)
      console.log(this.selectedImage.type)
      console.log(this.selectedImage.name)
    }
    else {
      this.imgSrc = 'https://cdn.osxdaily.com/wp-content/uploads/2015/04/photos-app-icon-mac.jpg';
      this.selectedImage = null;
    }
  }
}
