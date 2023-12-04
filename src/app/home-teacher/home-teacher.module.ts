import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeTeacherPageRoutingModule } from './home-teacher-routing.module';
import { HomeTeacherPage } from './home-teacher.page';
import { QrCodeModule } from 'ng-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTeacherPageRoutingModule,
    QrCodeModule,
  ],
  declarations: [HomeTeacherPage]
})
export class HomeTeacherPageModule {}
