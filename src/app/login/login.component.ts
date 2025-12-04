import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { User } from '../profile/user.model';

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

  constructor(private loginService: LoginService, private router: Router) {}

onLogin() {
  this.loading = true;
  this.errorMessage = '';

  this.loginService.login(this.username, this.password).subscribe({
    next: (token: string) => {
      this.loading = false;
      if (token) {
        this.router.navigate(['/home']); // redirigir al home
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


