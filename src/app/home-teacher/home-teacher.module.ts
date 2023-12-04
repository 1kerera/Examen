import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTeacherPageRoutingModule } from './home-teacher-routing.module';

import { HomeTeacherPage } from './home-teacher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeTeacherPageRoutingModule
  ],
  declarations: [HomeTeacherPage]
})
export class HomeTeacherPageModule {}
