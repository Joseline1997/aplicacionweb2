import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { User } from '../interface/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  userActual: User; // Almacena el usuario actual
  loginForm: FormGroup; // Formulario reactivo para el inicio de sesión

  constructor(
    private readonly fb: FormBuilder, // Constructor de formularios
    private readonly toastr: ToastrService, // Servicio para mostrar notificaciones
    private readonly userService: UserService // Servicio para gestionar usuarios
  ) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]], // Campo de email con validación requerida
      password: ['', [Validators.required]], // Campo de contraseña con validación requerida
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.loginForm.valid) {
      this.iniciarSesion(); // Iniciar sesión si el formulario es válido
    } else {
      // Mostrar notificación de error si el formulario no es válido
      this.toastr.error('Rellene todos los campos correctamente!', 'Error!', {
        closeButton: true,
        progressBar: true,
        easeTime: 150,
        easing: 'ease-in',
        onActivateTick: true,
        newestOnTop: true,
        progressAnimation: 'decreasing',
        timeOut: 1500,
      });
    }
  }

  // Método para iniciar sesión
  iniciarSesion() {
    this.userService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
  }
}
