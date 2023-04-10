import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {

  public isAuthenticated: boolean = false;

  constructor(
      private router: Router,
      private authService: AuthService,
      private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.authService.isAuthenticatedSubject.subscribe(value => {
      this.isAuthenticated = value;
    })
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public goToLogin(): void {
    this.router.navigate(['/login']);
  }

  public goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  public logout(): void {
    this.authService.logout().subscribe((): void => {
      localStorage.removeItem('access_token');
      this.authService.isAuthenticatedSubject.next(false);
      this.messageService.add({ severity: 'info', summary: 'Info', detail: `Ви вийшли із системи` });
    });
  }
}

