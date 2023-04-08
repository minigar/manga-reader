import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isFormSubmitted: boolean = false;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  public getEmail() {
    return this.form.get('email')!;
  }

  public getPassword() {
    return this.form.get('password');
  }

  public login() {
    this.isFormSubmitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // встановлює всі поля як touched
    } else {
      this.form.reset();
      this.isFormSubmitted = false;
    }
  }

}
