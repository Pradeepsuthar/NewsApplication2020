import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth, firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid=null

  constructor(
    public afAuth:AngularFireAuth,
    public router:Router,
    public db:AngularFirestore) {
    this.afAuth.authState.subscribe(res=>{
      if(res){
        this.uid=res.uid
        localStorage.setItem("uid",res.uid)
        localStorage.setItem("email",res.email)
        this.db.collection("users").doc(res.uid).set({displayName:res.displayName,email:res.email,photoURL:res.photoURL})
        this.router.navigateByUrl("/")
      }
      else{
        localStorage.removeItem("uid")
        localStorage.removeItem("email")
      }
    })
   }

   signinWithGoogle(){
     return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider())
   }

   getUserData(){
    // fetch doc from firestore and return 
    return this.db.collection("users").valueChanges()
   }

   updateUserProfile(uid,userData){
     this.db.collection("users").doc(uid).update(userData)
   }

   isAuthenticated(){
    if(localStorage.getItem("uid")){
      return true
    }
    else{
      return false
    }
   }

   getUid(){
     return localStorage.getItem("uid")
   }
   getEmail(){
    return localStorage.getItem("email")
   }

   userLogout(){
    this.uid=null
     this.router.navigateByUrl("/signin")
      localStorage.removeItem("uid")
      localStorage.removeItem("email")
      this.afAuth.auth.signOut()
   }


  // Get server Timestamp
  getTimestamp() {
    var SECONDS = firestore.Timestamp.now();
    var date = new Date(null);
    date.setSeconds(SECONDS.seconds); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    return date
  }

}