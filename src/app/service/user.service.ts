import { Injectable } from '@angular/core';
import { User } from '../interface/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: User[] = []; // Array para almacenar la lista de usuarios

  constructor(
    private readonly toastr: ToastrService, // Servicio para mostrar notificaciones
    private readonly router: Router // Servicio para navegación
  ) {
    this.loadUsers(); // Cargar usuarios desde localStorage al inicializar el servicio
  }

  // Método privado para cargar usuarios desde localStorage
  private loadUsers(): void {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  // Método privado para generar un UUID para identificar usuarios de manera única
  private generateUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Método público para obtener la lista de usuarios
  getUsers(): User[] {
    return this.users;
  }

  // Método público para registrar un nuevo usuario
  registrarUsuario(user: User) {
    const existe = this.users.find(
      (usr) => usr.correo === user.correo || usr.ci === user.ci
    );

    if (existe) {
      // Mostrar notificación de error si el usuario ya existe
      this.toastr.error('Usuario ya existe', 'Error!', {
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
      // Crear un nuevo usuario y agregarlo a la lista
      const usuarioNuevo: User = {
        id: this.generateUUID(),
        nombres: user.nombres,
        apellidos: user.apellidos,
        ci: user.ci,
        correo: user.correo,
        contraseña: user.contraseña,
        tipo: user.correo?.at(0) === 'e' ? 'Estudiante' : 'Profesor',
      };
      this.users.push(usuarioNuevo);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.router.navigate(['/login']);
      // Mostrar notificación de éxito
      this.toastr.success('Usuario registrado con éxito', 'Ok!', {
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

  // Método público para iniciar sesión
  login(email: string, password: string) {
    const existe = this.users.find((user) => user.correo === email);
    if (existe) {
      if (existe.contraseña === password) {
        // Mostrar notificación de éxito y navegar al perfil del usuario
        this.toastr.success(`Bienvenido ${existe.nombres}`, 'Ok!', {
          closeButton: true,
          progressBar: true,
          easeTime: 150,
          easing: 'ease-in',
          onActivateTick: true,
          newestOnTop: true,
          progressAnimation: 'decreasing',
          timeOut: 1500,
        });
        localStorage.setItem('userActual', JSON.stringify(existe));
        this.router.navigate(['/profile']);
      }
    } else {
      // Mostrar notificación de error si el usuario no existe
      this.toastr.error('Usuario no existe', 'Error!', {
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

  // Método público para cerrar sesión
  logout() {
    localStorage.removeItem('userActual'); // Eliminar el usuario actual de localStorage
    this.router.navigate(['/index']); // Navegar a la página principal
  }

  // Método público para obtener el usuario actual
  getUserActual() {
    const user = localStorage.getItem('userActual');
    return JSON.parse(user!);
  }

  // Método público para buscar un usuario por su ID
  searchUsuario(id: string) {
    return this.users.find((usr) => usr.id === id);
  }

  // Método público para asignar un tutor a un estudiante
  asignTutor(idEstudiante: string, idTutor: string) {
    const estudiante = this.searchUsuario(idEstudiante);
    const profesor = this.searchUsuario(idTutor);
    if (estudiante) {
      const index = this.users.findIndex((user) => user.id === idEstudiante);
      this.users[index] = {
        ...this.users[index],
        tutor: profesor,
      };
      localStorage.setItem('users', JSON.stringify(this.users));
      this.loadUsers(); // Recargar la lista de usuarios
    }
  }
}
