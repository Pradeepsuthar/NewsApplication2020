import { Injectable } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid=null
  constructor(
    public afAuth:AngularFireAuth,
    public router:Router) {
    this.afAuth.authState.subscribe(res=>{
      if(res){
        this.uid=res.uid
        localStorage.setItem("uid",res.uid)
        localStorage.setItem("email",res.email)
        this.router.navigateByUrl("")
      }
      else{
        localStorage.removeItem("uid")
        localStorage.removeItem("email")
      }
    })
   }

   signinWithGoogle(){
     return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider()).then((userCredentials)=> {
       return userCredentials;
     })
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


}