import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css'],
})
export class PasswordChangeComponent implements OnInit {
  ChangePasswordForm: FormGroup;
  serverErrorMessages: string;
  successMessage: string;
  resetToken: null;
  CurrentState: any;
  IsFormValid = true;
  userDetails: any;
  display='';
  oldPassHelper: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.Init();
    this.userService.getAuthUserProfile().subscribe(
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
    this.ChangePasswordForm = this.fb.group({
      nickname: [''],
      passwordOld: ['', [Validators.required, Validators.minLength(4)]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  getOldPassword() {
    return this.ChangePasswordForm.value.passwordOld;
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true,
      };
    }

    return null;
  }

   onSubmit(form) {
     this.getOldPassword();
     console.log("Old password:" + this.getOldPassword());
     this.ChangePasswordForm.value.nickname = this.userDetails.nickname;
     this.IsFormValid = true;
     console.log(form);
     if (form.valid) {
       this.IsFormValid = true;
       console.log(this.ChangePasswordForm.value.newPassword);
       this.userService.changePassword(this.ChangePasswordForm.value).subscribe(
         (data) => {
           this.ChangePasswordForm.reset();
           this.successMessage = 'Sukces!';
           console.log('Sukces!')
           setTimeout(() => {
             this.successMessage = null;
           }, 3000);
         },
         (err) => {
           this.IsFormValid = false;
           if (err.status === 400) {
             console.log('Złe hasło!');
           }
         }
       );
     } else {
       this.IsFormValid = false;
     }
   }
   onClick(expression) {
    this.display = expression;
  }
}
