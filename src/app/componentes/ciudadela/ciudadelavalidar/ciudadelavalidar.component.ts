import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../../modelos/usuario-dto';
import { DepartamentoI, CiudadI } from 'src/app/modelos/ciudades';
import { FormControl, Validators } from '@angular/forms';
import { CiudadelaService } from '../../../servicios/ciudadela.service';


import Swal from 'sweetalert2'
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-ciudadelavalidar',
  templateUrl: './ciudadelavalidar.component.html',
  styleUrls: ['./ciudadelavalidar.component.css']
})
export class CiudadelavalidarComponent {
  usuarioDto: UsuarioDto[] = [];
  nuevoUsuario: UsuarioDto = { variable1: '', variable2: '', variable3: '', variable4: '', variable5: '', variable6: '', variable7: '', variable8: '', variable9: '', variable10: '', variable11: '', variable12: '', variable13: '', variable14: '', variable15: '', variable16: '', evento: 'ciudadela0705', };


 


  constructor(
    private ciudadelaService: CiudadelaService) { }

  ngOnInit(): void {  }





  public validarinscripcion() {

    if (this.nuevoUsuario.variable1 == "") {
      Swal.fire('El número de documento del participante debe ser diligenciado')
    } else {
      console.log(this.nuevoUsuario)
      this.ciudadelaService.ValidarMenor(this.nuevoUsuario).subscribe(
        (data: any) => {
          if (data.status == 200) {
            Swal.fire('La persona con este documento NO SE ENCUENTRA REGISTRADO en la Ciudadela de la Alegria')
            this.nuevoUsuario = {}


          } else {

            Swal.fire(data.payload.message)

      
          }
        }, (error) => {
          console.log(error);
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')
    
          this.nuevoUsuario = {}
   


        }
      );


    }
  }
}


