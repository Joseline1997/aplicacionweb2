import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InfoComponent } from './info/info.component';
import { ProfileComponent } from './profile/profile.component';
import { RequestComponent } from './request/request.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RecordComponent } from './record/record.component';
import { AdminComponent } from './admin/admin.component';
import { AsignComponent } from './asign/asign.component';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' }, // Redirecciona a 'index' si la ruta está vacía
  { path: 'index', component: IndexComponent }, // Ruta para el componente IndexComponent
  { path: 'login', component: LoginComponent }, // Ruta para el componente LoginComponent
  { path: 'register', component: RegisterComponent }, // Ruta para el componente RegisterComponent
  { path: 'about', component: InfoComponent }, // Ruta para el componente InfoComponent
  { path: 'profile', component: ProfileComponent }, // Ruta para el componente ProfileComponent
  { path: 'request', component: RequestComponent }, // Ruta para el componente RequestComponent
  { path: 'calendar', component: CalendarComponent }, // Ruta para el componente CalendarComponent
  { path: 'record', component: RecordComponent }, // Ruta para el componente RecordComponent
  { path: 'admin', component: AdminComponent }, // Ruta para el componente AdminComponent
  { path: 'asign', component: AsignComponent }, // Ruta para el componente AsignComponent
  { path: '**', redirectTo: 'index' }, // Redirecciona a 'index' si la ruta no coincide con ninguna definida
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importa RouterModule y aplica las rutas definidas
  exports: [RouterModule], // Exporta RouterModule para que esté disponible en toda la aplicación
})
export class AppRoutingModule {}
