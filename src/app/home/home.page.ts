import { AuthService } from './../services/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { BarcodeFormat } from '@zxing/library';
import { ToastController } from '@ionic/angular';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins, Capacitor } from '@capacitor/core';

const { Permissions } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  asistenciaEscaneada: any;
  QR_CODE = BarcodeFormat.QR_CODE;

  constructor(
    private authService: AuthService,
    private menuController: MenuController,
    private navCtrl: NavController,
    private toastController: ToastController,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.checkPermissions();
  }

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout() {
    this.menuController.close();
    this.authService.logout();
  }

  onScanSuccess(result: any) {
    if (result.format === this.QR_CODE) {
      try {
        const asistenciaInfo = JSON.parse(result.code);
        this.asistenciaEscaneada = asistenciaInfo;
      } catch (error) {
        console.error('Error al analizar el código QR:', error);
      }
    }
  }

  startManualScan() {
    // Muestra un mensaje temporal indicando que se iniciará el escaneo manual
    this.presentToast('Iniciando escaneo manual...');

    // Puedes agregar lógica adicional aquí para iniciar el escaneo manual si es necesario
    // Por ejemplo, puedes activar la cámara nuevamente, etc.
  }

  async checkPermissions(): Promise<void> {
    const cameraPermission = await this.checkCameraPermission();

    // Puedes agregar más verificaciones de permisos aquí según sea necesario
  }

  async checkCameraPermission(): Promise<boolean> {
    if (Capacitor.isNative) {
      const cameraStatus = await Permissions['query']({ name: 'camera' });

      if (cameraStatus.state === 'prompt' || cameraStatus.state === 'granted') {
        return true;
      }

      if (cameraStatus.state === 'denied') {
        await this.requestCameraPermission();
      }

      if (cameraStatus.state === 'blocked') {
        this.ngZone.run(() => {
          this.presentToast('El permiso de cámara está bloqueado. Por favor, habilite el permiso de cámara en la configuración del dispositivo.');
        });
      }

      return false;
    }

    // Si no es una aplicación nativa, simplemente asumimos que tiene permiso
    return true;
  }

  async requestCameraPermission(): Promise<boolean> {
    if (Capacitor.isNative) {
      const result = await Permissions['request']({ name: 'camera' });

      if (result.state === 'granted') {
        return true;
      }

      this.ngZone.run(() => {
        this.presentToast('El permiso de cámara ha sido denegado. Por favor, habilite el permiso de cámara en la configuración del dispositivo.');
      });

      return false;
    }

    // Si no es una aplicación nativa, simplemente asumimos que tiene permiso
    return true;
  }

  async presentToast(message: string): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duración del mensaje en milisegundos
      position: 'bottom' // Posición del mensaje en la pantalla
    });
    toast.present();
  }
}
