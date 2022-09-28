import { LOCALE_ID,NgModule } from '@angular/core';
import localeES from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { DatePipe } from "@angular/common";

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import {SecurityGuard} from './guard/security.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular material */
import { AngularMaterialModule } from './angularMaterial.module';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';

import { DialogComponent } from './tools/dialog/dialog.component';
import { PerfilComponent } from './pages/persona/perfil/perfil.component';
import { ValidarComponent } from './pages/persona/validar/validar.component';
import { RegistroComponent } from './pages/persona/registro/registro.component';
import { RegistroexitosoComponent } from './pages/persona/registroexitoso/registroexitoso.component';
import { EspecialidadComponent } from './pages/paciente/cita/especialidad/especialidad.component';
import { ExamenComponent } from './pages/paciente/cita/examen/examen.component';
import { FechaComponent } from './pages/paciente/cita/fecha/fecha.component';
import { MedicoComponent } from './pages/paciente/cita/medico/medico.component';
import { ConfirmarComponent } from './pages/paciente/cita/confirmar/confirmar.component';
import { ReservadoComponent } from './pages/paciente/cita/reservado/reservado.component';
/*
import { AddpermisoAsistenciaComponent } from './pages/modulos/administracion/asistencia/dialog/addpermiso-asistencia/addpermiso-asistencia.component';
import { ReporteasistenciaComponent } from './pages/modulos/administracion/asistencia/reporte/reporteasistencia/reporteasistencia.component';
import { EditpermisoAsistenciaComponent } from './pages/modulos/administracion/asistencia/dialog/editpermiso-asistencia/editpermiso-asistencia.component';
*/
/*
import { ListproductoalmacenComponent } from './pages/modulos/mantenimiento/productoalmacen/listproductoalmacen/listproductoalmacen.component';
import { EditproductoalmacenComponent } from './pages/modulos/mantenimiento/productoalmacen/dialog/editproductoalmacen/editproductoalmacen.component';
import { AddproductoalmacenComponent } from './pages/modulos/mantenimiento/productoalmacen/dialog/addproductoalmacen/addproductoalmacen.component';
import { DelproductoalmacenComponent } from './pages/modulos/mantenimiento/productoalmacen/dialog/delproductoalmacen/delproductoalmacen.component';
import { ListaralmacenprincipalComponent } from './pages/modulos/almacen/principal/listaralmacenprincipal/listaralmacenprincipal.component';
import { IngresoalmacenprincipalComponent } from './pages/modulos/almacen/principal/dialog/ingresoalmacenprincipal/ingresoalmacenprincipal.component';
import { SalidaalmacenprincipalComponent } from './pages/modulos/almacen/principal/dialog/salidaalmacenprincipal/salidaalmacenprincipal.component';
import { AddproductoalmacenprincipalComponent } from './pages/modulos/almacen/principal/dialog/addproductoalmacenprincipal/addproductoalmacenprincipal.component';
import { ListaringresosalmacenprincipalComponent } from './pages/modulos/almacen/principal/listaringresosalmacenprincipal/listaringresosalmacenprincipal.component';
import { ListarsalidasalmacenprincipalComponent } from './pages/modulos/almacen/principal/listarsalidasalmacenprincipal/listarsalidasalmacenprincipal.component';
*/
import { ListtecnicoComponent } from './pages/modulos/administracion/mantenimiento/tecnico/listtecnico/listtecnico.component';
import { AddtecnicoComponent } from './pages/modulos/administracion/mantenimiento/tecnico/dialog/addtecnico/addtecnico/addtecnico.component';
import { EdittecnicoComponent } from './pages/modulos/administracion/mantenimiento/tecnico/dialog/edittecnico/edittecnico/edittecnico.component';
import { ListproductoComponent } from './pages/modulos/administracion/mantenimiento/producto/listproducto/listproducto.component';
import { AddproductoComponent } from './pages/modulos/administracion/mantenimiento/producto/dialog/addproducto/addproducto.component';
import { EditproductoComponent } from './pages/modulos/administracion/mantenimiento/producto/dialog/editproducto/editproducto.component';
import { ListcategoriaComponent } from './pages/modulos/administracion/mantenimiento/categoria/listcategoria/listcategoria.component';
import { AddcategoriaComponent } from './pages/modulos/administracion/mantenimiento/categoria/dialog/addcategoria/addcategoria.component';
import { EditcategoriaComponent } from './pages/modulos/administracion/mantenimiento/categoria/dialog/editcategoria/editcategoria.component';
import { RegistrousuarioComponent } from './pages/persona/registrousuario/registrousuario.component';
import { RegistradoComponent } from './pages/persona/registrado/registrado.component';
import { HorarioComponent } from './pages/modulos/cliente/horario/horario.component';
import { TecnicoComponent } from './pages/modulos/cliente/tecnico/tecnico.component';
import { AtencionesComponent } from './pages/modulos/cliente/atenciones/atenciones.component';
import { ListusuarioComponent } from './pages/modulos/administracion/mantenimiento/usuario/listusuario/listusuario.component';
import { AddusuarioComponent } from './pages/modulos/administracion/mantenimiento/usuario/dialog/addusuario/addusuario.component';
import { EditusuarioComponent } from './pages/modulos/administracion/mantenimiento/usuario/dialog/editusuario/editusuario.component';
import { ListmoduloComponent } from './pages/modulos/administracion/mantenimiento/modulo/listmodulo/listmodulo.component';
import { AddmoduloComponent } from './pages/modulos/administracion/mantenimiento/modulo/dialog/addmodulo/addmodulo.component';
import { EditmoduloComponent } from './pages/modulos/administracion/mantenimiento/modulo/dialog/editmodulo/editmodulo.component';
import { PagoclienteComponent } from './pages/modulos/cliente/pagocliente/pagocliente.component';
import { CatalogoproductosComponent } from './pages/modulos/vendedor/catalogoproductos/catalogoproductos.component';
import { BuscadorPipe } from './pages/modulos/vendedor/buscador/buscador.pipe';
import { CarritoComponent } from './pages/modulos/vendedor/carrito/carrito/carrito.component';
import { ImprimirventaComponent } from './pages/modulos/vendedor/imprimirventa/imprimirventa.component';
import { DialogFormapagoComponent } from './pages/modulos/vendedor/dialog-formapago/dialog-formapago.component';
import { ListservicioComponent } from './pages/modulos/administracion/mantenimiento/servicio/listservicio/listservicio.component';
import { AddservicioComponent } from './pages/modulos/administracion/mantenimiento/servicio/dialog/addservicio/addservicio.component';
import { EditservicioComponent } from './pages/modulos/administracion/mantenimiento/servicio/dialog/editservicio/editservicio.component';
import { EditrepuestoComponent } from './pages/modulos/administracion/mantenimiento/repuesto/dialog/editrepuesto/editrepuesto.component';
import { AddrepuestoComponent } from './pages/modulos/administracion/mantenimiento/repuesto/dialog/addrepuesto/addrepuesto.component';
import { ListrepuestoComponent } from './pages/modulos/administracion/mantenimiento/repuesto/listrepuesto/listrepuesto.component';






