import { Component, OnInit, Input } from '@angular/core';
import { CiudadelaService } from '../../../../../servicios/ciudadela.service'
import { UsuarioDto } from '../../../../../modelos/usuario-dto';
import { RegaloDto } from '../../../../../modelos/regalo-dto';

import Swal from 'sweetalert2'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
declare var window: any;

@Component({
  selector: 'app-iniciociud',
  templateUrl: './iniciociud.component.html',
  styleUrls: ['./iniciociud.component.css']
})
export class IniciociudComponent implements OnInit {

  usuarioDto: UsuarioDto[] = [];
  usuarioDto1: UsuarioDto[] = [];
  nuevoregaloDto1: RegaloDto[] = []
  formModal: any;
  formModal1: any;



  nuevoUsuario: UsuarioDto = { variable1: '', variable2: '', variable3: '', variable4: '', variable5: '', variable6: '', variable7: '', variable8: '', variable9: '', variable10: '', variable11: '', variable12: '', variable13: 'pendiente', evento: 'ciudadela4' };

  nuevoregalo: RegaloDto = { codigoregalo: "", idusuariofin: "", idadminfin: "", numero: "" };

  identificacion = ""
  idadulto = ""
  regalo = ""
  sesion: any





  constructor(
    private usuarioservice: CiudadelaService, private router: Router) {

  }




  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );

    this.sesion = localStorage.getItem('ciudadela')



  }



  public reclamarpremio(group: UsuarioDto) {




    this.nuevoUsuario.variable1 = group.variable1
    this.nuevoUsuario.idusuario = group.idusuario



    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('Identificacion no diligenciada')
    }


    else {


      this.usuarioservice.entregarregalo(this.nuevoUsuario).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.identificacion = ""
            this.regalo = ""
            this.idadulto = ""
            this.nuevoregalo.codigoregalo = group.variable1
            this.nuevoregalo.idadminfin = this.sesion
            this.nuevoregalo.idusuariofin = String(group.idusuario)
            this.nuevoregalo.numero = group.variable15
            console.log(this.nuevoregalo)
            console.log(this.nuevoUsuario)
            this.crearregalo()
            this.formModal.hide();


          } else {

            Swal.fire(data.payload.message)
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')

        }
      );








    }

  }

  public crearregalo() {
    this.usuarioservice.createregalo(this.nuevoregalo).subscribe(
      (data: any) => {


        if (data.status == 200) {

          Swal.fire('Felicidades reclamaste tu regalo con el codigo # ' + this.nuevoregalo.numero + " Con el administrador de la sesion =" + this.nuevoregalo.idadminfin)




        } else {
          this.idadulto = ""

          Swal.fire(data.payload.message)
        }
      }, (error) => {
        console.log(error);
        Swal.fire('error al intentar registrate por favor intentalo mas tarde')

      }
    );
  }




  public validarcedula() {
    this.nuevoUsuario.variable11 = this.idadulto

    if (this.nuevoUsuario.variable11 == "") {
      Swal.fire('Identificacion no diligenciada')
    }

    else {
      this.usuarioservice.GetRegalopersona(this.nuevoUsuario).subscribe(
        (data: any) => {


          if (data.status == 200) {
            this.usuarioDto1 = data.payload;
            this.formModal.show();




          } else {
            this.idadulto = ""

            Swal.fire(data.payload.message)
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')

        }
      );







    }

  }



  public ValidarCantidadRegalos() {

    this.nuevoregalo.idadminfin = this.sesion
    console.log(this.nuevoregalo)


    this.usuarioservice.buscarultimoregistroregalo(this.nuevoregalo).subscribe(
      (data: any) => {
        this.usuarioDto = data.payload;

        console.log(this.usuarioDto.length)

        if (data.status == 200) {

          this.formModal.show();




        } else {

          Swal.fire(data.payload.message)
        }
      }, (error) => {
        console.log(error);
        Swal.fire('error al intentar registrate por favor intentalo mas tarde')

      }
    );





  }
  public entregarregalo() {

    this.nuevoUsuario.variable1 = this.identificacion



    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('Identificacion no diligenciada')
    }

    else {
      this.usuarioservice.GetRegalopersonamenor(this.nuevoUsuario).subscribe(
        (data: any) => {
          if (data.status == 200) {
            this.usuarioDto1 = data.payload;
            this.formModal.show();




          } else {

            Swal.fire(data.payload.message)
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')

        }
      );








    }

  }


}
