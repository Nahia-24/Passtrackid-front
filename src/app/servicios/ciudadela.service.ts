import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioDto } from '../modelos/usuario-dto';
import { CodigoDto } from '../modelos/codigo-dto';
import { RegaloDto } from '../modelos/regalo-dto';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CiudadelaService {

  respuesta = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  //hosteo = 'http://localhost:3306/'
  hosteo = 'https://runcentro-970219e13e88.herokuapp.com/'


  constructor(private httpClient: HttpClient) { }



  public getAllUser(): Observable < any > {
    return this.httpClient.get<UsuarioDto[]>(
      this.hosteo + 'Solicitud/getAllUser',
      this.respuesta,

    );
  }




  public createUserCiudadela(data: UsuarioDto): Observable<boolean> {

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/createUserCiudadela ',
      data,
      this.respuesta
    );
  }

  public ValidarMenor(data: UsuarioDto): Observable<boolean> {
    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/ValidarMenor',
      data,
      this.respuesta
    );
  }


  public entregarregalo(data: UsuarioDto): Observable<boolean> {

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/entregaregalo',
      data,
      this.respuesta

    );
  }

  public buscarultimoregistroregalo(data: RegaloDto): Observable<any> {
    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/buscarultimoregistroregalo',
      data,
      this.respuesta,
    );
  }


  public createregalo(data: RegaloDto): Observable<boolean> {

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/createregalo',
      data,
      this.respuesta
    );
  }

  public GetRegalopersona(data: UsuarioDto): Observable<any> {
    return this.httpClient.post<UsuarioDto[]>(
      this.hosteo + 'Solicitud/GetRegalopersona',
      data,
      this.respuesta,

    );
  }

  public GetRegalopersonamenor(data: UsuarioDto): Observable<any> {
    return this.httpClient.post<UsuarioDto[]>(
      this.hosteo + 'Solicitud/GetRegalopersonamenor',
      data,
      this.respuesta,

    );
  }








}
