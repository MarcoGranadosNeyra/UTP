import { Component, OnInit,ViewChild,EventEmitter ,Output} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {MatAccordion} from '@angular/material/expansion';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { UsuarioService } from '../../service/usuario/usuario.service';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  grupos: any = [];
  modulos: any = [];
  persona :any={};
  rol :any={};

  

  @Output()
  emisor : EventEmitter<string> = new EventEmitter<string>();

  constructor(private dataService:DataService,private usuarioService:UsuarioService,private observer: BreakpointObserver,private router: Router) { }

  ngOnInit(): void {
    var id: number = Number(localStorage.getItem('id_usuario'));
    this.validarLogeo();
    this.listarModulosUsuario(id);
    this.modulos=this.dataService.permisos;
    this.persona=this.dataService.persona;
    this.rol=this.dataService.rol;
  }


    validarLogeo(){
      const logeado= this.usuarioService.logeado();
      if(!logeado){
        this.usuarioService.cerrarSession()
      }
    }


  ngAfterViewInit() {
    this.observer.observe(['(max-width: 1024px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  cerrarSession(){
    this.usuarioService.logout()
  }

  listarModulosUsuario(id_usuario:number){
    this.usuarioService.listarModulosUsuario(id_usuario).subscribe(
      res => {
        this.grupos=res.grupos
        this.modulos=res.modulos
        this.persona=res.persona
        this.rol=res.rol
      },
        err=>console.error(err)
    );
  }



  miperfil(idPersona:number){
    this.router.navigate(['perfil/',idPersona]);

  }


  



}
