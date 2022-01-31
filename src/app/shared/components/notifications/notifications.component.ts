import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  Notification,
  NotificationsService,
} from '../../services/notifications.service';
import * as moment from 'moment';
import { zip } from 'rxjs';

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
      this.fetchNotifications();
    }, 1000);
  }

  fetchNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      (notifications) =>
        (this.notifications = notifications.map((notification) => {
          return {
            ...notification,
            createdAt: moment(notification.createdAt).calendar(),
            checked: false,
          };
        }))
    );
  }

  markAllNotificationsTo(status: 'READ' | 'UNREAD') {
    zip(
      this.notifications.map((notification) =>
        this.notificationService.changeNotificationStatus(
          status,
          notification._id
        )
      )
    ).subscribe((data) => {
      this.fetchNotifications();
    });
  }

  markSelectedNotificationsTo(status: 'READ' | 'UNREAD') {
    zip(
      this.notifications
        .filter((notification) => notification.checked)
        .map((notification) =>
          this.notificationService.changeNotificationStatus(
            status,
            notification._id
          )
        )
    ).subscribe((data) => {
      this.fetchNotifications();
    });
  }

  deleteAllSelected() {
    zip(
      this.notifications
        .filter((notification) => notification.checked)
        .map((notification) =>
          this.notificationService.deleteNotification(notification._id)
        )
    ).subscribe((data) => {
      this.fetchNotifications();
    });
  }

  deleteAll() {
    zip(
      this.notifications.map((notification) =>
        this.notificationService.deleteNotification(notification._id)
      )
    ).subscribe((data) => {
      this.fetchNotifications();
    });
  }
}
