import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(
    private usersProfileService: UserProfileService,
    private notificationService: NotificationsService,
    private router: Router
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

    this.notificationService.notificationFetchControl.subscribe((data) => {
      if (data) {
        this.notificationService
          .getNumberOfUnReadNotifications()
          .subscribe((data) => {
            this.notificationCount = data;
          });
        this.notificationService.notificationFetchControl.next(false);
      }
    });
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
