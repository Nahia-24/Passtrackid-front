import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../../servicios/usuarios.service'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CiudadelaGuard implements CanActivate {

  constructor(private router: Router, private usuarioservie: UsuariosService,) {

  }
  canActivate(
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.usuarioservie.isLoggedciudadela$.pipe(
      tap((isLoggedciudadela) => {
        if (!isLoggedciudadela) {
          this.router.navigate(['ciudadela/login']);
        }
      })
    );



    
  }


}