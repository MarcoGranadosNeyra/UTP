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
import { FormaPagoService } from 'src/app/service/formaPago/forma-pago.service';

@Component({
  selector: 'app-dialog-formapago',
  templateUrl: './dialog-formapago.component.html',
  styleUrls: ['./dialog-formapago.component.css']
})
export class DialogFormapagoComponent {

  public formPago: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  formaPago: any = [];

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DialogFormapagoComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public formaPagoService:FormaPagoService,
  
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {
      this.formularioPago();
    }

    formularioPago(){
      this.formPago = this.formBuilder.group({
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
    /*
    if(this.formCategoria.valid){
      this.categoriaService.agregarCategoria(this.formCategoria.value)
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
    */
  }

openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 5000,
    verticalPosition: 'bottom',
    horizontalPosition:'right',
  });
}

async changeImage(event) {
  /*
  this.imgUpload = event.target.files[0];
  const fr = new FileReader();

  if (this.imgUpload) {
    const imagen = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formCategoria.get('imagen').setValue(imagen);
  }
  */
}

async subirFoto(file: File) {
  /*
  this.imgUpload = file;
  if (this.imgUpload) {
    const imagen = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formCategoria.get('imagen').setValue(imagen);
  }
  */
}

}