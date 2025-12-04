import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from './register.service';
import { User } from '../profile/user.model';

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

  constructor(private registerService: RegisterService, private router: Router) {}

  onRegister() {
    if (!this.username || !this.email || !this.password || !this.fullName || !this.phone || !this.address || !this.role) {
      this.message = 'Por favor, completa todos los campos obligatorios.';
      this.messageColor = 'error';
      return;
    }

    const newUser: Partial<User> = {
      username: this.username,
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      phone: this.phone,
      address: this.address,
      role: this.role,
      url: this.url || 'https://via.placeholder.com/150'
    };

    this.registerService.register(newUser).subscribe({
      next: (res) => {
        this.message = '✅ Usuario registrado exitosamente.';
        this.messageColor = 'success';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        this.message = '❌ Ocurrió un error al registrar el usuario.';
        this.messageColor = 'error';
      }
    });
  }
}



