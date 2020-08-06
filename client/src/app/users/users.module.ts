import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { PasswordComponent } from './password/password.component';
import { MyPropertyComponent } from './my-property/my-property.component';
import { Register1Component } from './register1/register1.component';
import { WaitlistComponent } from './waitlist/waitlist.component';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, SettingsComponent, PasswordComponent, MyPropertyComponent, Register1Component, WaitlistComponent]
})
export class UsersModule { }
