import { Component, Injectable, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../shared/user.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService: UserService, 
    private router: Router,
    private route: ActivatedRoute,) { 
  }

  ngOnInit() {
    
  }

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => {
          this.showSucessMessage = false;
          this.router.navigate(['login']);
        }, 3000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Coś się popsuło. Skontaktuj się z adminem strony.';
      }
    );
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      website: '',
      nickname: '',
      email: '',
      password: '',
      theme:'',
      isVisible: true
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

}