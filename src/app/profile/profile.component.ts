import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { User } from './user.model';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgIf, DatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe((user: User | null) => {
      this.user = user;
    });
    if (!this.user) {
      this.user = this.loginService.getCurrentUser();
    }
  }
}
