import { Component,HostBinding, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { _countGroupLabelsBeforeOption } from '@angular/material/core';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { SunatService } from 'src/app/service/sunat/sunat.service';
import { DataService } from 'src/app/service/data/data.service';
import { ApisPeruService } from 'src/app/service/apisPeru/apis-peru.service';

@Component({
  selector: 'app-validar',
  templateUrl: './validar.component.html',
  styleUrls: ['./validar.component.css']
})
export class ValidarComponent implements OnInit {


  @Input() dataEntrante:any;
  formValidate: FormGroup;

  documento: any = [];
  usuario: any = {};
  persona: any = {};

  documentoSelected = 1

  constructor(
              private apisPeruService:ApisPeruService,
              private sunatService:SunatService,
              private dataService:DataService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private personaService:PersonaService,  
              private router: Router,
              private activateRoute:ActivatedRoute
              ) { }

  ngOnInit() {
    this.formMiUsuario();
    this.listarDocumento();
    
  }

  listarDocumento(){
    this.personaService.listarDocumento()
    .subscribe(
      res=> {this.documento=res;
      },
      err=> console.error(err)
    )
  }


  formMiUsuario(){
    this.formValidate = this.formBuilder.group({
      id_documento      :   [null, Validators.required],
      nro_documento     :   [null, Validators.required]
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition:'right',
    });
  }

  listarPersonaSunat() {
    if(this.formValidate.valid){
      console.log(this.formValidate.get('nro_documento').value)
      
      this.sunatService.listarPersona(this.formValidate.get('nro_documento').value)
      .subscribe( res => {
       console.log(res.response)
       this.openSnackBar('Bienvenido! complete el formulario de registro','')
       this.dataService.persona=res.response
       this.router.navigate(['register']);
      });
    }
  }

  listarPersonaApisPeru() {
    if(this.formValidate.valid){
      this.apisPeruService.listarPersona(this.formValidate.get('nro_documento').value)
      .subscribe( res => {
       console.log(res.response)
       //this.openSnackBar('Bienvenido! complete el formulario de registro','')
       //this.dataService.persona=res.response
       //this.router.navigate(['register']);
      });
    }
  }

  validatePersona() {
    console.log(this.formValidate.value)
    let resource = JSON.stringify(this.formValidate.value);
    if(this.formValidate.valid){
      
      this.personaService.listarPersonaByDNI(this.formValidate.value)
      .subscribe( res => {
        console.log(res)

        if(res.result==0){
          //this.listarPersonaSunat(); //ESTE FUNCIONAVA DESPUES YA NO
          //this.listarPersonaApisPeru();
          //persona no existe
          this.openSnackBar('Bienvenido nuevo usuario porfavor complete el formulario!','')
          this.dataService.id_documento=this.formValidate.get('id_documento').value
          this.dataService.nro_documento=this.formValidate.get('nro_documento').value
          this.router.navigate(['registro']);

        }

        if(res.result==1){
          //persona y usuario ya existen
          this.openSnackBar('Usted ya tiene una cuenta de Usuario, informe al administrador del sistema!','')
          //this.router.navigate(['register']);
        }

        if(res.result==2){
          //usuario no existe, persona si existe
          this.openSnackBar('Bienvenido complete su Registro Porfavor!','')
          this.dataService.id_persona=res.persona.id
          this.router.navigate(['registrousuario']);

        }
          


        
      
      });
    }
  
  }

/*
  validarUsuarioByIdPersona(idPersona:number){
    this.service.validatorUsuario(idPersona).subscribe(
      res => {
        this.usuario=res
        
        if(this.usuario.message==1) {
         
          this.openSnackBar('Ya existe un usuario con esa informacion!','')
          this.router.navigate(['informacionusuario']);
        }
        if (this.usuario.message==0) {
          this.openSnackBar('Informacion encontrada, complete el registro de usuario!','')
          this.router.navigate(['registerusuario/',this.usuario.persona.id]);
        }
      },
      err => console.log(err)
    )
  }
  */

}