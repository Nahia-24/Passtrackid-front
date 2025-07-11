import { Component, OnInit, Input } from '@angular/core';
import { UsuariosService } from '../../../../../servicios/usuarios.service'
import { AdmindDto } from '../../../../../modelos/admin-dto';
import Swal from 'sweetalert2'
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-logincarrera',
  templateUrl: './logincarrera.component.html',
  styleUrls: ['./logincarrera.component.css']
})
export class LogincarreraComponent  implements OnInit {
  admindto: AdmindDto[] = [];
  nuevoAdmin: AdmindDto = { usuarioadmin: '', contrasenaadmin: '', tipo: '' };
  usuario = ""
  contrasena = ""

  constructor(
    private router: Router, private usuarioservice: UsuariosService) {

  }

  ngOnInit(): void {

  }

  public validar1() {



    this.nuevoAdmin.usuarioadmin = this.usuario
    this.nuevoAdmin.contrasenaadmin = this.contrasena




    if (this.nuevoAdmin.usuarioadmin == "") {

      Swal.fire('Digite el Usuario')

    } else if (this.nuevoAdmin.contrasenaadmin == "") {

      Swal.fire('Digite el contrasena')

    } else {


      this.usuarioservice.logincarrera(this.nuevoAdmin).subscribe(
        (data: any) => {
          if (data.status == 200) {

            this.usuarioservice.logincarrerafin(this.nuevoAdmin.usuarioadmin)
            this.router.navigate(['carrera/login/inicio'])
            Swal.fire('Bienvenido')

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