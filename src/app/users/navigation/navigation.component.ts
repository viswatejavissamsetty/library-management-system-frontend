import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  isLibrarian: boolean = false;

  constructor(private usersProfileService: UserProfileService, private router: Router, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.usersProfileService.getUserData());
    
    this.isLibrarian = this.usersProfileService.getUserData().isLibrarian;
  }

  logoutUser() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
