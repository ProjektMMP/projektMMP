import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'adminpanel', component: AdminPanelComponent,canActivate:[AuthGuard]
    },
  {
    path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
  },
  {
    path:'adminpanel', component: AdminPanelComponent
  },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
