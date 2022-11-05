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
import { DialogFormapagoComponent } from './pages/modulos/vendedor/formapago/dialog/dialog-formapago/dialog-formapago.component';
import { ListservicioComponent } from './pages/modulos/administracion/mantenimiento/servicio/listservicio/listservicio.component';
import { AddservicioComponent } from './pages/modulos/administracion/mantenimiento/servicio/dialog/addservicio/addservicio.component';
import { EditservicioComponent } from './pages/modulos/administracion/mantenimiento/servicio/dialog/editservicio/editservicio.component';
import { EditrepuestoComponent } from './pages/modulos/administracion/mantenimiento/repuesto/dialog/editrepuesto/editrepuesto.component';
import { AddrepuestoComponent } from './pages/modulos/administracion/mantenimiento/repuesto/dialog/addrepuesto/addrepuesto.component';
import { ListrepuestoComponent } from './pages/modulos/administracion/mantenimiento/repuesto/listrepuesto/listrepuesto.component';
import { ServicioComponent } from './pages/modulos/cliente/servicio/servicio.component';
import { PagoComponent } from './pages/modulos/cliente/pago/pago.component';
import { ListpermisoComponent } from './pages/modulos/administracion/mantenimiento/permiso/listpermiso/listpermiso.component';
import { AddpermisoComponent } from './pages/modulos/administracion/mantenimiento/permiso/dialog/addpermiso/addpermiso.component';
import { AditpermisoComponent } from './pages/modulos/administracion/mantenimiento/permiso/dialog/aditpermiso/aditpermiso.component';
import { ImprimirservicioComponent } from './pages/modulos/cliente/imprimirservicio/imprimirservicio.component';
import { ClienteSelectComponent } from './pages/modulos/vendedor/cliente-select/cliente-select.component';
import { AddclienteComponent } from './pages/modulos/administracion/mantenimiento/cliente/dialog/addcliente/addcliente.component';
import { EditclienteComponent } from './pages/modulos/administracion/mantenimiento/cliente/dialog/editcliente/editcliente.component';
import { ListclienteComponent } from './pages/modulos/administracion/mantenimiento/cliente/listcliente/listcliente.component';
import { ListpersonaComponent } from './pages/modulos/administracion/mantenimiento/persona/listpersona/listpersona.component';
import { AddpersonaComponent } from './pages/modulos/administracion/mantenimiento/persona/dialog/addpersona/addpersona.component';
import { EdipersonaComponent } from './pages/modulos/administracion/mantenimiento/persona/dialog/edipersona/edipersona.component';

import { ListcalendarioComponent } from './pages/modulos/administracion/mantenimiento/calendario/listcalendario/listcalendario.component';
import { AddcalendarioComponent } from './pages/modulos/administracion/mantenimiento/calendario/dialog/addcalendario/addcalendario.component';
import { EditcalendarioComponent } from './pages/modulos/administracion/mantenimiento/calendario/dialog/editcalendario/editcalendario.component';
import { AtencionespendientesComponent } from './pages/modulos/tecnico/atenciones/atencionespendientes/atencionespendientes.component';
import { AtencionesfinalizadasComponent } from './pages/modulos/tecnico/atenciones/atencionesfinalizadas/atencionesfinalizadas.component';
import { FormapagolistComponent } from './pages/modulos/vendedor/formapago/formapagolist/formapagolist.component';
import { ListrecepcionComponent } from './pages/modulos/tecnico/recepcion/listrecepcion/listrecepcion.component';
import { CatalogorepuestosComponent } from './pages/modulos/tecnico/repuestos/catalogorepuestos/catalogorepuestos.component';
import { BucadorrepuestosPipe } from './pages/modulos/tecnico/repuestos/buscador/bucadorrepuestos.pipe';
import { CarritorepuestosComponent } from './pages/modulos/tecnico/repuestos/carritorepuestos/carritorepuestos.component';
import { ImprimircotizacionComponent } from './pages/modulos/tecnico/cotizacion/imprimircotizacion/imprimircotizacion.component';
import { CotizacionespendietesComponent } from './pages/modulos/tecnico/cotizacion/cotizacionespendietes/cotizacionespendietes.component';
import { CotizacionesaprobadasComponent } from './pages/modulos/tecnico/cotizacion/cotizacionesaprobadas/cotizacionesaprobadas.component';
import { ListrecibidosComponent } from './pages/modulos/tecnico/recepcion/equipos/listrecibidos/listrecibidos.component';
import { ListentregadosComponent } from './pages/modulos/tecnico/recepcion/equipos/listentregados/listentregados.component';
import { AddequipoComponent } from './pages/modulos/tecnico/recepcion/equipos/dialog/addequipo/addequipo.component';
import { EditequipoComponent } from './pages/modulos/tecnico/recepcion/equipos/dialog/editequipo/editequipo.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ListreporteventasComponent } from './pages/modulos/administracion/reportes/ventas/listreporteventas/listreporteventas.component';
import { ListreporteproductosvendidosComponent } from './pages/modulos/administracion/reportes/ventas/listreporteproductosvendidos/listreporteproductosvendidos.component';
import { ListreporteserviciosvendidosComponent } from './pages/modulos/administracion/reportes/ventas/listreporteserviciosvendidos/listreporteserviciosvendidos.component';
import { ListreporterepuestosvendidosComponent } from './pages/modulos/administracion/reportes/ventas/listreporterepuestosvendidos/listreporterepuestosvendidos.component';
import { ListreporteatencionestecnicoComponent } from './pages/modulos/administracion/reportes/tecnico/listreporteatencionestecnico/listreporteatencionestecnico.component';
import { ListventasComponent } from './pages/modulos/vendedor/ventas/listventas/listventas.component';
import { ListventasserviciosComponent } from './pages/modulos/vendedor/ventas/listventasservicios/listventasservicios.component';
import { CotizacionesfinalizadasComponent } from './pages/modulos/tecnico/cotizacion/cotizacionesfinalizadas/cotizacionesfinalizadas/cotizacionesfinalizadas.component';


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
      ServicioComponent,
      PagoComponent,
      ListpermisoComponent,
      AddpermisoComponent,
      AditpermisoComponent,
      ImprimirservicioComponent,
      ClienteSelectComponent,
      AddclienteComponent,
      EditclienteComponent,
      ListclienteComponent,
      ListpersonaComponent,
      AddpersonaComponent,
      EdipersonaComponent,

      ListcalendarioComponent,
      AddcalendarioComponent,
      EditcalendarioComponent,
      AtencionespendientesComponent,
      AtencionesfinalizadasComponent,
      FormapagolistComponent,
      ListrecepcionComponent,
      CatalogorepuestosComponent,
      BucadorrepuestosPipe,
      CarritorepuestosComponent,
      ImprimircotizacionComponent,
      CotizacionespendietesComponent,
      CotizacionesaprobadasComponent,
      ListrecibidosComponent,
      ListentregadosComponent,
      AddequipoComponent,
      EditequipoComponent,
      ListreporteventasComponent,
      ListreporteproductosvendidosComponent,
      ListreporteserviciosvendidosComponent,
      ListreporterepuestosvendidosComponent,
      ListreporteatencionestecnicoComponent,
      ListventasComponent,
      ListventasserviciosComponent,
      CotizacionesfinalizadasComponent,


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
    NgxChartsModule
      

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
