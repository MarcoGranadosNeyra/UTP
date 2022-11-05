import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { environment } from 'src/environments/environment';
import { ModuloService } from 'src/app/service/modulo/modulo.service';

@Component({
  selector: 'app-addmodulo',
  templateUrl: './addmodulo.component.html',
  styleUrls: ['./addmodulo.component.css']
})
export class AddmoduloComponent {


  private url = environment.cloudinary_url;
  public imgUpload: File;

  public formModulo: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  disabled: boolean = true;


  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddmoduloComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public moduloService:ModuloService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {
      this.formularioModulo();
    }

    formularioModulo(){
      this.formModulo = this.formBuilder.group({
        modulo       :  [this.data.modulo,Validators.required],
        url          :  [this.data.url, Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  agregarModulo() {
    if(this.formModulo.valid){
      this.moduloService.agregarModulo(this.formModulo.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formModulo.reset();
          this.dialogRef.close(1);
        }else{
          var uq_id_persona_cliente:string="uq_id_persona_cliente";

          if(this.response.mensaje.includes(uq_id_persona_cliente)){
            this.openSnackBar('Error : Esta Persona ya esta registrada como cliente','');
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
