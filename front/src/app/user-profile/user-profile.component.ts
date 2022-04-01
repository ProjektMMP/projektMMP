import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import {User} from "../shared/user.model";


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

    if(!this.userService.isLoggedIn()) {

      var fullUrl = window.location.href.split("/")
      var web = fullUrl[4];

      this.userService.selectedUser.website=web;


        console.log(web);
        this.userService.askAndGetBlog(this.userService.selectedUser).subscribe(
          res => {
            this.userDetails = res['user'];
            console.log('Theme: ' + this.userDetails?.theme);
            this.currentItem = this.userDetails;
            this.pickTheme = this.currentItem.theme; // bo chyba zasysa z bazy
          },
          err => {
            console.log(err);
          }
        );
    }
    else {
      this.userService.getAuthUserProfile().subscribe(
        res => {
          this.userDetails = res['user'];
          console.log('Theme: ' + this.userDetails.theme);
          this.currentItem = this.userDetails;
          this.pickTheme = this.currentItem.theme; // bo chyba zasysa z bazy
        },
        err => {
          console.log(err);

        }
      );
    }
  }


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
