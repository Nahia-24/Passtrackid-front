import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../servicios/usuarios.service'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdministradorGuard implements CanActivate {

  constructor(private router: Router, private usuarioservie: UsuariosService,) {

  }
  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.usuarioservie.isLoggedadministrador$.pipe(
      tap((isLoggedadministrador) => {
        if (!isLoggedadministrador) {
          this.router.navigate(['administrador/login']);
        }
      })
    );



    
  }


}