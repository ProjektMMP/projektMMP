import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, CheckboxControlValueAccessor } from '@angular/forms';
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
    this.DeleteAccountForm = this.fb.group({
      nickname: [''],
      passwordDelete: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit(form) {
    this.DeleteAccountForm.value.nickname = this.userDetails.nickname;
    console.log(form.value.nickname);
    if(form.valid) {
      this.IsFormDeleteValid = true;
      this.userService.deleteAccount(this.DeleteAccountForm.value).subscribe(
        (data) => {
          this.DeleteAccountForm.reset();
          this.successMessage = 'Konto usunięte!';
          console.log('Konto usuniete');
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
    },
    (err) => {
      console.log('Błąd usuwania konta!');
    })
  }
}

  onClick(expression) {
    this.display = expression;
  }

  addVisibility(isVisible) {
    this.userService.setVisibility(isVisible);
    console.log('visibility: '+this.userDetails.isVisible)
  }
}
