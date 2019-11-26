import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
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
        Name: this.af.auth.currentUser.displayName,
        Message: this.text,
        UserID: this.af.auth.currentUser.uid,
        Timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      this.text='';
      console.log(this.uid);
    }
  }



  ngOnInit() {
  }

}
