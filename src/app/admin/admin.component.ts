import { Component } from '@angular/core';
import { Tutoria, User } from '../interface/interfaces';
import { UserService } from '../service/user.service';
import { TutoriaService } from '../service/tutoria.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  userActual: User; // Almacena el usuario actual
  tutorias: Tutoria[] = []; // Array para almacenar la lista de tutorías

  constructor(
    private readonly userService: UserService, // Servicio para gestionar usuarios
    private readonly tutoriaService: TutoriaService // Servicio para gestionar tutorías
  ) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual
    this.tutorias = tutoriaService.getTutorias(); // Obtener la lista de tutorías
  }

  // Método para aceptar una tutoría
  aceptarTutoria(id: string) {
    this.tutoriaService.aceptarTutoria(id); // Llamar al servicio para aceptar la tutoría
  }

  // Método para rechazar una tutoría
  rechazarTutoria(id: string) {
    this.tutoriaService.rechazarTutoria(id); // Llamar al servicio para rechazar la tutoría
  }
}
