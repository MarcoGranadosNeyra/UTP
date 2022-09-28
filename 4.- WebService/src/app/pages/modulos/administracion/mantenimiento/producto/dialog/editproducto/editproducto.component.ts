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

@Component({
  selector: 'app-editproducto',
  templateUrl: './editproducto.component.html',
  styleUrls: ['./editproducto.component.css']
})
export class EditproductoComponent {



  public formProducto: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  id_categoria: number = 0;
  personas: any = [];
  categorias: any = [];

  categorialSelected: number;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditproductoComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public categoriaService:CategoriaService,
              public personaService:PersonaService,
              public productoService: ProductoService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }
  
    ngOnInit() {

      this.formularioProducto();
      this.listarPersona();
      this.listarProducto();
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

    listarProducto(){
      this.categoriaService.listarCategoria()
      .subscribe(
        res=> {this.categorias=res;
        },
        err=> console.error(err)
      )
    }

    getIdCategoria (event: any) {
      this.id_categoria = event.target.value;
    }

    formularioProducto(){
      this.formProducto = this.formBuilder.group({
        id              :  [this.data.id,           Validators.required],
        id_categoria    :  [this.data.id_categoria, Validators.required],
        producto        :  [this.data.producto,     Validators.required],
        precio          :  [this.data.precio,       Validators.required],
        cantidad        :  [this.data.cantidad,     Validators.required],
        imagen          :  [this.data.imagen,       Validators.required],
        estado          :  [this.data.estado,     Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  async actualizarProducto() {
    console.log(this.formProducto.value)
    if(this.formProducto.valid){
      this.productoService.actualizarProducto(this.formProducto.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formProducto.reset();
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
