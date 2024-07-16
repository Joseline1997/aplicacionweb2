import { Component } from '@angular/core';
import { Tutoria, User } from '../interface/interfaces';
import { UserService } from '../service/user.service';
import { TutoriaService } from '../service/tutoria.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  userActual: User; // Almacena el usuario actual
  tutorias: Tutoria[] = []; // Array para almacenar la lista de tutorías

  constructor(
    private readonly userService: UserService, // Servicio para gestionar usuarios
    private readonly tutoriaService: TutoriaService // Servicio para gestionar tutorías
  ) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual
    this.tutorias = tutoriaService.getTutorias(); // Obtener la lista de tutorías
  }
}
