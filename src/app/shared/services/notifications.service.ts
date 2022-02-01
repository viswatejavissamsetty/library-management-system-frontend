import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfileService } from './user-profile.service';

const notifications = environment.urls.notifications;

export interface Notification {
  readonly _id: string;
  readonly userId: string;
  readonly message: string;
  status: 'READ' | 'UNREAD';
  readonly level: 'HIGH' | 'MEDIUM' | 'LOW';
  readonly createdAt: Date | string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private http: HttpClient,
    private userProfileService: UserProfileService,
    private _snackBar: MatSnackBar
  ) {}

  getAllNotifications(): Observable<Notification[]> {
    return <Observable<Notification[]>>this.http.get(notifications, {
      params: { userId: this.userProfileService.getUserId() },
    });
  }

  getNumberOfUnReadNotifications(): Observable<number> {
    return new Observable<number>((observer) => {
      this.getAllNotifications().subscribe((data) => {
        observer.next(
          data.filter((notification) => notification.status === 'UNREAD').length
        );
      });
    });
  }

  changeNotificationStatus(
    status: 'READ' | 'UNREAD',
    notificationId: string
  ): Observable<any> {
    return <Observable<any>>(
      this.http.patch(notifications, { status }, { params: { notificationId } })
    );
  }

  deleteNotification(notificationId: string): Observable<any> {
    return <Observable<any>>(
      this.http.delete(notifications, { params: { notificationId } })
    );
  }

  openSnackBar(message: string, level: 'DANGER' | 'SUCCESS' | 'NORMAL') {
    const pannelClasses = {
      DANGER: 'bg-danger',
      SUCCESS: 'bg-success',
      NORMAL: '',
    };
    this._snackBar.open(message, 'dismiss', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: pannelClasses[level],
    });
  }
}
