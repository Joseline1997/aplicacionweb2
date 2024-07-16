import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../interface/interfaces';

@Component({
  selector: 'app-asign',
  templateUrl: './asign.component.html',
  styleUrl: './asign.component.css',
})
export class AsignComponent {
  public users: User[] = []; // Array para almacenar la lista de usuarios
  public profesores: User[] = []; // Array para almacenar la lista de profesores
  userActual: User; // Almacena el usuario actual

  constructor(private readonly userService: UserService) {
    this.users = userService.getUsers(); // Obtener la lista de usuarios
    this.userActual = userService.getUserActual(); // Obtener el usuario actual
    this.profesores = this.users.filter((item) => item.tipo === 'Profesor'); // Filtrar los usuarios para obtener solo los profesores
  }

  // Método para asignar un tutor a un estudiante
  asignarTutor(estudianteId: string, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const profesorId = selectElement.value;
    this.userService.asignTutor(estudianteId, profesorId); // Llamar al servicio para asignar el tutor
  }
}
