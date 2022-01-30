import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLibrarian: boolean = false;
  userName: string = 'User';

  constructor(
    private usersProfileService: UserProfileService,
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
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
