// Interfaz que define la estructura de un usuario
export interface User {
  id?: string; // Identificador único del usuario
  nombres?: string; // Nombres del usuario
  apellidos?: string; // Apellidos del usuario
  ci?: string; // Cédula de identidad del usuario
  correo?: string; // Correo electrónico del usuario
  contraseña?: string; // Contraseña del usuario
  tipo?: string; // Tipo de usuario (por ejemplo, Estudiante o Profesor)
  tutor?: User; // Tutor asignado al usuario
}

// Interfaz que define la estructura de una tutoría
export interface Tutoria {
  id?: string; // Identificador único de la tutoría
  materia?: string; // Materia de la tutoría
  profesor?: User; // Profesor que imparte la tutoría
  estudiante?: User; // Estudiante que recibe la tutoría
  dia?: string; // Día en que se lleva a cabo la tutoría
  mes?: string; // Mes en que se lleva a cabo la tutoría
  hora?: string; // Hora en que se lleva a cabo la tutoría
  estado?: string; // Estado de la tutoría (por ejemplo, Pendiente, Aprobada, Rechazada, Culminada)
}
