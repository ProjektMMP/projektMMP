import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { NgSwitchCase } from '@angular/common';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  userDetails: any;
  display = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.getAuthUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);
      }
    );
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onClick(expression) {
    this.display = expression;
  }

  addTheme(theme){ /// problem byl w userservice a user details
    //this.userService.setUserTheme(theme);
    this.userDetails.theme=theme;
    console.log('nick: '+this.userDetails.nickname)
    //this.userService.updateUserTheme(this.userService.selectedUser).subscribe(
    this.userService.updateUserTheme(this.userDetails).subscribe(
      res => {},
      err => {

      }
    );

     this.userService.setUserTheme(theme);
    console.log('theme now: '+this.userDetails.theme)

  }

  addVisibility(isVisible) {
    this.userService.setVisibility(isVisible);
    console.log('visibility: '+this.userDetails.isVisible)
  }
}
