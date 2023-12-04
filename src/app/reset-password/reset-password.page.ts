// reset-password.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm: FormGroup = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  async resetPassword() {
    if (this.resetPasswordForm && this.resetPasswordForm.valid) {
      const currentPassword = this.resetPasswordForm.get('currentPassword')!.value;
      const newPassword = this.resetPasswordForm.get('newPassword')!.value;
      const confirmPassword = this.resetPasswordForm.get('confirmPassword')!.value;

      // Lógica para validar que la contraseña actual coincida con la almacenada
      // ...

      // Lógica para validar que la nueva contraseña y la confirmación coincidan
      if (newPassword === confirmPassword) {
        // Cambiar la contraseña utilizando el servicio AuthService
        this.authService.changePassword(newPassword);

        // Mostrar una alerta de éxito y redirigir a la página de inicio de sesión
        await this.presentSuccessAlert('Contraseña restablecida con éxito');
        this.router.navigate(['/login']);
      } else {
        // Mostrar una alerta de error si las contraseñas no coinciden
        await this.presentErrorAlert('Las contraseñas no coinciden. Por favor, corrige los errores.');
      }
    } else {
      // Mostrar una alerta de error si el formulario es inválido
      await this.presentErrorAlert('Formulario inválido. Por favor, corrige los errores.');
    }
  }

  // Función para mostrar una alerta de éxito con redirección
  async presentSuccessAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirigir a la página de inicio de sesión después de hacer clic en OK
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  // Función para mostrar una alerta de error con redirección
  async presentErrorAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Redirigir a la página de restablecer contraseña después de hacer clic en OK
            this.router.navigate(['/reset-password']);
          },
        },
      ],
    });

    await alert.present();
  }
}


