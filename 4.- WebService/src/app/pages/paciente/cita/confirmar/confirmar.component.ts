import { Component,HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import { CalendarioService } from 'src/app/service/calendario/calendario.service';
import { CitaService } from 'src/app/service/cita/cita.service';
import { DataService } from 'src/app/service/data/data.service';
import { PacienteService } from 'src/app/service/paciente/paciente.service';
import { EspecialidadService } from 'src/app/service/especialidad/especialidad.service';
import { ExamenService } from 'src/app/service/examen/examen.service';
import { PersonaService } from 'src/app/service/persona/persona.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from 'src/app/tools/dialog/dialog.component';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {


  persona : any = {};
  paciente : any = {};
  especialidad : any = {};
  examen : any = {};
  formularioCita: FormGroup;  

  @HostBinding('class') classes ='row';

  constructor(public dataService: DataService, public dialog:MatDialog,private especialidadService:EspecialidadService,private examenService:ExamenService,private personaService:PersonaService,private pacienteService: PacienteService ,private snackBar: MatSnackBar,private formBuilder:FormBuilder,private serviceCita:CitaService,private activateRoute:ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.miformularioCita();
    this.listarPacienteByIdUsuario();
    this.listarEspecialidadById(this.dataService.id_especialidad);
    this.listarExamenById(this.dataService.id_examen);
    
  }

  listarPacienteByIdUsuario() {
    this.pacienteService.listarPacienteByIdUsuario()
    .subscribe( res => {
      this.paciente=res.paciente;
      this.formularioCita.get('id_paciente').setValue(this.paciente.id);
      this.formularioCita.get('id_calendario').setValue(this.dataService.id_calendario);
      this.formularioCita.get('id_especialidad').setValue(this.dataService.id_especialidad);
      this.formularioCita.get('id_examen').setValue(this.dataService.id_examen);
      this.formularioCita.get('fecha').setValue(this.dataService.fecha);
      this.formularioCita.get('hora').setValue(this.dataService.hora);

      this.listarPersonaById(this.paciente.id_persona);
    }
  );
}

listarPersonaById(idPersona:number) {
  this.personaService.listarPersonaById(idPersona)
  .subscribe( res => {
    this.persona=res;
    console.log("PERSONA",res)
  }
);
}

listarEspecialidadById(idEspecialidad:number){
  this.especialidadService.listarEspecialidadById(idEspecialidad).subscribe(
    res => {
      
      this.especialidad=res

    },
    err => console.log(err)
  )
}

listarExamenById(idExamen:number){
  this.examenService.listarExamenById(idExamen).subscribe(
    res => {
      
      this.examen=res
      
    },
    err => console.log(err)
  )
}



  miformularioCita(){
    this.formularioCita = this.formBuilder.group({

      id_paciente       :  [null, Validators.required],
      id_calendario     :  [null, Validators.required],
      id_especialidad   :  [null, Validators.required],
      id_examen         :  [null, Validators.required],
      fecha             :  [null, Validators.required],
      hora              :  [null, Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition:'right',
    });
  }

  confirmarDialogo():void{
    const dialogRef=this.dialog.open(DialogComponent,{
          width:'450px',
          data:'¿Confirma que desea Reservar la Cita?'
    });

    dialogRef.afterClosed().subscribe(res=>{

      if (res) {
        this.agregarCita();
        
      }
    });
  }

  agregarCita() {
    if(this.formularioCita.valid){
      this.serviceCita.agregarCita(this.formularioCita.value)
      .subscribe( res => {
       
        if (res.result==1) {
          this.dataService.id_cita=res.id_cita;
          this.openSnackBar('Mensaje de Sistema :','Registro agregado!')  
          this.router.navigate(['main/mensaje-reservado']);
        }else{
          this.openSnackBar('Error : ',res.message)  
        }
      });
    }
  }



  cancelar(){
    this.router.navigate(['main/citas']);
  }






}
