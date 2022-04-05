import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {
  DeleteAccountForm: FormGroup;
  serverErrorMessages: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsFormDeleteValid = true;
  userDetails: any;
  display='';

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Init();
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.userDetails = res['user'];
        console.log(this.userDetails.nickname);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  Init() {
    this.DeleteAccountForm = this.fb.group({
      nicknme: [''],
      passwordDelete: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(form) {
    
  }
  //  onSubmit(form) {
  //    this.ChangePasswordForm.value.nickname = this.userDetails.nickname;
  //    console.log(form);
  //    if (form.valid) {
  //      this.IsFormValid = true;
  //      console.log(this.ChangePasswordForm.value.newPassword);
  //      this.userService.changePassword(this.ChangePasswordForm.value).subscribe(
  //        (data) => {
  //          this.ChangePasswordForm.reset();
  //          this.successMessage = 'Sukces!';
  //          console.log('Sukces!')
  //          setTimeout(() => {
  //            this.successMessage = null;
  //          }, 3000);
  //        },
  //        (err) => {
  //          if (err.status === 400) {
  //            console.log('Złe hasło!');
  //            this.serverErrorMessages = 'Podano błędne dotychczasowe hasło!';
  //          }
  //        }
  //      );
  //    } else {
  //      this.IsFormValid = false;
  //    }
  //  }
   onClick(expression) {
    this.display = expression;
  }
}
