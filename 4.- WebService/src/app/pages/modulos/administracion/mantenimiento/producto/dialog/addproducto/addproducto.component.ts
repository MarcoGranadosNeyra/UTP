import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {ProductoalmacenService} from 'src/app/service/productoAlmacen/productoalmacen.service';
import {CategoriaalmacenService} from 'src/app/service/categoriaAlmacen/categoriaalmacen.service';
import {UnidadalmacenService} from 'src/app/service/unidadAlmacen/unidadalmacen.service';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';

import { PersonaService } from 'src/app/service/persona/persona.service';

import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { UploadimgService } from 'src/app/service/uploadimg/uploadimg.service';

@Component({
  selector: 'app-addproducto',
  templateUrl: './addproducto.component.html',
  styleUrls: ['./addproducto.component.css']
})
export class AddproductoComponent {


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
              public dialogRef: MatDialogRef<AddproductoComponent>, 
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

      this.formularioProducto();
      this.listarCategoria();
      this.listarProducto();

    }

    listarCategoria(){
      this.categoriaService.listarCategoria()
      .subscribe(
        res=> {this.categorias=res;
        },
        err=> console.error(err)
      )
    }

    listarProducto(){
      this.productoService.listarProducto()
      .subscribe(
        res=> {this.productos=res;
        },
        err=> console.error(err)
      )
    }

    formularioProducto(){
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

  agregarProducto() {
    if(this.formProducto.valid){
      this.productoService.agregarProducto(this.formProducto.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formProducto.reset();
          this.dialogRef.close(1);
          this.listarProducto();
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
