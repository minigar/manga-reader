import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

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
      this.form.markAllAsTouched();
    } else {
      this.authService.login(this.form.value).subscribe(response => {
        if (response.message) {
          this.messageService.add({ severity: 'warn', summary: 'Інформація', detail: `${response.message}` })
        } else {
          this.authService.isAuthenticatedSubject.next(true);
          localStorage.setItem('access_token', response.access_token);
          this.form.reset();
          this.isFormSubmitted = false;
          this.messageService.add({ severity: 'success', summary: 'Інформація', detail: `Ви ввійшли в систему` });
          this.router.navigate(['/movies'])
        }
      })
    }
  }

}
