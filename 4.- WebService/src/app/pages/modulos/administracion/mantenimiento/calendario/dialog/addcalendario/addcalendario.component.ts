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
import { CalendarioService } from 'src/app/service/calendario/calendario.service';
import { ProductoService } from 'src/app/service/producto/producto.service';
import { TecnicoService } from 'src/app/service/tecnico/tecnico.service';

@Component({
  selector: 'app-addcalendario',
  templateUrl: './addcalendario.component.html',
  styleUrls: ['./addcalendario.component.css']
})
export class AddcalendarioComponent {


  public formCalendario: FormGroup;
  formControl = new FormControl('', [Validators.required]);
  response: any = {};
  tecnicos: any = [];
  servicios: any = [];
  dias: any = [];
  horas: any = [];
  disabled: boolean = true;

  constructor(
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AddcalendarioComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public calendarioService:CalendarioService,
              public productoService:ProductoService,
              public tecnicoService:TecnicoService,
              private router: Router,public dataService:DataService
              ) { }

    onNoClick(): void {
      this.dialogRef.close();
     }

    ngOnInit() {
      this.formularioCalendario();
      this.listarServicio();
      this.listarTecnico();
      this.listarDia();
      this.listarHora();
    }

    listarServicio() {
      this.productoService.listarServicio()
      .subscribe(res => {
      this.servicios=res;
      });
    }

    listarTecnico() {
      this.tecnicoService.listarTecnico()
      .subscribe(res => {
      this.tecnicos=res;
      });
    }

    listarDia() {
      this.calendarioService.listarDia()
      .subscribe(res => {
      this.dias=res;
      });
    }

    listarHora() {
      this.calendarioService.listarHora()
      .subscribe(res => {
      this.horas=res;
      });
    }

    formularioCalendario(){
      this.formCalendario = this.formBuilder.group({
        id_producto     :  [this.data.id_producto,Validators.required],
        id_tecnico      :  [this.data.id_tecnico,Validators.required],
        id_dia          :  [this.data.id_dia,Validators.required],
        id_hora          :  [this.data.id_hora,Validators.required],
      });
    }

  getErrorMessage() {
  return this.formControl.hasError('id') ? 'id no valido' :
  this.formControl.hasError('cantidad') ? 'cantidad no valida' :
  '';
  }

  agregarCalendario() {
    if(this.formCalendario.valid){
      this.calendarioService.agregarCalendario(this.formCalendario.value)
      .subscribe( res => {
        this.response=res;
        if(this.response.result==1){
          this.openSnackBar('Mensaje : ',this.response.mensaje)  
          this.formCalendario.reset();
          this.dialogRef.close(1);
        }else{
          var uq_tecnico_id_dia_id_hora_calendario:string="uq_tecnico_id_dia_id_hora_calendario";

          if(this.response.mensaje.includes(uq_tecnico_id_dia_id_hora_calendario)){
            this.openSnackBar('Error : El Tecnico ya tiene un dia y hora asignado','');
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

