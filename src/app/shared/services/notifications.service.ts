import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserProfileService } from './user-profile.service';

const notifications = environment.urls.notifications;
const notificationsCount = environment.urls.notificationsCount;

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
  public notificationFetchControl = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private userProfileService: UserProfileService
  ) {}

  getAllNotifications(): Observable<Notification[]> {
    return <Observable<Notification[]>>this.http.get(notifications, {
      params: { userId: this.userProfileService.getUserId() },
    });
  }

  getNumberOfUnReadNotifications(): Observable<number> {
    return <Observable<number>>this.http.get(notificationsCount, {
      params: { userId: this.userProfileService.getUserId() },
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
}
