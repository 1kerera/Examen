import { AuthService } from './../services/auth.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { AlertController } from '@ionic/angular';

interface ScannedBarcode {
  clase_id: string;
  profesor: string;
  fecha: string;
  hora: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  isSupported = false;
  barcodeData: string = '';
  scannedObject: ScannedBarcode | null = null;
  attendanceRecords: ScannedBarcode[] = [];

  constructor(
    private authService: AuthService,
    private menuController: MenuController,
    private navCtrl: NavController,
    private ngZone: NgZone,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

    this.loadAttendanceRecords();
  }


  getUsername(): string {
    return this.authService.getUsername();
  }

  logout() {
    this.menuController.close();
    this.authService.logout();
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }

    const { barcodes } = await BarcodeScanner.scan();

    if (barcodes.length > 0) {
      this.barcodeData = barcodes[0].rawValue;
      this.scannedObject = JSON.parse(this.barcodeData) as ScannedBarcode;

      this.saveAttendanceRecord(this.scannedObject);
    }
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  saveAttendanceRecord(record: ScannedBarcode): void {
    this.attendanceRecords.push(record);
    this.saveAttendanceRecords();
  }

  loadAttendanceRecords(): void {
    const recordsString = localStorage.getItem('attendanceRecords');
    if (recordsString) {
      this.attendanceRecords = JSON.parse(recordsString);
      this.ngZone.run(() => {});
    }
  }

  saveAttendanceRecords(): void {
    localStorage.setItem('attendanceRecords', JSON.stringify(this.attendanceRecords));
    this.ngZone.run(() => {});
  }
}
