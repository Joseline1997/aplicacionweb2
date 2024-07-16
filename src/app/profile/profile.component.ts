import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from '../interface/interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userActual: User = {}; // Almacena el usuario actual

  constructor(public readonly userService: UserService) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual al inicializar el componente
  }

  // Método para cerrar sesión
  logout() {
    this.userService.logout(); // Llamar al servicio para cerrar sesión
  }
}
