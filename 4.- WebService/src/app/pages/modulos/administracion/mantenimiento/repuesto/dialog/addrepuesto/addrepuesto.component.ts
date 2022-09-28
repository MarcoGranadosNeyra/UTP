import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { UploadimgService } from 'src/app/service/uploadimg/uploadimg.service';

@Component({
  selector: 'app-addrepuesto',
  templateUrl: './addrepuesto.component.html',
  styleUrls: ['./addrepuesto.component.css']
})
export class AddrepuestoComponent {


  public imgUpload: File;
  public formProducto: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  categorias: any = [];
  productos: any = [];

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddrepuestoComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public categoriaService:CategoriaService,
              public personaService:PersonaService,
              public productoService:ProductoService,
              private uploadImgService:UploadimgService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {

      this.formularioRepuesto();
      this.listarCategoria();
      this.listarRepuesto();

    }

    listarCategoria(){
      this.categoriaService.listarCategoria()
      .subscribe(
        res=> {this.categorias=res;
        },
        err=> console.error(err)
      )
    }

    listarRepuesto(){
      this.productoService.listarRepuesto()
      .subscribe(
        res=> {this.productos=res;
        },
        err=> console.error(err)
      )
    }

    formularioRepuesto(){
      this.formProducto = this.formBuilder.group({
        id_categoria  :  [this.data.id_categoria, Validators.required],
        producto      :  [this.data.producto,     Validators.required],
        precio        :  [this.data.precio,       Validators.required],
        cantidad      :  [this.data.cantidad,     Validators.required],
        imagen        :  [this.data.imagen,       Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  agregarRepuesto() {
    if(this.formProducto.valid){
      this.productoService.agregarRepuesto(this.formProducto.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formProducto.reset();
          this.dialogRef.close(1);
          this.listarRepuesto();
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

async changeImage(event) {
  this.imgUpload = event.target.files[0];
  const fr = new FileReader();

  if (this.imgUpload) {
    const foto = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formProducto.get('imagen').setValue(foto);
  }
}

async subirFoto(file: File) {
  this.imgUpload = file;
  if (this.imgUpload) {
    const imagen = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formProducto.get('imagen').setValue(imagen);
  }
}


}
