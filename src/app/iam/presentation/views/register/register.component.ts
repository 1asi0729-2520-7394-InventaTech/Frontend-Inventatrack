import {Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {AuthStore} from '../../../application/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private authStore = inject(AuthStore);
  username = '';
  email = '';
  password = '';
  fullName = '';
  phone = '';
  address = '';
  role = '';
  url = '';

  isLoading = this.authStore.isLoading;
  errorMessage = this.authStore.error;

  onRegister() {
    if (!this.username || !this.email || !this.password || !this.fullName || !this.phone || !this.address || !this.role) {
      alert('Por favor completa los campos obligatorios');
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

    this.authStore.register(newUser);
  }
}



