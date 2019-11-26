import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  yourProfile: any;
  Name: any;


  constructor(public fs:AngularFirestore, public af:AngularFireAuth) {
    this.Name = firebase.firestore().doc(`/userProfile/${this.Name}`);
    firebase.auth().onAuthStateChanged(user =>
      {
        if (user) {
          this.currentUser = user;
          this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}1`);
        }
      });
      this.currentUser = firebase.auth().currentUser;
      this.userProfile = firebase.firestore().doc(`/userProfile/${this.currentUser.uid}`);

    }

  getUserProfile(): firebase.firestore.DocumentReference {
    console.log(this.yourProfile);
    return this.userProfile;
  }

  updateName(Name: string) {
    return firebase.auth().currentUser.updateProfile({
      displayName: Name,
    }).then(() => {
      firebase
        .firestore()
        .doc(`/userProfile/${this.currentUser.uid}`)
        .set({
          email: this.currentUser.email,
          Name: Name
        });
      console.log('Name Changed Successfully');
    })
    .catch(error => {
      console.log('ERROR: ' + error.message);
    });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        firebase
          .firestore()
          .doc(`/userProfile/${this.currentUser.uid}`)
          .set({
            email: newEmail,
            Name: this.Name
          });
      })
      .catch(error => {
        console.error(error);
      });
    }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
    }
}
