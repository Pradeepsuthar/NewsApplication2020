import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ManageAppService {

  constructor(
    public auth:AuthService,
    public db:AngularFirestore
  ) { }

  getUserData() {
    return this.db.collection("users").doc(this.auth.getUid()).valueChanges()
  }

  getAllUsers(){
    return this.db.collection("users").get()
  }

}
