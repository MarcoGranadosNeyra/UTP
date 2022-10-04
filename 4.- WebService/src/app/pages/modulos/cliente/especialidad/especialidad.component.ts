import { Component, EventEmitter, Input, OnInit ,Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { EspecialidadService } from 'src/app/service/especialidad/especialidad.service';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  especialidades: any = [];

  constructor(
            private dataService:DataService,
            private formBuilder: FormBuilder,
            private especialidadService:EspecialidadService,
            private activateRoute:ActivatedRoute,
            private router : Router
            ) { }

  ngOnInit() {
    this.listarEspecialidades()
  }

  listarEspecialidades(){
    this.especialidadService.listarEspecialidad().subscribe(
      res => {
        this.especialidades=res;
      },
        err=>console.error(err)
    );
  }

  
  getEspecialidad(idEspecialidad:number){
    console.log(idEspecialidad)
    this.dataService.id_especialidad=idEspecialidad;
    this.router.navigate(['main/select-examen']);
  }

}

