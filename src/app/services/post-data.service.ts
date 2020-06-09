import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostModule } from '../modules/post/post.module';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  allPost: PostModule;

  constructor(
    public firestore: AngularFirestore,
    public auth: AuthService,
    public db: AngularFirestore,
    public storage: StorageService
  ) { }

  getPosts() {
    return this.firestore.collection('news').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createNewPost(newPost, prodImg?) {
    return this.db.collection("users").doc(this.auth.getUid()).collection("post").add(newPost).then(res => {
      let path = this.auth.getUid() + "/" + "post/" + res.id + "/image"
      this.storage.upload(path, prodImg).then(imgUrl => {
        this.editPost(res.id, { imgUrl: imgUrl })
      }).catch(err => {
        console.log(err)
      })
      return res;
    }).catch(err => {
      console.log(err)
      return err;
    }).finally(() => {
      console.log("Process done")
    })
  }

  editPost(id, post, img?) {
    let path = this.auth.getUid() + "/" + "post/" + id + "/image";
    if (img) {
      return this.storage.upload(path, img).then(newUrl => {
        console.log("newUrl")
        return this.editPost(id, { imgUrl: newUrl, ...post });
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        console.log("Process done")
      })
    } else {
      return this.db.collection("users").doc(this.auth.getUid()).collection("post").doc(id).update(post).then(res => {
        console.log(res)
        return res
      }).catch(err => {
        return err;
      }).finally(() => {
        console.log("Process done")
      })
    }
  }

  getMyAllPost() {
    return this.db.collection("users").doc(this.auth.getUid()).collection("post").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getMyPost(id) {
    return this.db.collection("users").doc(this.auth.getUid()).collection("post").doc(id).valueChanges()
  }

  deleteMyPost(id) {
    return this.db.collection("users").doc(this.auth.getUid()).collection("post").doc(id).delete()
  }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}



