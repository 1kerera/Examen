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

  constructor(private router: Router) {
    // Obtener el estado de autenticación del localStorage al inicio
    const storedAuth = localStorage.getItem('authenticated');
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(storedAuth === 'true');
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  login(username: string, password: string) {
    
    if (username === 'teacher' && password === '1234') {
      // Credenciales válidas para el profesor
      this.setAuthentication(true);
      this.router.navigate(['/home-teacher']);
    } else if (username === 'alumno' && password === '1234') {
      // Credenciales válidas para el alumno
      this.setAuthentication(true);
      this.router.navigate(['/home']);
    } else {
      // Credenciales inválidas
      this.setAuthentication(false);
    }
  }

  logout() {
    // Lógica de cierre de sesión
    this.setAuthentication(false);
  }

  private setAuthentication(value: boolean) {
    localStorage.setItem('authenticated', value.toString());
    this.isAuthenticatedSubject.next(value);
  }
}
