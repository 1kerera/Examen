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
  private password: string = '1234'; // Cambia la contraseña inicial aquí

  constructor(private router: Router,) {
    // Obtener el estado de autenticación del localStorage al inicio
    const storedAuth = localStorage.getItem('authenticated');
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(storedAuth === 'true');
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    // Obtener el nombre de usuario del localStorage al inicio
    this.username = localStorage.getItem('username') || '';
  }

  login(username: string, password: string) {
    // Simular un retraso de 1 segundo (1000 milisegundos)
    const delayTime = 500;
  
    // Simular un retraso antes de procesar el inicio de sesión
    setTimeout(() => {
      if (username === 'Profesor Javier' && password === this.password) {
        this.username = 'Profesor Javier';
        this.setAuthentication(true);
        this.router.navigate(['/home-teacher']);
      } else if (username === 'Fernando' && password === this.password) {
        this.username = 'Fernando';
        this.setAuthentication(true);
        this.router.navigate(['/home']);
      } else {
        this.setAuthentication(false);
      }
    }, delayTime);
  }

  changePassword(newPassword: string) {
    // Cambiar la contraseña almacenada
    this.password = newPassword;
  }

  logout() {
    this.setAuthentication(false);
    // Redirige a la página de inicio de sesión después de cerrar sesión
    this.router.navigate(['/login']);
  }

  setAttendanceInfo(info: any) {
    // Guardar la información de asistencia en localStorage
    localStorage.setItem('attendanceInfo', JSON.stringify(info));
  }

  getAttendanceInfo() {
    const infoString = localStorage.getItem('attendanceInfo');
    return infoString ? JSON.parse(infoString) : null;
  }

  private setAuthentication(value: boolean) {
    localStorage.setItem('authenticated', value.toString());
    localStorage.setItem('username', value ? this.username : ''); // Almacena el nombre de usuario si está autenticado
    this.isAuthenticatedSubject.next(value);
  }

  getUsername(): string {
    return this.username;
  }

  getRole(): string {
    // Verifica si el nombre de usuario es "teacher" o "alumno"
    if (this.username === 'Profesor Javier') {
      return 'Profesor Javier';
    } else if (this.username === 'Fernando') {
      return 'Fernando';
    } else {
      // Maneja otros casos si es necesario
      return '';
    }
  }
}
