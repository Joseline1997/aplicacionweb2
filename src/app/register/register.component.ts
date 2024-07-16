import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interface/interfaces';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup; // Formulario reactivo para el registro de usuarios
  user: User[] = []; // Array para almacenar la lista de usuarios
  userActual: User; // Almacena el usuario actual

  constructor(
    private readonly fb: FormBuilder, // Constructor de formularios
    private readonly toastr: ToastrService, // Servicio para mostrar notificaciones
    private readonly userService: UserService // Servicio para gestionar usuarios
  ) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual
    this.registerForm = this.fb.group({
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[ep][0-9]{10}@live.uleam.edu.ec$'), // Validar correo institucional
        ],
      ],
      nombres: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z\\s]+$'), // Validar que solo contenga letras y espacios
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z\\s]+$'), // Validar que solo contenga letras y espacios
        ],
      ],
      ci: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10), // Validar longitud de 10 caracteres
        ],
      ],
      contraseña: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
          CustomValidators.passwordValidator(), // Validar contraseña con requisitos específicos
        ],
      ],
      contraseña2: ['', [Validators.required, Validators.minLength(6)]], // Campo para confirmar contraseña
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.contraseña !==
        this.registerForm.value.contraseña2
      ) {
        // Mostrar notificación de error si las contraseñas no coinciden
        this.toastr.error('Las contraseñas no coinciden!', 'Error!', {
          closeButton: true,
          progressBar: true,
          easeTime: 150,
          easing: 'ease-in',
          onActivateTick: true,
          newestOnTop: true,
          progressAnimation: 'decreasing',
          timeOut: 1500,
        });
      } else {
        // Registrar el usuario si las contraseñas coinciden
        this.userService.registrarUsuario(this.registerForm.value);
      }
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

  // Método para obtener usuarios desde localStorage
  obtenerUsuarios() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}

// Clase para validaciones personalizadas
export class CustomValidators {
  // Validador de fortaleza de contraseña
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value); // Verificar que tenga mayúsculas
      const hasLowerCase = /[a-z]/.test(value); // Verificar que tenga minúsculas
      const hasNumeric = /[0-9]/.test(value); // Verificar que tenga números
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value); // Verificar que tenga caracteres especiales
      const isValid =
        hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !isValid ? { passwordStrength: true } : null; // Retornar error si no es válida
    };
  }
}
