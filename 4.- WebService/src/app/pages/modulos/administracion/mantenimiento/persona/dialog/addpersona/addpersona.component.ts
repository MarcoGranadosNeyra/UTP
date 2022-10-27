import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';

@Component({
  selector: 'app-addpersona',
  templateUrl: './addpersona.component.html',
  styleUrls: ['./addpersona.component.css']
})
export class AddpersonaComponent {

  public formPersona: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  departamento: any = [];
  provincia: any = [];
  distrito: any = [];
  documento: any = [];
  sexo: any = [];
  defaultDocumento: number = 1;
  /*
  defaultDepartamento: string = '15';
  defaultProvincia: string = '1501';
  defaultDistrito: string = '150101';
  */
  departamentoSelected = '15'
  provinciaSelected = '1501'
  distritoSelected = '150101'
  defaultSexo: number = 1;
  defaultFechaNaci: Date = new Date();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
 
  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddpersonaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public personaService:PersonaService,
              private router: Router,
              public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }
  
    ngOnInit() {

      this.formularioPersona();
      this.listarDepartamento();
      this.listarProvincia("15");
      this.listarDistrito('1501');
      this.listarDocumento();
      this.listarSexo();
    }

    listarSexo(){
      this.personaService.listarSexo()
      .subscribe(res=> {
        this.sexo=res;
        },
        err=> console.error(err)
      )
    }
  
    listarDocumento(){
      this.personaService.listarDocumento()
      .subscribe(
        res=> {this.documento=res;
        },
        err=> console.error(err)
      )
    }
  
    listarDepartamento(){
      this.personaService.listarDepartamento()
      .subscribe(
        res=> {this.departamento=res;
        },
        err=> console.error(err)
      )
    }

    listarProvincia(idDepartamento:string){
      this.personaService.listarProvincia(idDepartamento).subscribe(
        res => {
          this.provincia=res
        },
        err => console.log(err)
      )
    }
  
    listarDistrito(idProvincia:string){
      this.personaService.listarDistrito(idProvincia).subscribe(
        res => {
          this.distrito=res
        },
        err => console.log(err)
      )
    }
    
    formularioPersona(){
    this.formPersona = this.formBuilder.group({
      id_documento    :  [this.data.id_documento, Validators.required],
      nro_documento   :  [this.data.nro_documento, Validators.minLength(6)],
      nombre          :  [this.data.nombre, Validators.required],
      apaterno        :  [this.data.apaterno, Validators.required],
      amaterno        :  [this.data.amaterno, Validators.required],
      telefono        :  [this.data.telefono],
      direccion       :  [this.data.direccion],
      correo          :  [this.data.correo, Validators.email],
    });
  }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }  

  agregarPersona() {
    if(this.formPersona.valid){
      this.personaService.agregarPersonaResumida(this.formPersona.value)
      .subscribe( res => {
        this.response=res
        console.log(res)
        if (this.response.result===1) {
          this.openSnackBar('Mensaje : ',this.response.mensaje);
          this.formPersona.reset();
          this.dialogRef.close(1);
        }else{
          var uq_id_documento_nro_documento:string="uq_id_documento_nro_documento";
          var uq_correo:string ="uq_correo";
          
          if(this.response.mensaje.includes(uq_id_documento_nro_documento)){
            this.openSnackBar('Error : Tipo de Documento y Nro de Documento ya esta registrado','');
          }else{
              if(this.response.mensaje.includes(uq_correo)){
                this.openSnackBar('Error : Este Correo ya esta registrado','');
            }else{
              this.openSnackBar('Error : ',this.response.mensaje);
            }
            
          }
          
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
