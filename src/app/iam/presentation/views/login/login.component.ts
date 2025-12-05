import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../application/auth.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private authStore = new AuthStore();
  username = '';
  password = '';

  isLoading = this.authStore.isLoading;
  errorMessage = this.authStore.error;

  onLogin() {
    this.authStore.login({
      username: this.username,
      password: this.password
    });
  }
}

