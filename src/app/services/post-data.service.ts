import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
// import { PostModule } from '../modules/post/post.module';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  // allPost: PostModule;

  constructor(
    // private firestore: AngularFirestore,
    private auth: AuthService,
    private _db: AngularFirestore,
    private storage: StorageService,
    // private http: HttpClient,
    private _router: Router
  ) { }

  // Get All Post
  getPosts() {
    return this._db.collection('posts', ref=>ref.orderBy("totalLikes")).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Add new post
  addNewPost(postContent, postImg?) {
    return this._db.collection("posts").add(postContent).then(res => {
      let path = this.auth.getUid() + "/" + "posts_images/" + res.id + "_" + postImg
      this.storage.upload(path, postImg).then(imgUrl => {
        this.updateMyPost(res.id, { postImgUrl: imgUrl })
      }).catch(err => {
        console.log(err)
      })
      return res;
    }).catch(err => {
      console.log("error", "Error Occoured", "Unable to perform this operation")
      return err;
    }).finally(() => {
      console.log("finally post added successfully")
      this._router.navigateByUrl('/')
    })
  }

  // Update post
  updateMyPost(id, postData, postImg?) {
    let path = this.auth.getUid() + "/" + "posts_images/" + id + "_" + postImg
    if (postImg) {
      return this.storage.upload(path, postImg).then(newUrl => {
        console.log("newUrl")
        return this.updateMyPost(id, { imgUrl: newUrl, ...postData });
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        console.log("finally post added successfully")
      })
    } else {
      return this._db.collection("posts").doc(id).update(postData).then(res => {
        console.log("success", "Update Successful", "Product Updated Successfully")
        return res
      }).catch(err => {
        return err;
      }).finally(() => {
        console.log("finally post added successfully")
        this._router.navigateByUrl('/')
      })
    }
  }

  // Get Post By UserID
  getPostByUserId(uid) {
    return this._db.collection("users").doc(uid).collection("myPost").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  // Get Post By PostId
  getPostByPostId(postId){
    return this._db.collection("posts").doc(postId).valueChanges();
  }



  // Get My all post
  getMyAllPost(uid) {
    console.log("MY Post")
  }

  // Delete my post
  deleteMyPost(postId) {
    return this._db.collection("posts").doc(postId).delete()
  }

  // Get comments by post id
  getAllCommentsById(postId){
    return this._db.collection("posts").doc(postId).collection("comments").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // use get request 

  // getAllPost(){
  //   return this.http.post()
  // }




  // createNewPost(newPost, prodImg?) {
  //   return this.db.collection("users").doc(this.auth.getUid()).collection("post").add(newPost).then(res => {
  //     let path = this.auth.getUid() + "/" + "post/" + res.id + "/image"
  //     this.storage.upload(path, prodImg).then(imgUrl => {
  //       this.editPost(res.id, { imgUrl: imgUrl })
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //     return res;
  //   }).catch(err => {
  //     console.log(err)
  //     return err;
  //   }).finally(() => {
  //     console.log("Process done")
  //   })
  // }




  // editPost(id, post, img?) {
  //   let path = this.auth.getUid() + "/" + "post/" + id + "/image";
  //   if (img) {
  //     return this.storage.upload(path, img).then(newUrl => {
  //       console.log("newUrl")
  //       return this.editPost(id, { imgUrl: newUrl, ...post });
  //     }).catch(err => {
  //       console.log(err)
  //     }).finally(() => {
  //       console.log("Process done")
  //     })
  //   } else {
  //     return this.db.collection("users").doc(this.auth.getUid()).collection("post").doc(id).update(post).then(res => {
  //       console.log(res)
  //       return res
  //     }).catch(err => {
  //       return err;
  //     }).finally(() => {
  //       console.log("Process done")
  //     })
  //   }
  // }

  // getMyAllPost() {
  //   return this.db.collection("users").doc(this.auth.getUid()).collection("post").snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }

  

  // getUsers() {
  //   return this.firestore.collection('users').snapshotChanges().pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as any;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   );
  // }


  // getCommentsByPostId(postId){
  //   return this.db.collection("posts").doc(postId).collection('comments').valueChanges();
  // }

  

}



