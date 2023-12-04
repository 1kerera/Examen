// login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    // Inicializa el formulario en el constructor
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Puedes mover la lógica de inicialización del formulario aquí si lo prefieres
  }

  login() {
    // Verifica si el formulario y sus controles existen y si el formulario es válido
    if (
      //Esto es para solucionar el error que daba la variable USERNAME ya que podia ser NULL
      this.loginForm &&
      this.loginForm.get('username') &&
      this.loginForm.get('password') &&
      this.loginForm.get('username')!.value &&
      this.loginForm.get('password')!.value
    ) {
      const username = this.loginForm.get('username')!.value;
      const password = this.loginForm.get('password')!.value;
  
      // Llamada a la lógica de inicio de sesión en el servicio
      this.authService.login(username, password);
    } else {
      console.log('Formulario inválido. Por favor, corrige los errores.');
    }
  }
  
}
