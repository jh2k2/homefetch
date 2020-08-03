import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { Register1Component } from './register1/register1.component';
import { PasswordComponent } from './password/password.component';
import { MyPropertyComponent } from './my-property/my-property.component';
import { RequestComponent } from './request/request.component';
import { WaitlistComponent } from './waitlist/waitlist.component';

import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'landlordreg', component: Register1Component },
  { path: 'profile/:username', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'password', component: PasswordComponent, canActivate: [AuthGuardService] },
  { path: 'property', component: MyPropertyComponent, canActivate: [AuthGuardService] },
  { path: 'request', component: RequestComponent, canActivate: [AuthGuardService] },
  { path: 'waitlist', component: WaitlistComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
