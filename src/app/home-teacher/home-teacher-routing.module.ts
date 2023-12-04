import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTeacherPage } from './home-teacher.page';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeTeacherPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTeacherPageRoutingModule {}
