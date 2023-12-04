import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    console.log('Iniciando sesión', this.username, this.password);
    
    // Llamada a la lógica de inicio de sesión en el servicio
    this.authService.login(this.username, this.password);
  }
}

