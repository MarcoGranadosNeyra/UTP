import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityGuard } from './guard/security.guard';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { EspecialidadComponent } from './pages/paciente/cita/especialidad/especialidad.component';
import { ExamenComponent } from './pages/paciente/cita/examen/examen.component';
import { FechaComponent } from './pages/paciente/cita/fecha/fecha.component';
import { MedicoComponent } from './pages/paciente/cita/medico/medico.component';
import { ConfirmarComponent } from './pages/paciente/cita/confirmar/confirmar.component';
import { PerfilComponent } from './pages/persona/perfil/perfil.component';
import { RegistroComponent } from './pages/persona/registro/registro.component';
import { RegistroexitosoComponent } from './pages/persona/registroexitoso/registroexitoso.component';
import { ValidarComponent } from './pages/persona/validar/validar.component';
import { ReservadoComponent } from './pages/paciente/cita/reservado/reservado.component';

//import { ReporteasistenciaComponent } from './pages/modulos/administracion/asistencia/reporte/reporteasistencia/reporteasistencia.component';
//import { ListproductoalmacenComponent } from './pages/modulos/mantenimiento/productoalmacen/listproductoalmacen/listproductoalmacen.component';
//import { ListaralmacenprincipalComponent } from './pages/modulos/almacen/principal/listaralmacenprincipal/listaralmacenprincipal.component';
//import { ListaringresosalmacenprincipalComponent } from './pages/modulos/almacen/principal/listaringresosalmacenprincipal/listaringresosalmacenprincipal.component';
//import { ListarsalidasalmacenprincipalComponent } from './pages/modulos/almacen/principal/listarsalidasalmacenprincipal/listarsalidasalmacenprincipal.component';
import { ListtecnicoComponent } from './pages/modulos/administracion/mantenimiento/tecnico/listtecnico/listtecnico.component';
import { ListproductoComponent } from './pages/modulos/administracion/mantenimiento/producto/listproducto/listproducto.component';
import { ListcategoriaComponent } from './pages/modulos/administracion/mantenimiento/categoria/listcategoria/listcategoria.component';
import { RegistrousuarioComponent } from './pages/persona/registrousuario/registrousuario.component';
import { TecnicoComponent } from './pages/modulos/cliente/tecnico/tecnico.component';
import { HorarioComponent } from './pages/modulos/cliente/horario/horario.component';
import { ListusuarioComponent } from './pages/modulos/administracion/mantenimiento/usuario/listusuario/listusuario.component';
import { ListmoduloComponent } from './pages/modulos/administracion/mantenimiento/modulo/listmodulo/listmodulo.component';
import { CatalogoproductosComponent } from './pages/modulos/vendedor/catalogoproductos/catalogoproductos.component';
import { CarritoComponent } from './pages/modulos/vendedor/carrito/carrito/carrito.component';
import { ImprimirventaComponent } from './pages/modulos/vendedor/imprimirventa/imprimirventa.component';
import { ListrepuestoComponent } from './pages/modulos/administracion/mantenimiento/repuesto/listrepuesto/listrepuesto.component';
import { ListservicioComponent } from './pages/modulos/administracion/mantenimiento/servicio/listservicio/listservicio.component';
import { ServicioComponent } from './pages/modulos/cliente/servicio/servicio.component';
import { PagoComponent } from './pages/modulos/cliente/pago/pago.component';
import { ListpermisoComponent } from './pages/modulos/administracion/mantenimiento/permiso/listpermiso/listpermiso.component';
import { ImprimirservicioComponent } from './pages/modulos/cliente/imprimirservicio/imprimirservicio.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent
  },

  {path:'validarPersona',component:ValidarComponent},
  {path:'registro',component:RegistroComponent},
  {path:'registrousuario',component:RegistrousuarioComponent},
  {path:'registrado',component:RegistroexitosoComponent},

      {path:'main',component:MainComponent,children:[

        {path:'perfil/:id',component:PerfilComponent,canActivate : [SecurityGuard]},

        {path:'administracion/mantenimiento/listarUsuario',component:ListusuarioComponent,canActivate : [SecurityGuard]},
        {path:'administracion/mantenimiento/listarTecnico',component:ListtecnicoComponent,canActivate : [SecurityGuard]},
        {path:'administracion/mantenimiento/listarCategoria',component:ListcategoriaComponent,canActivate : [SecurityGuard]},
        {path:'administracion/mantenimiento/listarProducto',component:ListproductoComponent,canActivate : [SecurityGuard]},
        {path:'administracion/mantenimiento/listarRepuesto',component:ListrepuestoComponent,canActivate : [SecurityGuard]},
        {path:'administracion/mantenimiento/listarServicio',component:ListservicioComponent,canActivate : [SecurityGuard]},
        {path:'administracion/mantenimiento/listarModulo',component:ListmoduloComponent,canActivate : [SecurityGuard]},
        {path:'administracion/mantenimiento/listarPermiso',component:ListpermisoComponent,canActivate : [SecurityGuard]},

        {path:'cliente/soporte/servicio',component:ServicioComponent,canActivate : [SecurityGuard]},
        {path:'cliente/soporte/horario',component:HorarioComponent,canActivate : [SecurityGuard]},
        {path:'cliente/soporte/select-tecnico',component:TecnicoComponent,canActivate : [SecurityGuard]},
        {path:'cliente/soporte/pago',component:PagoComponent,canActivate : [SecurityGuard]},
        {path:'cliente/soporte/imprimirservicio',component:ImprimirservicioComponent,canActivate : [SecurityGuard]},

        {path:'vendedor/catalogoproductos',component:CatalogoproductosComponent,canActivate : [SecurityGuard]},
        {path:'vendedor/carrito',component:CarritoComponent,canActivate : [SecurityGuard]},
        {path:'vendedor/carrito/imprimirventa',component:ImprimirventaComponent,canActivate : [SecurityGuard]},
      ]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


