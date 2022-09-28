import { Component,HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
//import { Cita } from 'src/app/Modelo/Cita';
import { CitaService } from 'src/app/service/cita/cita.service';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-reservado',
  templateUrl: './reservado.component.html',
  styleUrls: ['./reservado.component.css']
})
export class ReservadoComponent implements OnInit {


  cita :any={}

  constructor(public dataService: DataService ,private serviceCita:CitaService,private formBuilder:FormBuilder,private activateRoute:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.listarCitaById(this.dataService.id_cita);
  }

  listarCitaById(idCita:number){
    this.serviceCita.listarCitaById(idCita).subscribe(
      res => {
        this.cita=res
        console.log(res)
      },
      err => console.log(err)
    )
  }

  inicio(){
    this.router.navigate(['main']);
  }
  

}
