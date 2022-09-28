import { Component, OnInit } from '@angular/core';
import { UsuarioService  } from 'src/app/service/usuario/usuario.service'
import { Router } from '@angular/router'
import {FormBuilder, FormGroup,FormControl, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  durationInSeconds = 5;

  user = {};
  message:string='';


  formLogin: FormGroup;  

  constructor(private dataService:DataService,private snackBar: MatSnackBar,private formBuilder: FormBuilder,private usuarioService: UsuarioService, private router: Router ) { }

  ngOnInit() {
    this.formMiLogin();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  validarUsuario() {
    
    let resource = JSON.stringify(this.formLogin.value);

    this.usuarioService.login(this.formLogin.value)
      .subscribe(
        res => {

          const result =res.result;
          
          if(result==0){
            this.openSnackBar('Mensaje de Sistema : ',res.mensaje)   
          }else{
            localStorage.setItem('token', res.token);
            localStorage.setItem('logeado', result);
            localStorage.setItem('id_usuario', res.id_usuario);
            //const id_usuario =res.id_usuario;
            this.dataService.id_usuario=res.id_usuario;
            this.dataService.permisos=res.permisos;
            this.dataService.rol=res.rol;
            this.dataService.persona=res.persona;
            this.router.navigate(['/main']);
          }
         
         },
        err => 
        console.log("error : "+err)
      )
  }

  formMiLogin(){
    this.formLogin = this.formBuilder.group({
      usuario        :  [null, Validators.required],
      password       :  [null, Validators.required]
    });
  }

  registrarme() {
      this.router.navigate(['/validarPersona']);
      localStorage.setItem('token',"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2Mjg5NzgyODQsImlzcyI6ImxvY2FsaG9zdCIsInVzZXJfaWQiOjQzMDF9.Tk3DGm2b7ChKjqxI8fnqP5_oHti1gGMDjnBui5Fo4N4");
      
  }





}