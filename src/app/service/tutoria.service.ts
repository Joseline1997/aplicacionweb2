import { Injectable } from '@angular/core';
import { Tutoria, User } from '../interface/interfaces';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TutoriaService {
  private tutorias: Tutoria[] = []; // Array para almacenar la lista de tutorías

  constructor(
    private readonly toastr: ToastrService, // Servicio para mostrar notificaciones
    private readonly router: Router, // Servicio para navegación
    private readonly userService: UserService // Servicio para gestionar usuarios
  ) {
    this.loadTutorias(); // Cargar tutorías desde localStorage al inicializar el servicio
  }

  // Método privado para cargar tutorías desde localStorage
  private loadTutorias(): void {
    const storedTutorias = localStorage.getItem('tutorias');
    this.tutorias = storedTutorias ? JSON.parse(storedTutorias) : [];
  }

  // Método público para obtener la lista de tutorías
  public getTutorias(): Tutoria[] {
    return this.tutorias;
  }

  // Método privado para generar un UUID para identificar tutorías de manera única
  private generateUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Método público para crear una nueva tutoría
  public createTutoria(tutoriaNueva: Tutoria) {
    const estudiante: User = this.userService.getUserActual(); // Obtener el usuario actual
    this.tutorias.push({
      id: this.generateUUID(),
      dia: tutoriaNueva.dia,
      estado: 'Pendiente',
      estudiante: estudiante,
      profesor: estudiante.tutor,
      hora: tutoriaNueva.hora,
      materia: tutoriaNueva.materia,
      mes: tutoriaNueva.mes,
    });
    localStorage.setItem('tutorias', JSON.stringify(this.tutorias));
    // Mostrar notificación de éxito
    this.toastr.success('Tutoría registrada con éxito', 'Ok!', {
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

  // Método público para buscar una tutoría por su ID
  searchTutoria(id: string) {
    return this.tutorias.findIndex((ttr) => ttr.id === id);
  }

  // Método público para aceptar una tutoría
  public aceptarTutoria(id: string) {
    const index = this.searchTutoria(id);
    this.tutorias[index] = {
      ...this.tutorias[index],
      estado: 'Aprobada',
    };
    localStorage.setItem('tutorias', JSON.stringify(this.tutorias));
    this.loadTutorias(); // Recargar la lista de tutorías
  }

  // Método público para rechazar una tutoría
  public rechazarTutoria(id: string) {
    const index = this.searchTutoria(id);
    this.tutorias[index] = {
      ...this.tutorias[index],
      estado: 'Rechazada',
    };
    localStorage.setItem('tutorias', JSON.stringify(this.tutorias));
    this.loadTutorias(); // Recargar la lista de tutorías
  }

  // Método público para culminar una tutoría
  public culminarTutoria(id: string) {
    const index = this.searchTutoria(id);
    this.tutorias[index] = {
      ...this.tutorias[index],
      estado: 'Culminada',
    };
    localStorage.setItem('tutorias', JSON.stringify(this.tutorias));
    this.loadTutorias(); // Recargar la lista de tutorías
  }
}
