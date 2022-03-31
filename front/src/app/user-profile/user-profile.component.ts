import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  currentItem;
  userDetails;
  pickTheme;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log('Theme: '+this.userDetails.theme);
        this.currentItem=this.userDetails;
        this.pickTheme=this.currentItem.theme; // bo chyba zasysa z bazy
      },
      err => {
        console.log(err);

      }
    );

  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
