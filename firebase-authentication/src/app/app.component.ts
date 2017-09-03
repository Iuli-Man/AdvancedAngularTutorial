import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  displayName;
  photoURL;
  error;


  constructor(
    private afa: AngularFireAuth,
    private afd: AngularFireDatabase,
    private http: Http) {

  }

  ngOnInit() {
    this.afa.authState.subscribe(authState => {
      if(!authState){
        this.displayName = null;
        this.photoURL = null;
        return;
      }
      this.displayName = authState.email;
    })
  }

  getFacebook() {
    this.afa.authState.subscribe(authState => {
      if(!authState){
        this.displayName = null;
        this.photoURL = null;
        return;
      }
      let userRef = this.afd.object('/users/' + authState.uid);
      userRef.subscribe(user => {
        let url = `https://graph.facebook.com/v2.10/${authState.providerData[0].uid}?fields=first_name,last_name&access_token=${user.accessToken}`;
        this.http.get(url).subscribe(response =>{
          let user = response.json();
          userRef.update({
            firstName: user.first_name,
            lastName: user.last_name
          });
        });
      });
      this.displayName = authState.displayName;
      this.photoURL = authState.photoURL;
    });
  }

  login() {
    this.afa.auth.signInWithEmailAndPassword('iulian.manda@gmail.com', '!@#$12345')
      .then(authState => console.log("LOGIN-THEN", authState))
      .catch(error => this.error = error.message);
  }

  loginFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    provider.addScope('user_friends');
    provider.addScope('email');
    this.afa.auth.signInWithPopup(provider)
      .then(authState => {
        console.log(authState);
        this.afd.object('/users/' + authState.user.uid).update({
          accessToken: authState.credential.accessToken
        })
      });
  }

  logout() {
    this.afa.auth.signOut();
  }

  register() {
    this.afa.auth.createUserWithEmailAndPassword('iulian.manda@gmail.com', '!@#$12345')
      .then(authState => authState.sendEmailVerification())
      .catch(error => console.log("REGISTER-THEN", error));
  }

}
