import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _auth:AuthService,
    private db:AngularFirestore,
    private firestore: AngularFirestore,
  ) { }

  // All users list
  getAllUsers(){
    return this.firestore.collection('users').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  // Get user data by user id
  getUserById(uid){
    return this.db.collection("users").doc(uid).valueChanges();
  }

}
