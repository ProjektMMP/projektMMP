import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css'],
})
export class ResponseResetComponent implements OnInit {
  ResponseResetForm: FormGroup;
  serverErrorMessages: string;
  successMessage: string;
  token: string;
  CurrentState: any;
  IsResetFormValid = true;
  url: string[];
  

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {

  }

  myfunction(){
    this.url = window.location.href.split("/")
    this.token = this.url[4];
    console.log("tutaj mam hasza: ", this.url[4])
  }

  ngOnInit() {
    this.Init();
    this.myfunction();
  }

  Init() {
    this.ResponseResetForm = new FormGroup({
      userToken: new FormControl(
        null
      ),
      newPassword: new FormControl(
        null,
        [Validators.required, Validators.minLength(4)],
      ),
      confirmPassword: new FormControl(null,
        [Validators.required, Validators.minLength(4)],
      ),
    });
  }

  // Validate(passwordFormGroup: FormGroup) {
  //   const newpassword = passwordFormGroup.controls.newPassword.value;
  //   const confirm_password = passwordFormGroup.controls.confirmPassword.value;

  //   if (confirm_password.length <= 0) {
  //     return null;
  //   }

  //   if (confirm_password !== newpassword) {
  //     return {
  //       doesNotMatch: true,
  //     };
  //   }

  //   return true;
  // }

  onSubmit(form) {
    this.ResponseResetForm.value.userToken = this.token;
    console.log(form);
    if (form.valid) {
      this.IsResetFormValid = true;
      this.userService.responseReset(this.ResponseResetForm.value).subscribe(
        (data) => {
          // this.ResponseResetForm.reset();
          this.successMessage = 'Hasło zostało zmienione!';
          console.log('Sukces!')
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
        },
        (err) => {
          if (err.status === 400 || err.status === 401) {
            console.log('Zły link');
            this.serverErrorMessages = 'Link wygasł lub jest nieprawidłowy!';
          }
        }
      );
    } else {
      this.IsResetFormValid = false;
    }
  }
}
