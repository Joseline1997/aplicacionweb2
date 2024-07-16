import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../service/user.service';
import { TutoriaService } from '../service/tutoria.service';
import { User } from '../interface/interfaces';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.css',
})
export class RequestComponent {
  requestForm: FormGroup; // Formulario reactivo para solicitar tutorías
  userActual: User; // Almacena el usuario actual

  constructor(
    private readonly fb: FormBuilder, // Constructor de formularios
    private readonly toastr: ToastrService, // Servicio para mostrar notificaciones
    private readonly userService: UserService, // Servicio para gestionar usuarios
    private readonly tutoriaService: TutoriaService // Servicio para gestionar tutorías
  ) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual
    this.requestForm = this.fb.group({
      dia: ['', [Validators.required]], // Campo de día con validación requerida
      mes: ['', [Validators.required]], // Campo de mes con validación requerida
      hora: ['', [Validators.required]], // Campo de hora con validación requerida
      materia: ['', [Validators.required]], // Campo de materia con validación requerida
    });
  }

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.requestForm.valid) {
      this.tutoriaService.createTutoria(this.requestForm.value); // Crear una nueva tutoría si el formulario es válido
    } else {
      // Mostrar notificación de error si el formulario no es válido
      if (this.requestForm)
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
}
