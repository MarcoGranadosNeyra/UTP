import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { ExamenService } from 'src/app/service/examen/examen.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.css']
})
export class ExamenComponent implements OnInit {


  examenes: any = [];

  constructor(public dataService:DataService,private examenService:ExamenService,private activateRoute:ActivatedRoute,private router : Router) { }

  ngOnInit() {
    this.listarExamenByIdEspecialidad(this.dataService.id_especialidad)
  }

  listarExamenByIdEspecialidad(idEspecialidad:number) {
      this.examenService.listarExamenByIdEspecialidad(idEspecialidad)
      .subscribe( res => {
        this.examenes=res;
        console.log(res)
      }
    );
  }

  getExamen(idExamen:number){
    console.log(idExamen)
    this.dataService.id_examen=idExamen;
    this.router.navigate(['main/select-fecha']);
  }


}

  

