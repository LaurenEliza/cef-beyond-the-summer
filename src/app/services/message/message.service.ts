import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  text: string;
  chatRef: any;
  uid: string;

  constructor(public fs:AngularFirestore, public af:AngularFireAuth) {
    this.uid = localStorage.getItem('userid');
    this.chatRef = this.fs.collection('chats', ref=>ref.orderBy('Timestamp')).valueChanges()
  }

  send() {
    if(this.text != '') {
      this.fs.collection('chats').add({
        displayName: this.af.auth.currentUser.displayName,
        Message: this.text,
        UserID: this.af.auth.currentUser.uid,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.text='';
      console.log(localStorage);
    }
  }
}
