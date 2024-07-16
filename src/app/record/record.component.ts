import { Component } from '@angular/core';
import { User, Tutoria } from '../interface/interfaces';
import { TutoriaService } from '../service/tutoria.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrl: './record.component.css',
})
export class RecordComponent {
  userActual: User; // Almacena el usuario actual
  tutorias: Tutoria[] = []; // Array para almacenar la lista de tutorías

  constructor(
    private readonly userService: UserService, // Servicio para gestionar usuarios
    private readonly tutoriaService: TutoriaService // Servicio para gestionar tutorías
  ) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual
    this.tutorias = tutoriaService.getTutorias(); // Obtener la lista de tutorías
  }

  // Método para marcar una tutoría como culminada
  culminarTutoria(id: string) {
    this.tutoriaService.culminarTutoria(id); // Llamar al servicio para culminar la tutoría
  }
}
