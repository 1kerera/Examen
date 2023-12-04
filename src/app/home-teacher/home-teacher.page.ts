import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.page.html',
  styleUrls: ['./home-teacher.page.scss'],
})
export class HomeTeacherPage implements OnInit {

  constructor(private authService: AuthService) {}

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }
  ngOnInit() {
  }

}
