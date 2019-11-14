import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrayerService } from '../../services/prayer/prayer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prayer-requests',
  templateUrl: './prayer-requests.page.html',
  styleUrls: ['./prayer-requests.page.scss'],
})
export class PrayerRequestsPage implements OnInit {
  public prayerRequestList: Array<any>;
  constructor(private router: Router, private prayerService: PrayerService, private route: ActivatedRoute,) { }

  ngOnInit() {
    //const requestId: string = this.route.snapshot.paramMap.get('id');
    this.prayerService
      .getPrayerRequestList()
      .get()
      .then(prayerRequestSnapshot => {
        this.prayerRequestList = [];
        prayerRequestSnapshot.forEach(snap => {
          this.prayerRequestList.push({
            id: snap.id,
            request: snap.data().request,
          });
          return false;
        });
      });


      //  this.currentEvent = eventSnapshot.data();
      //  this.currentEvent.id = eventSnapshot.id;
  }

  newPrayerRequest(
    newRequest: string,
  ): void {
    if (
      newRequest === undefined
    ) {
      return;
    }
    this.prayerService
      .newPrayerRequest(newRequest)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }

}