registerLocaleData(localeES,'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,

    DialogComponent,
    PerfilComponent,
    ValidarComponent,
    RegistroComponent,
    RegistroexitosoComponent,
    EspecialidadComponent,
    ExamenComponent,
    FechaComponent,
    MedicoComponent,
    ConfirmarComponent,
    ReservadoComponent,

    /*
    ReporteasistenciaComponent,
    AddpermisoAsistenciaComponent,
    EditpermisoAsistenciaComponent,
 
    ListproductoalmacenComponent,
    EditproductoalmacenComponent,
    AddproductoalmacenComponent,
    DelproductoalmacenComponent,
    ListaralmacenprincipalComponent,
    IngresoalmacenprincipalComponent,
    SalidaalmacenprincipalComponent,
    AddproductoalmacenprincipalComponent,
    ListaringresosalmacenprincipalComponent,
    ListarsalidasalmacenprincipalComponent,
   */
    ListtecnicoComponent,
     AddtecnicoComponent,

     EdittecnicoComponent,
      ListproductoComponent,
      AddproductoComponent,
      EditproductoComponent,
      ListcategoriaComponent,
      AddcategoriaComponent,
      EditcategoriaComponent,
      RegistrousuarioComponent,
      RegistradoComponent,
      HorarioComponent,
      TecnicoComponent,
      AtencionesComponent,
      ListusuarioComponent,
      AddusuarioComponent,
      EditusuarioComponent,
      ListmoduloComponent,
      AddmoduloComponent,
      EditmoduloComponent,
      PagoclienteComponent,
      CatalogoproductosComponent,
      BuscadorPipe,
      CarritoComponent,
      ImprimirventaComponent,
      DialogFormapagoComponent,
      ListservicioComponent,
      AddservicioComponent,
      EditservicioComponent,
      EditrepuestoComponent,
      AddrepuestoComponent,
      ListrepuestoComponent,







  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    /*material */
    AngularMaterialModule,
  ],
  providers: [    
    SecurityGuard,
    {
      provide:LOCALE_ID,useValue:'es'}
      ,

    {
      provide:DatePipe
    },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
