import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import {
  Notification,
  NotificationsService,
} from '../../services/notifications.service';
import * as moment from 'moment';
import { zip } from 'rxjs';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  notifications: Notification[] = [];

  constructor(
    private notificationService: NotificationsService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.notificationService.notificationFetchControl.next(true);
    }, 500);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fetchNotifications();
    }, 1000);
  }

  fetchNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      (notifications) =>
        (this.notifications = notifications
          .map((notification) => {
            return {
              ...notification,
              createdAt: moment(notification.createdAt).calendar(),
              checked: false,
            };
          })
          .reverse())
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
    ).subscribe(
      (data) => {
        this.notificationService.notificationFetchControl.next(true);
        this.snackbarService.openSnackBar(
          `Succesfully marked ${data.length} notifications as ${status}`,
          'SUCCESS'
        );
        this.fetchNotifications();
      },
      (err) => {
        console.error(err);
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
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
    ).subscribe(
      (data) => {
        this.notificationService.notificationFetchControl.next(true);
        this.snackbarService.openSnackBar(
          `Succesfully marked ${data.length} notifications as ${status}`,
          'SUCCESS'
        );
        this.fetchNotifications();
      },
      (err) => {
        console.error(err);
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }

  deleteAllSelected() {
    zip(
      this.notifications
        .filter((notification) => notification.checked)
        .map((notification) =>
          this.notificationService.deleteNotification(notification._id)
        )
    ).subscribe(
      (data) => {
        this.notificationService.notificationFetchControl.next(true);
        this.snackbarService.openSnackBar(
          `Succesfully deleted ${data.length} notifications`,
          'SUCCESS'
        );
        this.fetchNotifications();
      },
      (err) => {
        console.error(err);
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }

  deleteAll() {
    zip(
      this.notifications.map((notification) =>
        this.notificationService.deleteNotification(notification._id)
      )
    ).subscribe(
      (data) => {
        this.notificationService.notificationFetchControl.next(true);
        this.snackbarService.openSnackBar(
          `Succesfully deleted ${data.length} notifications`,
          'SUCCESS'
        );
        this.fetchNotifications();
      },
      (err) => {
        console.error(err);
        this.snackbarService.openSnackBar(err.error.message, 'DANGER');
      }
    );
  }
}
