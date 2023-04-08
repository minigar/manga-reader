import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public isFormSubmitted: boolean = false;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

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
      this.form.reset();
      this.isFormSubmitted = false;
    }
  }

}
