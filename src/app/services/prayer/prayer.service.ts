import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class PrayerService {
  public prayerListRef: firebase.firestore.CollectionReference;
  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.prayerListRef = firebase
          .firestore()
          .collection(`/userProfile/${user.uid}/prayerList`);
      }
    });
  }

  newPrayerRequest(
    request: string,
  ): Promise<firebase.firestore.DocumentReference> {
    return this.prayerListRef.add({
      request: request,
    });
  }

  getPrayerRequestList(): firebase.firestore.CollectionReference {
    return this.prayerListRef;
  }

//  getEventDetail(eventId: string): firebase.firestore.DocumentReference {
//    return this.eventListRef.doc(eventId);
//  }

}
