import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { EspecialidadService } from 'src/app/service/especialidad/especialidad.service';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { TecnicoService } from 'src/app/service/tecnico/tecnico.service';

@Component({
  selector: 'app-edittecnico',
  templateUrl: './edittecnico.component.html',
  styleUrls: ['./edittecnico.component.css']
})
export class EdittecnicoComponent {


  public formTecnico: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  id_categoria: number = 0;
  personas: any = [];
  especialidades: any = [];

  categorialSelected: number;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EdittecnicoComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public especialidadService:EspecialidadService,
              public personaService:PersonaService,
              public tecnicoService: TecnicoService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }
  
    ngOnInit() {

      this.formularioTecnico();
      this.listarPersona();
      this.listarEspecialidad();
      this.categorialSelected = this.data.id_categoria;
    }

    listarPersona(){
      this.personaService.listarPersona()
      .subscribe(
        res=> {this.personas=res;
        },
        err=> console.error(err)
      )
    }

    listarEspecialidad(){
      this.especialidadService.listarEspecialidad()
      .subscribe(
        res=> {this.especialidades=res;
        },
        err=> console.error(err)
      )
    }

    getIdCategoria (event: any) {
      this.id_categoria = event.target.value;
    }

    formularioTecnico(){
      this.formTecnico = this.formBuilder.group({
        id              :  [this.data.id, Validators.required],
        id_especialidad :  [this.data.id_especialidad,Validators.required],
        id_persona      :  [this.data.id_persona, Validators.required],
        especialidad    :  [this.data.especialidad, Validators.required],
        estado          :  [this.data.estado, Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  actualizarTecnico() {
    console.log(this.formTecnico.value)
    if(this.formTecnico.valid){
      this.tecnicoService.actualizarTecnico(this.formTecnico.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formTecnico.reset();
          this.dialogRef.close(1);
        }else{
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
        }

      });
    }
  }

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 5000,
    verticalPosition: 'bottom',
    horizontalPosition:'right',
  });
}


}
