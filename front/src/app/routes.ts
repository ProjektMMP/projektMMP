import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './shared/user.service';
import { RequestResetComponent } from './user/request-reset/request-reset.component';
import { ResponseResetComponent } from './user/response-reset/response-reset.component';
import { PasswordChangeComponent } from './admin-panel/content/password-change/password-change.component';
import { AccountDeleteComponent } from './admin-panel/content/account-delete/account-delete.component';
import { SettingsComponent } from './admin-panel/content/settings/settings.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: UserComponent,
    children: [{ path: '', component: SignInComponent }],
  },
  {
    path: 'signup',
    component: UserComponent,
    children: [{ path: '', component: SignUpComponent }],
  },
  {
    path: 'requestreset',
    component: UserComponent,
    children: [{ path: '', component: RequestResetComponent }],
  },
  {
    path: 'responseresetpassword/:token',
    component: UserComponent,
    children: [{ path: '', component: ResponseResetComponent }],
  },
  {
    path: 'adminpanel',
    component: AdminPanelComponent,
    canActivate: [AuthGuard],
    // children: [
    //   { path: 'settings', component: SettingsComponent },
    //   { path: 'password-change', component: PasswordChangeComponent },
    // ],
  },
  {
    path: 'userprofile',
    component: UserProfileComponent,
    //canActivate: [AuthGuard],
  },
  {
    path: 'adminpanel',
    component: AdminPanelComponent,
  },
  {
    path:'blog/:id', component:UserProfileComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
