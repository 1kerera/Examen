import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-home-teacher',
  templateUrl: './home-teacher.page.html',
  styleUrls: ['./home-teacher.page.scss'],
})
export class HomeTeacherPage implements OnInit {
  tuDatoQR: string;
  mostrarQR: boolean = false;

  constructor(public authService: AuthService) {
    this.tuDatoQR = '';
  }

  async generarQR() {
    // Verifica si el usuario autenticado es un docente
    if (this.authService.getRole() === 'Profesor Javier') {
      // Información para el registro de asistencia
      const asistenciaInfo = {
        clase_id: "PROGRAMACION DE APLICACIONES MOVILES_006V",
        profesor: "DUSTY CESAR TESSINI PANES",
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
      };

      // Convierte la información a una cadena JSON
      const codigoQRTexto = JSON.stringify(asistenciaInfo);

      try {
        // Genera el código QR con la información necesaria
        const codigoQR = await QRCode.toDataURL(codigoQRTexto);

        this.tuDatoQR = codigoQR;
        this.mostrarQR = true; // Muestra el QR cuando se genera
        console.log('Código QR generado con éxito:', codigoQR);
      } catch (error) {
        console.error('Error al generar el código QR. La información es demasiado grande.', error);
        // Intenta manejar el error dividiendo la información en partes más pequeñas
        this.dividirYGenerarQR(codigoQRTexto);
      }
    } else {
      // Manejar el caso en que un usuario no autorizado intenta generar un QR
      console.error('Acceso no autorizado para generar QR');
    }
  }

  dividirYGenerarQR(texto: string) {
    // Puedes implementar la lógica para dividir el texto y generar varios códigos QR
    // según tus necesidades y capacidad de procesamiento
    console.warn('La información es demasiado grande. Implementa la lógica para dividirla.');
  }

  logout() {
    // Cerrar sesión utilizando la función en el servicio
    this.authService.logout();
  }

  ngOnInit() {
    console.log("Se inició la página")
    this.mostrarQR = false;
  }
}
