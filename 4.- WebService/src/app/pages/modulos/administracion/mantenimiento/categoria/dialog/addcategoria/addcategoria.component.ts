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

@Component({
  selector: 'app-addcategoria',
  templateUrl: './addcategoria.component.html',
  styleUrls: ['./addcategoria.component.css']
})
export class AddcategoriaComponent {

  private url = environment.cloudinary_url;
  public imgUpload: File;

  public formCategoria: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  especialidades: any = [];
  personas: any = [];

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddcategoriaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public categoriaService:CategoriaService,
              public uploadImgService:UploadimgService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {
      this.formularioCategoria();
    }

    formularioCategoria(){
      this.formCategoria = this.formBuilder.group({
        categoria       :  [this.data.categoria,Validators.required],
        imagen          :  [this.data.imagen, Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  agregarCategoria() {
    if(this.formCategoria.valid){
      this.categoriaService.agregarCategoria(this.formCategoria.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formCategoria.reset();
          this.dialogRef.close(1);
        }else{
          var uq_categoria:string="uq_categoria";

          if(this.response.mensaje.includes(uq_categoria)){
            this.openSnackBar('Error : El nombre de la categoria ya existe','');
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

async changeImage(event) {
  this.imgUpload = event.target.files[0];
  const fr = new FileReader();

  if (this.imgUpload) {
    const imagen = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formCategoria.get('imagen').setValue(imagen);
  }
}

async subirFoto(file: File) {
  this.imgUpload = file;
  if (this.imgUpload) {
    const imagen = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formCategoria.get('imagen').setValue(imagen);
  }
}


}
