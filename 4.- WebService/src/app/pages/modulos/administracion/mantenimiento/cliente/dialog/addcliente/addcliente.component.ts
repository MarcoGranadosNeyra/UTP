import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { PersonaService } from 'src/app/service/persona/persona.service';

@Component({
  selector: 'app-addcliente',
  templateUrl: './addcliente.component.html',
  styleUrls: ['./addcliente.component.css']
})
export class AddclienteComponent {

  public formCliente: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  personas: any = [];
  disabled: boolean = true;


  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddclienteComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public clienteService:ClienteService,
              public personaService:PersonaService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {
      this.formularioCliente();
      this.listarPersona();
    }

    listarPersona() {
      this.personaService.listarPersona()
      .subscribe(res => {
      this.personas=res;
      
      });
    }

    formularioCliente(){
      this.formCliente = this.formBuilder.group({
        id_persona   :  [this.data.modulo,Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  agregarCliente() {
    if(this.formCliente.valid){
      this.clienteService.agregarCliente(this.formCliente.value)
      .subscribe( res => {
        console.log(res)
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formCliente.reset();
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
