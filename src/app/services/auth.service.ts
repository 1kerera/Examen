// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;
  private username: string = '';

  constructor(private router: Router) {
    // Obtener el estado de autenticación del localStorage al inicio
    const storedAuth = localStorage.getItem('authenticated');
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(storedAuth === 'true');
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    // Obtener el nombre de usuario del localStorage al inicio
    this.username = localStorage.getItem('username') || '';
  }

  login(username: string, password: string) {
    if (username === 'teacher' && password === '1234') {
      this.username = 'teacher';
      this.setAuthentication(true);
      this.router.navigate(['/home-teacher']);
    } else if (username === 'alumno' && password === '1234') {
      this.username = 'alumno';
      this.setAuthentication(true);
      this.router.navigate(['/home']);
    } else {
      this.setAuthentication(false);
    }
  }

  logout() {
    this.setAuthentication(false);
    // Redirige a la página de login después de cerrar sesión
    this.router.navigate(['/login']);
  }

  private setAuthentication(value: boolean) {
    localStorage.setItem('authenticated', value.toString());
    localStorage.setItem('username', value ? this.username : ''); // Almacena el nombre de usuario si está autenticado
    this.isAuthenticatedSubject.next(value);
  }

  getUsername(): string {
    return this.username;
  }
}
