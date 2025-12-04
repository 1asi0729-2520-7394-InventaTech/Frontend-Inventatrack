import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  fullName = '';
  phone = '';
  address = '';
  role = '';
  url = '';
  message = '';
  messageColor = '';

  private apiUrl = 'https://inventatrack-azekbja3h9eyb0fy.canadacentral-01.azurewebsites.net/api/v1/users';

  constructor(private http: HttpClient, private router: Router) {}

  onRegister() {
    if (!this.username || !this.email || !this.password || !this.fullName || !this.phone || !this.address || !this.role) {
      this.message = 'Por favor, completa todos los campos obligatorios.';
      this.messageColor = 'error';
      return;
    }

    const newUser = {
      username: this.username,
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      phone: this.phone,
      address: this.address,
      role: this.role,
      url: this.url || 'https://via.placeholder.com/150'
    };

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      this.message = '❌ Debes estar logueado como admin para crear usuarios.';
      this.messageColor = 'error';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.post(this.apiUrl, newUser, { headers, observe: 'response', responseType: 'text' })
      .subscribe({
        next: (resp) => {
          if (resp.status === 201 || resp.status === 200) {
            this.message = '✅ Usuario registrado exitosamente.';
            this.messageColor = 'success';
            setTimeout(() => this.router.navigate(['/login']), 1500);
          } else {
            this.message = '❌ Ocurrió un error al registrar el usuario.';
            this.messageColor = 'error';
          }
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          if (err.status === 401 || err.status === 403) {
            this.message = '❌ No tienes permisos para registrar usuarios. Necesitas ser admin.';
          } else {
            this.message = `❌ Ocurrió un error al registrar el usuario. (${err.status})`;
          }
          this.messageColor = 'error';
        }
      });
  }
}



