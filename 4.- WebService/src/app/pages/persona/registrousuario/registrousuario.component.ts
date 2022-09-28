import { Component,HostBinding, OnInit } from '@angular/core'
import { Persona } from 'src/app/modelo/Persona';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { validarQueSeanIguales} from 'src/app/tools/validarPassword';
import { DataService } from 'src/app/service/data/data.service';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.component.html',
  styleUrls: ['./registrousuario.component.css']
})
export class RegistrousuarioComponent implements OnInit {

  formPersona: FormGroup;  
  formUsuario: FormGroup;  

  persona: Persona = { 
    id              : 0, 
    id_documento    : null, 
    id_departamento : null, 
    id_provincia    : null, 
    id_distrito     : null ,
    nro_documento   : null,
    nombre          : null,
    apaterno        : null,
    amaterno        : null,
    telefono        : null,
    direccion       : null,
    fecha_naci      : null,
    id_sexo         : 0,
    correo          : null,
    firma           : null,
    huella          : null,
    foto            : null,
  };

  getId_documento: string = '';
  getId_departamento: string = '';
  getId_provincia: string = '';

  departamento: any = [];
  provincia: any = [];
  distrito: any = [];
  documento: any = [];
  sexo: any = [];



  constructor(private dataService:DataService,
              private personaService:PersonaService,
              private usuarioService:UsuarioService,
              private snackBar: MatSnackBar,
              private formBuilder: FormBuilder,
              private router: Router,
              private activateRoute:ActivatedRoute
              ) { }

  ngOnInit() {
    this.listarPersonaById(this.dataService.id_persona)
    this.formularioUsuario();
  }

  listarPersonaById(idPersona:number){
    this.personaService.listarPersonaById(idPersona).subscribe(
      res => {
        this.persona=res;
        this.formUsuario.get('id_persona').setValue(res.id)
        this.formUsuario.get('id_rol').setValue(3)//rol 3 cliente
        this.formUsuario.get('id_tipo_usuario').setValue(1)//tipo de usuario cliente
      },
      err => console.log(err)
    )
  }


  checarSiSonIguales(): boolean {
    return this.formUsuario.hasError('noSonIguales') &&
      this.formUsuario.get('password').dirty &&
      this.formUsuario.get('confirmarPassword').dirty;
  }

  formularioUsuario(){
    this.formUsuario = this.formBuilder.group({
      id_persona      :  [null, Validators.required],
      id_rol          :  [null, Validators.required],
      id_tipo_usuario :  [null, Validators.required],
      usuario         :  [null, Validators.minLength(6)],
      password        :  [null, Validators.minLength(4)],
      confirmarPassword :[null, Validators.required],
      acceptTerms     :  [false, Validators.requiredTrue]
    }, {
      validators: validarQueSeanIguales
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition:'right',
    });
  }

  agregarUsuario() {

    if(this.formUsuario.valid){

      this.usuarioService.buscarNombreUsuario(this.formUsuario.value)
      .subscribe( res => {
  
        if (res.result==1) {
          this.openSnackBar('Mensaje : ',res.mensaje) 
        }else{

          this.usuarioService.agregarUsuario(this.formUsuario.value)
          .subscribe( res => {
    
              if (res.result==1) {
                this.openSnackBar('Mensaje : ',res.mensaje) 
                this.router.navigate(['registrado']);
              }
              if (res.result==0) {
                this.openSnackBar('Mensaje : ',res.mensaje) 
                console.log(res)
              }
          });
          
        }

      });


    }

    
  }

  validarNombreUsuario(){
    this.usuarioService.buscarNombreUsuario(this.formUsuario.value)
    .subscribe( res => {

        console.log(res)
        return res.result
    });
  }


  



}
