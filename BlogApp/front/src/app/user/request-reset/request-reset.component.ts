import { Component, OnInit } from '@angular/core';
import {
  NgForm,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css'],
})
export class RequestResetComponent implements OnInit {
  RequestResetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  serverErrorMessages: string;
  successMessage: string;
  IsvalidForm = true;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.RequestResetForm = new FormGroup({
      email: new FormControl(
        null,
        [Validators.required, Validators.email],
        this.forbiddenEmails
      ),
    });
  }

  onSubmit(form) {
    console.log(form);
    if (form.valid) {
      this.IsvalidForm = true;
      this.userService.requestReset(this.RequestResetForm.value).subscribe(
        (data) => {
          this.RequestResetForm.reset();
          this.successMessage =
            'Link do zresetowania hasła wysłany na podany adres e-mail.';
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
          this.serverErrorMessages = '';
        },
        (err) => {
          this.serverErrorMessages = err.error.message;
        }
      );
    } else {
      this.IsvalidForm = false;
    }
  }
}
