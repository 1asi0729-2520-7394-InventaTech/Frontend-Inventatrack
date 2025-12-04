import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

    this.http.post(this.apiUrl, newUser, { responseType: 'text' }).subscribe({
      next: () => {
        // Usuario registrado correctamente
        this.message = '✅ Usuario registrado exitosamente.';
        this.messageColor = 'success';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        if (err.status === 201 || err.status === 200) {
          // Backend devolvió status correcto pero Angular lo considera error porque no es JSON
          this.message = '✅ Usuario registrado exitosamente.';
          this.messageColor = 'success';
          setTimeout(() => this.router.navigate(['/login']), 1500);
        } else {
          this.message = '❌ Ocurrió un error al registrar el usuario.';
          this.messageColor = 'error';
        }
      }
    });
  }
}




