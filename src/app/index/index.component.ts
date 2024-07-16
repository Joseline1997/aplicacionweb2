import { Component } from '@angular/core';
import { User } from '../interface/interfaces';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  userActual: User; // Almacena el usuario actual

  constructor(private readonly userService: UserService) {
    this.userActual = userService.getUserActual(); // Obtener el usuario actual al inicializar el componente
  }
}
