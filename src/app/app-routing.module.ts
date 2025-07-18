import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { InicioComponent } from './componentes/principales/inicio/inicio.component';
import { ContactoComponent } from './componentes/principales/contacto/contacto.component';

import { CarreraComponent } from './componentes/carrera/carrera/carrera.component';
import { CarreravalidarComponent } from './componentes/carrera/carreravalidar/carreravalidar.component';
import { CarreraregistrarcodigoComponent } from './componentes/carrera/carreraregistrarcodigo/carreraregistrarcodigo.component';
import { CarreraregistrarlibreComponent } from './componentes/carrera/carreraregistrarlibre/carreraregistrarlibre.component';
import { CiudadelaComponent } from './componentes/ciudadela/ciudadela/ciudadela.component';
import { CiudadelaregistrarlibreComponent } from './componentes/ciudadela/ciudadelaregistrarlibre/ciudadelaregistrarlibre.component';
import { CiudadelavalidarComponent } from './componentes/ciudadela/ciudadelavalidar/ciudadelavalidar.component';
import { FutbolfamiliaComponent } from './componentes/futbolfamilia/futbolfamilia/futbolfamilia.component';
import { BaloncestoComponent } from './componentes/baloncesto/baloncesto/baloncesto.component';
import { TerminosciudComponent } from './componentes/ciudadela/terminosciud/terminosciud.component';
import { LoginadminComponent } from './componentes/usuarios/administrador/loginadmin/loginadmin.component';
import { InicioadminComponent } from './componentes/usuarios/administrador/inicioadmin/inicioadmin.component';
import { DatosadminComponent } from './componentes/usuarios/administrador/datosadmin/datosadmin.component';
import { LoginciudComponent } from './componentes/usuarios/validador/ciudadela/loginciud/loginciud.component';
import { IniciociudComponent } from './componentes/usuarios/validador/ciudadela/iniciociud/iniciociud.component';
import { IniciocarreraComponent } from './componentes/usuarios/validador/carrera/iniciocarrera/iniciocarrera.component';
import { LogincarreraComponent } from './componentes/usuarios/validador/carrera/logincarrera/logincarrera.component';


import { AdministradorGuard } from './servicios/guardas/administrador.guard';
import { CarreraGuard } from './servicios/guardas/carrera.guard';
import { CiudadelaGuard } from './servicios/guardas/ciudadela.guard';
import { TerminoscarreraComponent } from './componentes/carrera/terminoscarrera/terminoscarrera.component';
import { NosotrosComponent } from './componentes/principales/nosotros/nosotros.component';
import { DetalleEventoComponent } from './componentes/principales/eventos/detalle-evento.component';



const routes: Routes = [

  //INICIO
  { path: '', redirectTo: '/inicio', pathMatch: 'full'},
  { path: 'inicio', component: InicioComponent, },
  { path: 'nosotros', component: NosotrosComponent, },
  { path: 'contacto', component: ContactoComponent, },

  // EVENTOS
  { path: 'evento/:id', component: DetalleEventoComponent, },








  //CARRERA
  { path: 'eventosgobernacion/inscribirse', component: CarreraregistrarcodigoComponent, },// revisar inv de tallas, hacer cambio validación tallas y cambiar routing
  { path: 'eventos/terminos', component: TerminoscarreraComponent, },
  { path: 'eventos/carrera/codigos', component: CarreraregistrarlibreComponent, },// revisar inv de tallas, hacer cambio validación tallas
  { path: 'carrera/login', component: LogincarreraComponent, },
  { path: 'carrera/login/inicio', component: IniciocarreraComponent, canActivate:[CarreraGuard] },






  //ADMINISTRADORES
  { path: 'administrador/login', component: LoginadminComponent, },
  { path: 'administrador/login/inicio', component: InicioadminComponent, canActivate:[AdministradorGuard] },
  { path: 'administrador/login/validar', component: DatosadminComponent, canActivate:[AdministradorGuard]},



  //VALIDADORES
  { path: 'carrera/entrega', component: IniciocarreraComponent },






  { path: '**', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
