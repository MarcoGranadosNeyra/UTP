import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { EspecialidadService } from 'src/app/service/especialidad/especialidad.service';

@Component({
  selector: 'app-fecha',
  templateUrl: './fecha.component.html',
  styleUrls: ['./fecha.component.css']
})
export class FechaComponent implements OnInit {

  especialidad: any = { };

 fechaActual0 = new Date();         /* domingo      */
 fechaActual1: Date = new Date();   /* lunes        */
 fechaActual2: Date = new Date();   /* martes       */
 fechaActual3: Date = new Date();   /* miercoles    */
 fechaActual4: Date = new Date();   /* jueves       */
 fechaActual5: Date = new Date();   /* viernes      */
 fechaActual6: Date = new Date();   /* sabado       */

 fechas: any = [
  {
    "fecha":this.fechaActual0
 },
  {
    "fecha":this.fechaActual1
 },
 {
   "fecha":this.fechaActual2
 },
 {
   "fecha":this.fechaActual3
 },
 {
    "fecha":this.fechaActual4
 },
 {
    "fecha":this.fechaActual5
 },
 {
    "fecha":this.fechaActual6
 }  
];

  fechaSelected:any=null;

  constructor(public dataService:DataService ,private especialidadService:EspecialidadService,private router : Router) { }

  ngOnInit() {
    this.listarDia();
    //this.listarEspecialidadById(this.dataService.id_especialidad);
  }

  listarDia(){
    this.fechaActual0.setDate(this.fechaActual0.getDate());
    this.fechaActual1.setDate(this.fechaActual1.getDate()+1);
    this.fechaActual2.setDate(this.fechaActual2.getDate()+2);
    this.fechaActual3.setDate(this.fechaActual3.getDate()+3);
    this.fechaActual4.setDate(this.fechaActual4.getDate()+4);
    this.fechaActual5.setDate(this.fechaActual5.getDate()+5);
    this.fechaActual6.setDate(this.fechaActual6.getDate()+6);
  }

  listarEspecialidadById(idEspecialidad:number){
    this.especialidadService.listarEspecialidadById(idEspecialidad).subscribe(
      res => {
        this.especialidad=res
        console.log(res)
      },
      err => console.log(err)
    )
  }

  getFecha(fecha:Date){

    this.fechaSelected=fecha

    let day = fecha.getDate()
    let month = fecha.getMonth()+1
    let year = fecha.getFullYear()

    this.fechaSelected=year+'-'+month+'-'+day;

    this.dataService.id_dia=fecha.getDay();
    this.dataService.fecha=this.fechaSelected;
 
    this.router.navigate(['cliente/servicio/select-tecnico']);
  }

}
