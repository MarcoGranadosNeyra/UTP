import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { environment } from 'src/environments/environment';
import { UploadimgService } from 'src/app/service/uploadimg/uploadimg.service';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { RecepcionService } from 'src/app/service/recepcion/recepcion.service';

@Component({
  selector: 'app-addequipo',
  templateUrl: './addequipo.component.html',
  styleUrls: ['./addequipo.component.css']
})
export class AddequipoComponent {


  public formRecepcion: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  especialidades: any = [];
  personas: any = [];
  clientes: any = [];

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddequipoComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public categoriaService:CategoriaService,
              public recepcionService:RecepcionService,
              public clienteService:ClienteService,
              public uploadImgService:UploadimgService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {
      var id: number = Number(localStorage.getItem('id_usuario'));
      this.formularioRecepcion();
      this.listarCliente();
      this.formRecepcion.get("id_usuario").setValue(id);
    }

    listarCliente(){
      this.clienteService.listarCliente()
      .subscribe(
        res=> {this.clientes=res;
        },
        err=> console.error(err)
      )
    }

    formularioRecepcion(){
      this.formRecepcion = this.formBuilder.group({
        id_usuario       :  [this.data.id_usuario,Validators.required],
        id_cliente       :  [this.data.id_cliente, Validators.required],
        equipo           :  [this.data.equipo,Validators.required],
        marca            :  [this.data.marca,Validators.required],
        modelo           :  [this.data.modelo, Validators.required],
        serie            :  [this.data.serie,Validators.required],
        descripcion      :  [this.data.descripcion, Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  agregarRecepcion() {
    if(this.formRecepcion.valid){
      this.recepcionService.agregarRecepcion(this.formRecepcion.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formRecepcion.reset();
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
