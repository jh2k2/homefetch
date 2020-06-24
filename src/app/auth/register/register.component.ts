import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { AuthService } from '@app/shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.scss'],
})

export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) { }

  passwordsMatchValidator(control: FormControl): ValidationErrors | null {
    const password = control.root.get('password');
    return password && control.value !== password.value
      ? {
        passwordMatch: true,
      }
      : null;
  }

  roles = [
    { id: 0, name: 'Tenant' },
    { id: 1, name: 'Landlord' },
  ];

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required, this.passwordsMatchValidator]),
    role: new FormControl(this.roles[0]),
  });

  get username(): AbstractControl {
    return this.userForm.get('username')!;
  }

  get fullname(): AbstractControl {
    return this.userForm.get('fullname')!;
  }

  get email(): AbstractControl {
    return this.userForm.get('email')!;
  }

  get password(): AbstractControl {
    return this.userForm.get('password')!;
  }

  get repeatPassword(): AbstractControl {
    return this.userForm.get('repeatPassword')!;
  }

  register(): void {
    if (this.userForm.invalid) {
      return;
    }

    const { username, fullname, email, password, repeatPassword, role } = this.userForm.getRawValue();

    this.authService.register(username, fullname, email, password, repeatPassword, role).subscribe(data => {
      this.router.navigate(['']);
    });
  }
}
