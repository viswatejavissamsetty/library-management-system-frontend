import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Notification,
  NotificationsService,
} from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.notificationService
      .getAllNotifications()
      .subscribe((notifications) => (this.notifications = notifications));
    }, 1000);
  }
}
