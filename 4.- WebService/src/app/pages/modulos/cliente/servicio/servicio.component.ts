import { Component, EventEmitter, Input, OnInit ,Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";

import { DataService } from 'src/app/service/data/data.service';
import { ProductoService } from 'src/app/service/producto/producto.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {


  servicios: any = [];

  constructor(
            private dataService:DataService,
            private formBuilder: FormBuilder,
            private productoService:ProductoService,
            private activateRoute:ActivatedRoute,
            private router : Router
            ) { }

  ngOnInit() {
    this.listarServicios()
  }

  listarServicios(){
    this.productoService.listarServicio().subscribe(
      res => {
        this.servicios=res;
      },
        err=>console.error(err)
    );
  }

  
  getServicio(id:number,precio:number){

    this.dataService.id_producto=id;
    this.dataService.precio=precio;
    this.router.navigate(['main/cliente/soporte/horario']);
  }

}

