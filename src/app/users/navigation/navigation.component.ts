import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NotificationsService } from 'src/app/shared/services/notifications.service';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  isLibrarian: boolean = false;
  userName: string = 'User';
  notificationCount: number = 0;

  navigationEndVal: number = 0;

  constructor(
    private usersProfileService: UserProfileService,
    private notificationService: NotificationsService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.usersProfileService.getUserData().subscribe((userData) => {
      this.isLibrarian = userData.isLibrarian;
      if (userData.nickName) {
        this.userName = userData.nickName;
      } else {
        this.userName = userData.firstName + ' ' + userData.lastName;
      }
    });

    if (window.location.href.indexOf('landing') !== -1) {
      this.navigationEndVal = 1;
    } else if (window.location.href.indexOf('bookings') !== -1) {
      this.navigationEndVal = 2;
    } else if (window.location.href.indexOf('notifications') !== -1) {
      this.navigationEndVal = 3;
    } else {
      this.navigationEndVal = 0;
    }

    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        console.log(val.urlAfterRedirects.indexOf('landing'));

        if (val.urlAfterRedirects.indexOf('landing') !== -1) {
          this.navigationEndVal = 1;
        } else if (val.urlAfterRedirects.indexOf('bookings') !== -1) {
          this.navigationEndVal = 2;
        } else if (val.urlAfterRedirects.indexOf('notifications') !== -1) {
          this.navigationEndVal = 3;
        } else {
          this.navigationEndVal = 0;
        }
      }
    });

    setInterval(() => {
      this.notificationService
        .getNumberOfUnReadNotifications()
        .subscribe((data) => {
          this.notificationCount = data;
        });
    }, 5000);
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
