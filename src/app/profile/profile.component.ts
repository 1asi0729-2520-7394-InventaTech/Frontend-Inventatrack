import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { User } from './user.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, NgIf, DatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user: User | null) => {
      this.user = user;
    });

    if (!this.user) {
      this.userService.getLoggedUser().subscribe(user => {
        this.user = user;
      });
    }
  }
}
