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
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { RolService } from 'src/app/service/rol/rol.service';

@Component({
  selector: 'app-editusuario',
  templateUrl: './editusuario.component.html',
  styleUrls: ['./editusuario.component.css']
})
export class EditusuarioComponent {

  public formUsuario: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  id_rol: number = 0;
  id_persona: number = 0;

  roles: any = [];
  personas: any = [];
  usuarios: any = [];

  personaSelected: number;
  rolSelected: number;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditusuarioComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public rolService:RolService,
              public personaService:PersonaService,
              public usuarioService: UsuarioService,
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
      this.listarUsuario();
      this.personaSelected = this.data.id_persona;
      this.rolSelected = this.data.id_rol;
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

    listarUsuario(){
      this.usuarioService.listarUsuario()
      .subscribe(
        res=> {this.usuarios=res;
        },
        err=> console.error(err)
      )
    }

    getIdRol (event: any) {
      this.id_rol = event.target.value;
    }

    getIdPersona (event: any) {
      this.id_persona = event.target.value;
    }

    formularioUsuario(){
      this.formUsuario = this.formBuilder.group({
        id              :  [this.data.id,           Validators.required],
        id_persona      :  [this.data.id_persona,   Validators.required],
        id_rol          :  [this.data.id_rol,       Validators.required],
        usuario         :  [this.data.usuario,      Validators.required],
        password        :  [this.data.password,     Validators.required],
        estado          :  [this.data.estado,       Validators.required],
      });
    }

  actualizarUsuario() {
    console.log(this.formUsuario.value)
    if(this.formUsuario.valid){
      this.usuarioService.actualizarUsuario(this.formUsuario.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formUsuario.reset();
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
