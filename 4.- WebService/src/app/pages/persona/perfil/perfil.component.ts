import { Component,HostBinding, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { ActivatedRoute, Router } from '@angular/router';

import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { UploadimgService } from 'src/app/service/uploadimg/uploadimg.service';
import { environment } from 'src/environments/environment';
import {MatSnackBar} from '@angular/material/snack-bar';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {


  private url = environment.cloudinary_url;
  public imgUpload: File;

  @HostBinding('class') classes ='row';

  formPersona: FormGroup;  


  rol :    any = {};
  persona: any = {};

  getId_Sexo: string = '';
  getId_documento: string = '';
  getId_departamento: string = '';
  getId_provincia: string = '';
  

  departamento: any = [];
  provincia: any = [];
  distrito: any = [];
  documento: any = [];

  sexo: any = [];

  response: any = { };

  constructor(private snackBar: MatSnackBar,private formBuilder: FormBuilder,private personaService:PersonaService,private usuarioService:UsuarioService,private uploadImgService:UploadimgService,  private router: Router,private activateRoute:ActivatedRoute) { }

  ngOnInit() {
    
    const params = this.activateRoute.snapshot.params;
    this.listarPersonaById(params['id']);
    this.formMiPersona();
    this.listarDepartamento();
    this.listarDocumento();
    this.listarSexo();
    
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  listarSexo(){
    this.personaService.listarSexo()
    .subscribe(res=> {
      this.sexo=res;
      console.log(this.sexo)
      },
      err=> console.error(err)
    )
  }

  listarDocumento(){
    this.personaService.listarDocumento()
    .subscribe(
      res=> {this.documento=res;
      },
      err=> console.error(err)
    )
  }

  listarDepartamento(){
    this.personaService.listarDepartamento()
    .subscribe(
      res=> {this.departamento=res;
      },
      err=> console.error(err)
    )
  }

  getIdSexo(event: any) {
    this.getId_Sexo = event.target.value;
  }

  getIdDocumento(event: any) {
    this.getId_documento = event.target.value;
  }

  getIdDepartamento (event: any) {
    this.getId_departamento = event.target.value;
    this.listarProvincia(this.getId_departamento);
  }

  getIdProvincia (event: any) {
    this.getId_provincia = event.target.value;
    this.listarDistrito(this.getId_provincia);
  }

  listarProvincia(idDepartamento:string){
    this.personaService.listarProvincia(idDepartamento).subscribe(
      res => {
        this.provincia=res
      },
      err => console.log(err)
    )
  }



  listarDistrito(idProvincia:string){
    this.personaService.listarDistrito(idProvincia).subscribe(
      res => {
        this.distrito=res
      },
      err => console.log(err)
    )
  }


  formMiPersona(){
    this.formPersona = this.formBuilder.group({
      id              :  [null, Validators.required],
      id_documento    :  [null, Validators.required],
      id_departamento :  [null, Validators.required],
      id_provincia    :  [null, Validators.required],
      id_distrito     :  [null, Validators.required],
      nro_documento   :  [null, Validators.minLength(6)],
      nombre          :  [null, Validators.required],
      apaterno        :  [null, Validators.required],
      amaterno        :  [null, Validators.required],
      telefono        :  [null],
      direccion       :  [null],
      fecha_naci      :  [null, Validators.required],   
      id_sexo         :  [null, Validators.required],
      correo          :  [null, Validators.email],
      firma           :  [null],
      huella          :  [null],
      foto            :  [null]
    });
  }
  

  listarPersonaById(idPersona:number){
    this.personaService.listarPersonaById(idPersona).subscribe(
      res => {
        this.persona=res
        
        this.persona.id;
        this.formPersona.setValue(this.persona);
        this.listarProvincia(this.persona.id_departamento)
        this.listarDistrito(this.persona.id_provincia)

      },
      err => console.log(err)
    )
  }



actualizarPersona() {
  if(this.formPersona.valid){
    this.personaService.actualizarPersona(this.formPersona.value)
    .subscribe( res => {
      
      this.response=res

      if (this.response.result===1) {

        this.openSnackBar('Mensaje : ',this.response.mensaje);
        this.router.navigate(['main']);
      }else{
        this.openSnackBar('Error : ',this.response.mensaje);
        this.router.navigate(['main']);
      }
    });
  }
}

/*
async changeImage(file: File) {
  this.imgUpload = file;

  if (this.imgUpload) {
    const foto = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formPersona.get('foto').setValue(foto);
  }
}
*/
async changeImage(event) {
  this.imgUpload = event.target.files[0];
  const fr = new FileReader();

  if (this.imgUpload) {
    const foto = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formPersona.get('foto').setValue(foto);
  }

}


async subirFirma(file: File) {
  this.imgUpload = file;

  if (this.imgUpload) {
    const firma = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formPersona.get('firma').setValue(firma);
  }
}

async subirHuella(file: File) {
  this.imgUpload = file;

  if (this.imgUpload) {
    const huella = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formPersona.get('huella').setValue(huella);
  }
}


async subirFoto(file: File) {

  this.imgUpload = file;

  if (this.imgUpload) {

    const foto = await this.uploadImgService.uploadFile(this.imgUpload);
    this.formPersona.get('foto').setValue(foto);
  }
}

cancelar(){
  this.router.navigate(['main']);
}


}

