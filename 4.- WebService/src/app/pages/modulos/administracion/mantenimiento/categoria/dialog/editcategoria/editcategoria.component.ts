import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { environment } from 'src/environments/environment';
import { CategoriaService } from 'src/app/service/categoria/categoria.service';
import { UploadimgService } from 'src/app/service/uploadimg/uploadimg.service';

@Component({
  selector: 'app-editcategoria',
  templateUrl: './editcategoria.component.html',
  styleUrls: ['./editcategoria.component.css']
})
export class EditcategoriaComponent {

  private url = environment.cloudinary_url;
  public imgUpload: File;

  public formCategoria: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditcategoriaComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public categoriaService: CategoriaService,
              private uploadImgService:UploadimgService,  
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
        id              :  [this.data.id, Validators.required],
        categoria       :  [this.data.categoria,Validators.required],
        imagen          :  [this.data.imagen, Validators.required],
        estado          :  [this.data.estado, Validators.required],
      });
    }

  actualizarCategoria() {
    console.log(this.formCategoria.value)
    if(this.formCategoria.valid){
      this.categoriaService.actualizarCategoria(this.formCategoria.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formCategoria.reset();
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
