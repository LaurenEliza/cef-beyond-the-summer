import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';

import { Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import { firebaseConfig } from './credentials';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      SplashScreen.hide().catch(error => {
        console.error(error);
      });
      StatusBar.hide().catch(error => {
        console.error(error);
      });
      firebase.initializeApp(firebaseConfig);
    });
  }
}
