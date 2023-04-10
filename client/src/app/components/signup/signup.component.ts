import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignupLoginResponseModel } from '../../models/signup.login.response.model';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public isFormSubmitted: boolean = false;
  public form: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private messageService: MessageService,
      private router: Router
    ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  public passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ missMatch: true });
    }
  }

  public getName() {
    return this.form.get('name')!;
  }

  public getEmail() {
    return this.form.get('email')!;
  }

  public getPassword() {
    return this.form.get('password')!;
  }

  public getConfirmPasswordField() {
    return this.form.get('confirmPassword')!;
  }

  public signup(): void {
    this.isFormSubmitted = true;
    if (this.form.invalid) {
      this.form.markAsUntouched();
    } else {
      this.authService.signup(this.form.value)
        .subscribe((response: SignupLoginResponseModel): void => {
          if (response.message) {
            this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: `${response.message}` });
          } else {
            this.authService.isAuthenticatedSubject.next(true);
            localStorage.setItem('access_token', response.access_token);
            this.form.reset();
            this.isFormSubmitted = false;
            this.messageService.add({ severity: 'success', summary: 'Інформація', detail: `Ви зареєстувалися) Ласкаво просимо` });
            this.router.navigate(['/movies'])
          }
        });
    }
  }

}
