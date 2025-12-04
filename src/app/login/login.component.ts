import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.post<any>('/api/v1/auth/login', { username, password }).subscribe({
        next: (res) => {
          // Aquí asumimos que la API devuelve algo tipo { success: true/false }
          if (res && res.success) {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        error: (err: HttpErrorResponse) => {
          observer.error(err);
        }
      });
    });
  }

constructor(private loginService: LoginService, private router: Router) {}

  onLogin() {
    this.loading = true;
    this.errorMessage = '';

    this.loginService.login(this.username, this.password).subscribe({
      next: (user: User | null) => {
        this.loading = false;

        if (user) {
          localStorage.setItem('loggedUserId', user.id.toString());

          this.router.navigate(['/home']);
        } else {
          this.errorMessage = '❌ Usuario o contraseña inválidos';
        }
      },
      error: () => {
        this.loading = false;
        this.errorMessage = '⚠️ Error de conexión con el servidor';
      }
    });
  }




}




