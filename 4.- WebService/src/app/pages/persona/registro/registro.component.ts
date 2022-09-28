import { Component,HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import { environment } from 'src/environments/environment';
import { UploadimgService } from 'src/app/service/uploadimg/uploadimg.service';
import { validarQueSeanIguales} from 'src/app/tools/validarPassword';
import { DataService } from 'src/app/service/data/data.service';
import { UsuarioService } from 'src/app/service/usuario/usuario.service';
import { PersonaService } from 'src/app/service/persona/persona.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  @HostBinding('class') classes ='row';

  private url = environment.cloudinary_url;
  public imgUpload: File;

  formPersona: FormGroup;
  form: FormGroup;

  getId_documento: string = '';
  getId_departamento: string = '';
  getId_provincia: string = '';

  departamento: any = [];
  provincia: any = [];
  distrito: any = [];
  documento: any = [];
  sexo: any = [];

  departamentoSelected = '15'
  provinciaSelected = '1501'
  distritoSelected = '150101'
  documentoSelected = 1
  sexoSelected = 1

  constructor(
            public dataService:DataService,
            private formBuilder: FormBuilder,
            private fb: FormBuilder,
            private snackBar: MatSnackBar,
            private personaService:PersonaService,
            private usuarioService:UsuarioService,  
            private router: Router,
            private uploadimgService:UploadimgService,
            ) { }

  ngOnInit() {
    this.formularioPersona();
    this.listarDepartamento();
    this.listarProvincia('15');
    this.listarDistrito('1501');

    this.listarDocumento();
    this.listarSexo();
    this.getPersona();
    console.log(this.dataService.persona.nro_documento)
  }

  getPersona(){
    this.formPersona.get('nro_documento').setValue(this.dataService.persona.dni);
    this.formPersona.get('nombre').setValue(this.dataService.persona.nombres);
    this.formPersona.get('apaterno').setValue(this.dataService.persona.paterno);
    this.formPersona.get('amaterno').setValue(this.dataService.persona.materno);

    if(this.dataService.persona.sexo==='F'){
      this.sexoSelected=2
    }
  }

  initFormPassword() {
    this.form = this.fb.group({
      'password':  ['', Validators.required],
      'confirmarPassword': ['', Validators.required]
    }, {
      validators: validarQueSeanIguales
    });
  }

  checarSiSonIguales(): boolean {
    return this.formPersona.hasError('noSonIguales') &&
      this.formPersona.get('password').dirty &&
      this.formPersona.get('confirmarPassword').dirty;
  }


  formularioPersona(){
    this.formPersona = this.formBuilder.group({
      id_documento    :  [null, Validators.required],
      id_departamento :  [null, Validators.required],
      id_provincia    :  [null, Validators.required],
      id_distrito     :  [null, Validators.required],
      nro_documento   :  [null, Validators.minLength(8)],
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

  listarSexo(){
    this.personaService.listarSexo()
    .subscribe(
      res=> {this.sexo=res;
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

  async subirFirma(file: File) {
    this.imgUpload = file;

    if (this.imgUpload) {
      const firma = await this.uploadimgService.uploadFile(this.imgUpload);
      this.formPersona.get('firma').setValue(firma);
    }
  }

  async subirHuella(file: File) {
    this.imgUpload = file;

    if (this.imgUpload) {
      const huella = await this.uploadimgService.uploadFile(this.imgUpload);
      this.formPersona.get('huella').setValue(huella);
    }
  }

  async subirFoto(event) {
    this.imgUpload = event.target.files[0];
    const fr = new FileReader();
  
    if (this.imgUpload) {
      const foto = await this.uploadimgService.uploadFile(this.imgUpload);
      this.formPersona.get('foto').setValue(foto);
    }
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition:'right',
    });
  }


  agregarPersona() {
        
    if(this.formPersona.valid){
      this.personaService.agregarPersona(this.formPersona.value)
      .subscribe( res =>{
              console.log(res)

            if (res.result==1) {
              
              this.openSnackBar('Mensaje',res.mensaje);
              //this.router.navigate(['registrado']);
              this.dataService.id_persona=res.id_persona;
              this.router.navigate(['registrousuario']);

            }else{
              this.openSnackBar('Mensaje',res.mensaje);
            }
      });
    } 
  }

  cancelar(){
    this.router.navigate(['main/personas']);
  }

}