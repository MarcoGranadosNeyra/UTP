import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModuloService } from 'src/app/service/modulo/modulo.service';
import { ClienteService } from 'src/app/service/cliente/cliente.service';
import { PersonaService } from 'src/app/service/persona/persona.service';

@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.css']
})
export class EditclienteComponent {


  public formCliente: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  personas: any = [];
  disabled: boolean = true;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditclienteComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public clienteService: ClienteService,
              public personaService: PersonaService,
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
        id              :  [this.data.id, Validators.required],
        id_persona      :  [this.data.id_persona,Validators.required],
        estado          :  [this.data.estado, Validators.required],
      });
    }

  async actualizarCliente() {

    if(this.formCliente.valid){
      this.clienteService.actualizarCliente(this.formCliente.value)
      .subscribe( res => {
        this.response=res;
        console.log(res)
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formCliente.reset();
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
