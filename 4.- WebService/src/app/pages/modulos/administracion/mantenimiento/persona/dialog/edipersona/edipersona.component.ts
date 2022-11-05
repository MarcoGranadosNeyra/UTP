import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { PersonaService } from 'src/app/service/persona/persona.service';

@Component({
  selector: 'app-edipersona',
  templateUrl: './edipersona.component.html',
  styleUrls: ['./edipersona.component.css']
})
export class EdipersonaComponent {


  public formPersona: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  id_categoria: number = 0;
  personas: any = [];
  departamento: any = [];
  provincia: any = [];
  distrito: any = [];
  documento: any = [];
  sexo: any = [];
  categorialSelected: number;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EdipersonaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public personaService:PersonaService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }
  
    ngOnInit() {

      this.formularioPersona();
      this.listarDepartamento();
      this.listarDocumento();
      this.listarSexo();
    }

    listarSexo(){
      this.personaService.listarSexo()
      .subscribe(res=> {
        this.sexo=res;
        console.log(this.sexo)
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

    listarPersona(){
      this.personaService.listarPersona()
      .subscribe(
        res=> {this.personas=res;
        },
        err=> console.error(err)
      )
    }

    getIdCategoria (event: any) {
      this.id_categoria = event.target.value;
    }

    formularioPersona(){
    this.formPersona = this.formBuilder.group({
      id              :  [this.data.id, Validators.required],
      id_documento    :  [this.data.id_documento, Validators.required],
      id_departamento :  [this.data.id_departamento, Validators.required],
      id_provincia    :  [this.data.id_provincia, Validators.required],
      id_distrito     :  [this.data.id_distrito, Validators.required],
      nro_documento   :  [this.data.nro_documento, Validators.minLength(6)],
      nombre          :  [this.data.nombre, Validators.required],
      apaterno        :  [this.data.apaterno, Validators.required],
      amaterno        :  [this.data.amaterno, Validators.required],
      telefono        :  [this.data.telefono],
      direccion       :  [this.data.direccion],
      fecha_naci      :  [this.data.fecha_naci, Validators.required],   
      id_sexo         :  [this.data.id_sexo, Validators.required],
      correo          :  [this.data.correo, Validators.email],
      firma           :  [this.data.firma],
      huella          :  [this.data.huella],
      foto            :  [this.data.foto]
    });
  }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  actualizarPersona() {
    if(this.formPersona.valid){
      this.personaService.actualizarPersona(this.formPersona.value)
      .subscribe( res => {
        this.response=res
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
