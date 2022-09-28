import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarioService } from 'src/app/service/calendario/calendario.service';
import { CitaService } from 'src/app/service/cita/cita.service';
import { DataService } from 'src/app/service/data/data.service';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {


  parametros : any = {
    id_especialidad:this.dataService.id_especialidad,
    id_dia:this.dataService.id_dia
  };

  medicos : any = []

  paciente : any={}

  cita = {
    id_paciente:0,
    id_calendario:0,
    fecha:null,
    hora: null
  };

  constructor(private snackBar: MatSnackBar,public dataService:DataService,private calendarioService:CalendarioService,private citaService:CitaService,private pacienteService:PacienteService,  private router: Router) { }

  ngOnInit(): void {
    this.listarPacienteByIdUsuario();
    this.listarCalendarioByIdEspecialidad(this.parametros);
  }

  listarPacienteByIdUsuario() {
    this.pacienteService.listarPacienteByIdUsuario()
    .subscribe( res => {
      //console.log(res)
      this.paciente=res.paciente
    });
  }

  listarCalendarioByIdEspecialidad(parametros : any) {
    this.calendarioService.listarCalendarioByIdEspecialidad(this.parametros)
    .subscribe( res => {
      console.log("CALENDARIO"+res)
      this.medicos=res
    });
  }

  getIdCalendario (idCalendario:number,hora:string) {
    /*
    this.cita.id_paciente=this.paciente.id
    this.cita.id_calendario=idCalendario
    this.cita.fecha=this.dataService.fechaSelected
    this.cita.hora=hora
    */
    this.dataService.id_calendario=idCalendario
    this.dataService.hora=hora;
    this.router.navigate(['main/confirmar-reserva/']);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition:'right',
    });
  }



/*
  agregarCita() {

        this.citaService.agregarCita(this.cita)
        .subscribe( res => {
          console.log(res)
          if (res.result==1) {
            this.openSnackBar('Mensaje : Registrado Correctamente ','');
            this.router.navigate(['main/agregarPago/',res.id_cita]);
          }else{
            this.openSnackBar(res.message,'');
          }
      });
    
  }
  */



  

}




