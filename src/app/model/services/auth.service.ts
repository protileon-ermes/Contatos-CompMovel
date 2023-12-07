import { Injectable, NgZone } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioDados: any;

  constructor(private firebase : FirebaseService, private router : Router, private ngZone : NgZone, private fireAuth : AngularFireAuth) {
    this.fireAuth.authState.subscribe(user => {
      if(user){
        this.usuarioDados = user;
        localStorage.setItem('user', JSON.stringify(this.usuarioDados));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
   }

   public signIn(email: string, password: string){}

   public signUpWithEmailPassword(email: string, password: string){}

   public recoverPassword(email: string){}

   //metodos gerais 
   public signOut(){}

   public getUserLogged(){}

   public isLoggedIn(): boolean{
    return false;
   }
}
