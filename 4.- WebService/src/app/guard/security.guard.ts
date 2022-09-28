import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../service/usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,private router: Router) { }

  canActivate(): boolean {
    if (this.usuarioService.logeado()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}

