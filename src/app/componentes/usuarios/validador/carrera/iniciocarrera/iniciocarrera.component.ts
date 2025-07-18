import { Component, OnInit } from '@angular/core';
import {UsuarioDto  } from '../../../../../modelos/usuario-dto';
import { RegaloDto } from '../../../../../modelos/regalo-dto';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
declare var window: any;
import { CarreraService } from '../../../../../servicios/carrera.service';
import Swal from 'sweetalert2'
import { DomSanitizer } from '@angular/platform-browser';
import { empty } from 'rxjs';

@Component({
  selector: 'app-iniciocarrera',
  templateUrl: './iniciocarrera.component.html',
  styleUrls: ['./iniciocarrera.component.css']
})
export class IniciocarreraComponent  implements OnInit {

  usuarioDto: UsuarioDto[] = [];
  usuarioDto1: UsuarioDto[] = [];
  nuevoregaloDto1: RegaloDto[] = []

  formModal: any;
  formModal1: any;



  nuevoUsuario: UsuarioDto = { variable1: '', variable2: '', variable3: '', variable4: '', variable5: '', variable6: '', variable7: '', variable8: '', variable9: '', variable10: '', variable11: '', variable12: '', variable13: '', variable14: '', variable15: '', variable16: '', evento: 'carrera5k', };

  nuevoregalo: RegaloDto = {  codigoregalo: '', idusuariofin: '', idadminfin: '', numero: '' };
  numero1 = ""
  identificacion = ""
  idadulto = ""
  regalo = ""
  sesion: any





  constructor(
    private carreraService: CarreraService, private router: Router) {

  }




  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById('exampleModal')
    );

    this.sesion = localStorage.getItem('carrera')



  }







  public validarcedula() {

    this.nuevoUsuario.variable1= this.idadulto



    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('Identificacion no diligenciada')
    }

    else {
      this.carreraService.GetCupoRegalo(this.nuevoUsuario).subscribe(
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



  public validarnumero(group: UsuarioDto) {
    this.nuevoregalo.numero=this.numero1
    this.nuevoregalo.idadminfin = 'carrera'
    this.nuevoregalo.idusuariofin = group.variable1
    this.nuevoregalo.codigoregalo = group.evento+" "+group.variable2
    console.log(this.nuevoregalo)

    this.carreraService.createcarrera(this.nuevoregalo).subscribe(
      (data: any) => {

        if (data.status == 200) {

          Swal.fire('Felicidades reclamaste tu Kit con el codigo # ' + this.nuevoregalo.numero + " Con el administrador de la sesion " + this.nuevoregalo.idadminfin)

          this.formModal.hide();




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










