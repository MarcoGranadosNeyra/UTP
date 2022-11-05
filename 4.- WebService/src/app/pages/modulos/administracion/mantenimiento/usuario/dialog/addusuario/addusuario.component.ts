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
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { RolService } from 'src/app/service/rol/rol.service';


@Component({
  selector: 'app-addusuario',
  templateUrl: './addusuario.component.html',
  styleUrls: ['./addusuario.component.css']
})
export class AddusuarioComponent {

  public formUsuario: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  roles: any = [];
  personas: any = [];

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddusuarioComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public especialidadService:EspecialidadService,
              public personaService:PersonaService,
              public rolService:RolService,
              public usuarioService:UsuarioService,
              private router: Router,
              public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {

      this.formularioUsuario();
      this.listarRol();
      this.listarPersona();
      this.formUsuario.get('id_tipo_usuario').setValue(2); //cliente = 1, taller = 2
    }

    listarRol(){
      this.rolService.listarRol()
      .subscribe(
        res=> {this.roles=res;
        },
        err=> console.error(err)
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

    formularioUsuario(){
      this.formUsuario = this.formBuilder.group({
        id_persona      :  [this.data.id_persona, Validators.required],
        id_rol          :  [this.data.id_rol,Validators.required],
        id_tipo_usuario :  [this.data.id_tipo_usuario,Validators.required],
        usuario         :  [this.data.usuario, Validators.required],
        password        :  [this.data.password, Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  agregarUsuario() {
    if(this.formUsuario.valid){
      this.usuarioService.agregarUsuario(this.formUsuario.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formUsuario.reset();
          this.dialogRef.close(1);
        }else{

          var uq_id_persona:string="uq_id_persona";
          var uq_id_persona_id_rol:string ="uq_id_persona_id_rol";
          
          if(this.response.mensaje.includes(uq_id_persona)){
            this.openSnackBar('Error : Esta Persona ya tiene una cuenta de Usuario','');
          }else{
              if(this.response.mensaje.includes(uq_id_persona_id_rol)){
                this.openSnackBar('Error : Este usuario ya tiene un rol definido','');
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
    duration: 7000,
    verticalPosition: 'bottom',
    horizontalPosition:'right',
  });
}


}
