import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../shared/services/user-profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  constructor(private usersProfileService: UserProfileService) {}

  ngOnInit(): void {
    this.usersProfileService.getUserData().subscribe(
      userData => {
        // console.log(userData);
      }
    );
  }
}
