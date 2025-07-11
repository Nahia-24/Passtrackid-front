import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioDto } from '../modelos/usuario-dto';
import { CodigoDto } from '../modelos/codigo-dto';
import { RegaloDto } from '../modelos/regalo-dto';
import { Observable } from 'rxjs';
// Definición de la interfaz
interface TallaResponse {
  status: number;
  payload: { nombre: string; cantidadDisponible: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class CarreraService {

  respuesta = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  //hosteo = 'http://localhost:3306/'
  hosteo = 'https://calzado-088fcabee209.herokuapp.com/'


  constructor(private httpClient: HttpClient) { }


  public createUserCarrera(data: UsuarioDto): Observable<boolean> {

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/createUserCiudadelaCodigo',
      data,
      this.respuesta
    );
  }

  public createUserCarrera7k(data: UsuarioDto): Observable<boolean> {

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/createUserCiudadela',
      data,
      this.respuesta
    );
  }


  public ValidarCarrera(data: UsuarioDto): Observable<boolean> {
    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/ValidarCarrera',
      data,
      this.respuesta
    );
  }


  public GetCupoRegalo(data: UsuarioDto): Observable<any> {
    return this.httpClient.post<UsuarioDto[]>(
      this.hosteo + 'Solicitud/GetCupoRegalo',
      data,
      this.respuesta,

    );
  }

  public createcarrera(data: RegaloDto): Observable<boolean> {

    return this.httpClient.post<any>(
      this.hosteo + 'Solicitud/createcarrera',
      data,
      this.respuesta
    );
  }

  public getTallasDisponibles(): Observable<TallaResponse> {
    return this.httpClient.get<TallaResponse>(
      this.hosteo + 'Solicitud/GetTallasDisponibles',
      this.respuesta
    );
  }
}
