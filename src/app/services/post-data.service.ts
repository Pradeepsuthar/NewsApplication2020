import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostModule } from '../modules/post/post.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  allPost:PostModule;

  constructor(
    public firestore:AngularFirestore
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



