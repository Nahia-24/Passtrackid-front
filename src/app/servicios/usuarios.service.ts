import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdmindDto } from '../modelos/admin-dto';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  respuesta = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  // hosteo = 'http://localhost:3306/'
  hosteo = 'https://runcentro-970219e13e88.herokuapp.com/'

  Usuario: any
  private _isLoggedciudadela$ = new BehaviorSubject<boolean>(false);
  private _isLoggedcarrera$ = new BehaviorSubject<boolean>(false);
  private _isLoggedadministrador$ = new BehaviorSubject<boolean>(false);


  isLoggedciudadela$ = this._isLoggedciudadela$.asObservable();
  isLoggedcarrera$ = this._isLoggedcarrera$.asObservable();
  isLoggedadministrador$ = this._isLoggedadministrador$.asObservable();





  constructor(private httpClient: HttpClient)


  {
    const token = localStorage.getItem('ciudadelalogin');
    const token1 = localStorage.getItem('carreralogin');
    const token2 = localStorage.getItem('administradorlogin');


    this._isLoggedciudadela$.next(!!token);
    this._isLoggedcarrera$.next(!!token1);
    this._isLoggedadministrador$.next(!!token2);


  }

  loginciudadelafin(usuario: any) {

    this._isLoggedciudadela$.next(true);
    localStorage.setItem('ciudadelalogin', 'true');
    localStorage.setItem('ciudadela', usuario);
  }

  public loginciudadela(data: AdmindDto): Observable<boolean> {
    console.log(data)
    console.log(data)
    console.log(data)

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/loginciudadela',
      data,
      this.respuesta
    );
  }


  logincarrerafin(usuario: any) {

    this._isLoggedcarrera$.next(true);
    localStorage.setItem('carreralogin', 'true');
    localStorage.setItem('carrera', usuario);
  }

  public logincarrera(data: AdmindDto): Observable<boolean> {
    console.log(data)
    console.log(data)
    console.log(data)

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/logincarrera',
      data,
      this.respuesta
    );
  }

  loginadministradorfin(usuario: any) {

    this._isLoggedciudadela$.next(true);
    localStorage.setItem('administradorlogin', 'true');
    localStorage.setItem('administrador', usuario);
  }

  public loginadministrador(data: AdmindDto): Observable<boolean> {
    console.log(data)
    console.log(data)
    console.log(data)

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/loginadministrador',
      data,
      this.respuesta
    );
  }


}
