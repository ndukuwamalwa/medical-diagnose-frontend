import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { SignupComponent } from './signup/signup.component';

import { LoginComponent } from './login/login.component';

import { AccountPageComponent } from './account/account-page/account-page.component';

import { DiagnoseComponent } from './account/diagnose/diagnose.component';

import { HistoryComponent } from './account/history/history.component';

import { BioComponent } from './account/bio/bio.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
      path: '',
      component: LoginComponent
    },
    {
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'account',
      canActivate: [AuthGuard],
      children: [
        {
          path: '',
          component: AccountPageComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'diagnose',
          component: DiagnoseComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'history',
          component: HistoryComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'bio',
          component: BioComponent,
          canActivate: [AuthGuard]
        }
      ]
    }
  ];
