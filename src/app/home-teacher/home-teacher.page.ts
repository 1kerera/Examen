import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.page.html',
  styleUrls: ['./home-teacher.page.scss'],
})
export class HomeTeacherPage implements OnInit {

  tuDatoQR: string;
  mostrarQR: boolean = false; // Variable para controlar la visibilidad del QR

  constructor(private authService: AuthService) {
    this.tuDatoQR = 'valor xDDDDD';
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout() {
    this.authService.logout();
  }

  // Función para generar el código QR
  generarQR() {
    // Aquí debes poner la lógica para generar el código QR, por ejemplo, asignar un valor a 'tuDatoQR'
    this.tuDatoQR = 'DatosParaQR';
    this.mostrarQR = true; // Mostrar el QR cuando se genera
  }

  ngOnInit() {
  }
}
