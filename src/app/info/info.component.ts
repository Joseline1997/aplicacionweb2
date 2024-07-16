import { Component } from '@angular/core';
import { User } from '../interface/interfaces';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  userActual: User; // Almacena el usuario actual

  constructor(private readonly userService: UserService) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual al inicializar el componente
  }
}
