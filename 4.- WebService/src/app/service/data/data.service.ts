import { Injectable } from '@angular/core';
import { Producto } from 'src/app/modelo/Producto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  id_usuario      : number = 0;
  rol             : any = {}
  strpersona      : String = null;
  foto            : String = null;
  permisos        : any = [];
  readonly        : String = null;

  id_persona      : number = 0;
  id_documento    : number = 0;
  nro_documento   : String = null;
  id_especialidad : number = 0;
  id_examen       : number = 0;
  id_dia          : number = 0;
  fecha           : Date   = null;
  hora            : String = null;
  id_calendario   : number = 0;



  persona : any = {}

  id_cita       : number = 0;

  id_sucursal   : number = 0;

  permiso        : boolean = false;
  motivo         : String = null;
  

 productos        : any = [];
 cantidad         : number = 0;

 id_venta         : number = 0;

  constructor() { }
}
