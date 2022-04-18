import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visibility',
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.css']
})
export class VisibilityComponent implements OnInit {
  ShowBlogForm: FormGroup;
  HideBlogForm: FormGroup;
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
  ) { }

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
    this.HideBlogForm = this.fb.group({
      nickname: [''],
    });
    this.ShowBlogForm = this.fb.group({
      nickname: [''],
    })
  }

  onSubmitHide(form) {
    this.HideBlogForm.value.nickname = this.userDetails.nickname;
    this.userService.hideBlog(this.HideBlogForm.value).subscribe(
      (data) => {
        this.HideBlogForm.reset();
        this.successMessage = 'Blog ukryty!';
        console.log('Blog ukryty')
      },
      (err) => {
        console.log('');
      }
    )
  }

  onSubmitShow(form) {
    this.ShowBlogForm.value.nickname = this.userDetails.nickname;
    this.userService.showBlog(this.ShowBlogForm.value).subscribe(
      (data) => {
        this.ShowBlogForm.reset();
        this.successMessage = 'Blog już nie jest ukryty!';
        console.log('Blog już nie ukryty')
      },
      (err) => {
        console.log('Błąd przy udostępnianiu blogu');
      }
    )
  }
  onClick(expression) {
    this.display = expression;
  }
}
