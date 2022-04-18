// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { HeaderComponent } from './admin-panel/header/header.component';
import { FooterComponent } from './admin-panel/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './admin-panel/content/home/home.component';
import { TemplatesComponent } from './admin-panel/content/templates/templates.component';
import { SettingsComponent } from './admin-panel/content/settings/settings.component';
import { RequestResetComponent } from './user/request-reset/request-reset.component';
import { ResponseResetComponent } from './user/response-reset/response-reset.component';
import { PasswordChangeComponent } from './admin-panel/content/password-change/password-change.component';
import { AccountDeleteComponent } from './admin-panel/content/account-delete/account-delete.component';
import {Theme1Component} from "./user-profile/templates/theme1/theme1.component";
import {Theme2Component} from "./user-profile/templates/theme2/theme2.component";
import { Theme3Component } from './user-profile/templates/theme3/theme3.component';
import { VisibilityComponent } from './admin-panel/content/visibility/visibility.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserProfileComponent,
    SignInComponent,
    SignUpComponent,
    AdminPanelComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TemplatesComponent,
    SettingsComponent,
    RequestResetComponent,
    ResponseResetComponent,
    PasswordChangeComponent,
    AccountDeleteComponent,
    Theme1Component,
    Theme2Component,
    Theme3Component,
    VisibilityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
