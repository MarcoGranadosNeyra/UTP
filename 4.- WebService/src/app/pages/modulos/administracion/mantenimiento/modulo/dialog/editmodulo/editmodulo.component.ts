import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModuloService } from 'src/app/service/modulo/modulo.service';

@Component({
  selector: 'app-editmodulo',
  templateUrl: './editmodulo.component.html',
  styleUrls: ['./editmodulo.component.css']
})
export class EditmoduloComponent {


  public formModulo: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditmoduloComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public moduloService: ModuloService,
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }
  
    ngOnInit() {
      this.formularioModulo();
    }

    formularioModulo(){
      this.formModulo = this.formBuilder.group({
        id              :  [this.data.id, Validators.required],
        modulo          :  [this.data.modulo,Validators.required],
        url             :  [this.data.url, Validators.required],
        estado          :  [this.data.estado, Validators.required],
      });
    }

  async actualizarModulo() {

    if(this.formModulo.valid){
      this.moduloService.actualizarModulo(this.formModulo.value)
      .subscribe( res => {
        this.response=res;
        console.log(res)
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formModulo.reset();
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
