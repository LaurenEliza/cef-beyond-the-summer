import { Component } from '@angular/core';
//import { PrayerService } from '../services/prayer/prayer.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/user/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    //private prayerService: PrayerService
    private authService: AuthService,
  ) {}

  logOut(): void {
    this.authService.logoutUser().then( () => {
      this.router.navigateByUrl('login');
      localStorage.removeItem('user');
    });
  }

}
