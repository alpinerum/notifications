import { Component } from '@angular/core';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@awesome-cordova-plugins/local-notifications/ngx';
import { Platform, NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private plt: Platform, private localNotifications: LocalNotifications, private alertCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotifications.on('click').subscribe(res => {
        let msg = res.data ? res.data.info : '';
        this.displayanAlert(res.title, res.text, msg);
      });

      this.localNotifications.on('trigger').subscribe(res => {
        let msg = res.data ? res.data.info : '';
        this.displayanAlert(res.title, res.text, msg);
      });
    });
  
  }

  getAftertenseconds() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Hello',
      text: 'Notification',
      data: { info: 'This message appears when you open it' },
      trigger: { in: 10, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true
    });
  }

  getRecurring() {
    this.localNotifications.schedule({
      id: 2,
      title: 'You will see me every 50 seconds',
      text: 'Hello, see you in 50 seconds',
      trigger: { in: 50, unit: ELocalNotificationTriggerUnit.SECOND},
      foreground: true
    });
  }

  getDaily() {
    this.localNotifications.schedule({
      id: 3,
      title: 'Daily Notification',
      text: 'Time to wake up!',
      trigger: { every: {hour: 8, minute: 0}},
      foreground: true
    });
  }

  displayanAlert(header : any, sub : any, msg : any) {
    this.alertCtrl.create({
      header: header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }
}


