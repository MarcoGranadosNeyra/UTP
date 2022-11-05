import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModuloService } from 'src/app/service/modulo/modulo.service';
import { GrupoService } from 'src/app/service/grupo/grupo.service';
import { RolService } from 'src/app/service/rol/rol.service';
import { PermisoService } from 'src/app/service/permiso/permiso.service';

@Component({
  selector: 'app-aditpermiso',
  templateUrl: './aditpermiso.component.html',
  styleUrls: ['./aditpermiso.component.css']
})
export class AditpermisoComponent {

  grupos: any = [];
  roles: any = [];
  modulos: any = [];
  public formPermiso: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AditpermisoComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    public grupoService:GrupoService,
    public rolService:RolService,
    public moduloService:ModuloService,
    public permisoService:PermisoService,
    ) { }

  onNoClick(): void {
  this.dialogRef.close();
  }

  ngOnInit() {
    this.formularioPermiso();
    this.listarGrupo();
    this.listarRol();
    this.listarModulo();
  }

  listarGrupo() {
    this.grupoService.listarGrupo()
    .subscribe(res => {
    this.grupos=res;
    });
  }

  listarRol() {
    this.rolService.listarRol()
    .subscribe(res => {
    this.roles=res;
    });
  }

  listarModulo() {
    this.moduloService.listarModulo()
    .subscribe(res => {
    this.modulos=res;
    });
  }

  formularioPermiso(){
    this.formPermiso = this.formBuilder.group({
    id            :  [this.data.id,Validators.required],
    id_grupo       :  [this.data.id_grupo,Validators.required],
    id_rol         :  [this.data.id_rol, Validators.required],
    id_modulo      :  [this.data.id_modulo, Validators.required],
    orden          :  [this.data.orden, Validators.required],
    estado         :  [this.data.estado, Validators.required],
    });
  }

  async actualizarPermiso() {

    if(this.formPermiso.valid){
      this.permisoService.actualizarPermiso(this.formPermiso.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formPermiso.reset();
          this.dialogRef.close(1);
        }else{
          var uq_id_rol_id_modulo_permiso:string="uq_id_rol_id_modulo_permiso";

          if(this.response.mensaje.includes(uq_id_rol_id_modulo_permiso)){
            this.openSnackBar('Error : El Rol y Modulo ya esta registrado','');
          }else{
              this.openSnackBar('Error : ',this.response.mensaje);
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
