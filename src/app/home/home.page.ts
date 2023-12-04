// home.page.ts
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService,
              private menuController: MenuController) {}

  getUsername(): string {
    return this.authService.getUsername();
  }

  logout() {
    this.menuController.close();
    this.authService.logout();
  }
}

