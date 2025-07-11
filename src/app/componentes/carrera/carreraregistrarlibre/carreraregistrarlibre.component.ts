import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../../modelos/usuario-dto';
import { DepartamentoI, CiudadI } from 'src/app/modelos/ciudades';
import { FormControl, Validators } from '@angular/forms';
import { CarreraService } from '../../../servicios/carrera.service';
import { DepartamentosService } from '../../../servicios/departamentos.service';

import Swal from 'sweetalert2'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-carreraregistrarlibre',
  templateUrl: './carreraregistrarlibre.component.html',
  styleUrls: ['./carreraregistrarlibre.component.css']
})
export class CarreraregistrarlibreComponent {
  isLoading: boolean = false; // booleano para detectar cuándo salta el loading

  usuarioDto: UsuarioDto[] = [];
  nuevoUsuario: UsuarioDto = { variable1: '', variable2: '', variable3: '', variable4: '', variable5: '', variable6: '', variable7: '', variable8: '', variable9: '', variable10: '', variable11: '', variable12: '', variable13: '', variable14: '', variable15: '', variable16: 'pendiente', evento: 'ciudadelacodigo', };
  terminos = ""
  terminosprincipal = ""
  pdfnombremenor = ""
  pdfnombreadulto = ""
  variablemenorvar = false


  menores = ""
  edad = ""
  TipoSangre = ""
  Frecuencia = ""
  genero = ""
  eps = ""
  discapacidad = ""



  confircorreo = ""
  imagenPrevia: any;
  files: any = []
  terminosver = true
  registro = false


  tipoidemenor = ""
  generomenor = ""
  discapacidadmenor = ""
  sangremenor = ""

  comuna = ""

  tipoidadulto = ""
  generoadulto = ""
  discapacidadadulto = ""
  sangreadulto = ""



  min = 100000;
  max = 900000;
  x = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
  l= ""

  SendDataonChange(event: any) {
    console.log(event.target.value);
  }

  variable2 = new FormControl('', Validators.required);
  formulariomenor = true
  formulariomayor = false
  numero = 0;
  emailval = ""
  fechaval = ""
  public seleccionarDepartamento: DepartamentoI = { id: 0, name: '' };
  public departamentos: DepartamentoI[] = [];
  public seleccionarCiudad: DepartamentoI = { id: 0, name: '' };
  public ciudades: CiudadI[] = [];
  public tallasDisponibles: { nombre: string; cantidadDisponible: number }[] = [];


  constructor(
    private carreraService: CarreraService, private departamentosService: DepartamentosService) { }

  ngOnInit(): void {
    this.departamentos = this.departamentosService.getDepartamentos();
    this.ciudades = this.departamentosService.getCiudades();
    this.carreraService.getTallasDisponibles().subscribe(
          (response) => {
            this.tallasDisponibles = this.tallasDisponibles = response.payload; // Asigna solo el array del payload
          },
          (error) => {
            console.error('Error al obtener las tallas disponibles:', error);
            Swal.fire('Error', 'No se pudieron cargar las tallas disponibles', 'error');
          }
        );
  }
  onSelect(usarName: number): void {
    this.ciudades = this.departamentosService.getCiudades().filter(item => item.departamentoId == usarName);
  }


  terminosvalidar() {

    if (this.terminosprincipal == "") {

      Swal.fire('Se debe aceptar los terminos y condiciones de las consideraciones y reglas de la carrera atletico recreativa')

    } else {
      this.terminosver = false
      this.registro = true
    }


  }


  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");

      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL("image/png");

        resolve(dataURL);
      };

      img.onerror = error => {
        reject(error);
      };

      img.src = url;
    });
  }


  async createPdf() {

    console.log(this.nuevoUsuario)
    console.log(this.comuna)
    console.log(this.pdfnombreadulto)
    console.log(this.pdfnombremenor)


    const pdfDefinition: any = {
      background: [
        {
          image: await this.getBase64ImageFromURL("../../assets/membrete.png"),
          width: 600,
          height: 850,
          opacity: 1,
        }
      ],
      content: [

        { text: this.pdfnombremenor, style: 'tableHeader', bold: true, margin: [250, 345, 0, 0] },
        { text: this.l, style: 'tableHeader', bold: true, margin: [250, 23, 0, 0] },






      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.download('Carrera.pdf');
  }



  public formulariomenorvalidar() {


    this.nuevoUsuario.variable5 = this.edad + this.genero
    this.nuevoUsuario.variable8 = this.comuna + this.seleccionarDepartamento + this.seleccionarCiudad
    this.nuevoUsuario.variable10 = this.TipoSangre + this.eps
    this.nuevoUsuario.variable12 = this.tipoidadulto + this.Frecuencia + this.discapacidad


    this.pdfnombremenor = this.nuevoUsuario.variable3

    this.nuevoUsuario.variable15= String(this.x)




    var validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    console.log(this.nuevoUsuario)


    if (this.nuevoUsuario.variable1 == "") {

      Swal.fire('La identificacion del participante no debe ser diligenciado')

    } else if (this.nuevoUsuario.variable3 == "") {
      Swal.fire('El nombre debe ser diligenciado')


    }  else if (this.nuevoUsuario.variable2 == "") {
      Swal.fire('Debe Diligenciar el Codigo')


    } else if (this.nuevoUsuario.variable4 == "") {
      Swal.fire('El Apellido debe ser diligenciado')


    } else if (this.edad == "") {
      Swal.fire('La edad debe ser diligenciada')


    } else if (this.nuevoUsuario.variable5 == "") {

      Swal.fire('El genero del participante debe ser diligenciado')

    }
    else if (this.nuevoUsuario.variable6 == "") {

      Swal.fire('El Celular debe ser diligenciado')

    } /* else if (this.nuevoUsuario.variable6?.length != 10) {

      Swal.fire('El célular debe ser de 10 digitos')



    }  */else if (this.nuevoUsuario.variable7 == "") {

      Swal.fire('Correo electrónico no diligenciado')

    } /* else if (validEmail.test(this.nuevoUsuario.variable7) == false) {

      Swal.fire('Por favor diligenciar un correo valido. Ejemplo: caliciudaddeportiva@gmail.com')

    }  */else if (String(this.seleccionarDepartamento) == "") {
      Swal.fire('El departamento debe ser diligenciado ')

    } else if (String(this.seleccionarCiudad).length > 500) {
      Swal.fire('Debes diligenciar el departamento y la ciudad ')
    }



    else if (this.nuevoUsuario.variable9 == "") {
      Swal.fire('la direccion debe ser diligenciada')


    } else if (this.nuevoUsuario.variable10 == "") {
      Swal.fire('La eps del participante debe ser diligenciada')


    } else if (this.TipoSangre == "") {
      Swal.fire('El tipo de sangre del participante debe ser diligenciado')


    } else if (this.nuevoUsuario.variable11 == "") {
      Swal.fire('La talla de la camisa del participante debe ser diligenciada ')

    }
    else if (this.nuevoUsuario.variable12 == "") {
      Swal.fire('Debe diligenciar si tiene alguna discapcacidad ')

    } else if (this.tipoidadulto == "") {
      Swal.fire('El Nivel Academico debe ser diligenciado')


    } else if (this.comuna == "") {
      Swal.fire('Debes elegir la comuna')


    } else if (this.genero == "") {
      Swal.fire('debes elegir el genero')


    }
    else if (this.terminos == "") {

      Swal.fire('Se debe aceptar los terminos y condiciones de las consideraciones y reglas de la carrera atletico recreativa')

    } else if (this.terminosprincipal == "") {

      Swal.fire('se debe Aceptar autorización de participación del menor de edad ')

    }


    else {
      this.isLoading = true;
      console.log(this.nuevoUsuario)
      this.carreraService.createUserCarrera(this.nuevoUsuario).subscribe(
        (data: any) => {
          this.isLoading = false;
          if (data.status == 200) {
            Swal.fire('Felicidades ya se encuentran participando en el evento con numero de registro: ' + this.x)
            this.l= String(this.x)
            this.createPdf()
            this.carreraService.getTallasDisponibles().subscribe(
              (response) => {
                this.tallasDisponibles = this.tallasDisponibles = response.payload; // Asigna solo el array del payload
                console.log("tallas:", this.tallasDisponibles)
              },
              (error) => {
                console.error('Error al obtener las tallas disponibles:', error);
                Swal.fire('Error', 'No se pudieron cargar las tallas disponibles', 'error');
              }
            );
            this.nuevoUsuario.variable1 = ""
            this.nuevoUsuario.variable2 = ""
            this.nuevoUsuario.variable3 = ""
            this.nuevoUsuario.variable4 = ""
            this.nuevoUsuario.variable5 = ""
            this.nuevoUsuario.variable6 = ""
            this.nuevoUsuario.variable7 = ""
            this.nuevoUsuario.variable8 = ""
            this.nuevoUsuario.variable9 = ""
            this.nuevoUsuario.variable10 = ""
            this.nuevoUsuario.variable11 = ""
            this.nuevoUsuario.variable12 = ""
            this.nuevoUsuario.variable13 = ""
            this.nuevoUsuario.variable14 = ""
            this.nuevoUsuario.variable15 = ""
            this.nuevoUsuario.variable16 = ""
            this.emailval = ""
            this.fechaval = ""
            this.tipoidemenor = ""
            this.generomenor = ""
            this.discapacidadmenor = ""
            this.sangremenor = ""
            this.terminosprincipal = ""

            this.comuna = ""

            this.tipoidadulto = ""
            this.generoadulto = ""
            this.discapacidadadulto = ""
            this.sangreadulto = ""

            this.x = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);
            this.variablemenorvar = false;


          } else {

            Swal.fire(data.payload.message)
            this.nuevoUsuario.variable11 = ""
            this.carreraService.getTallasDisponibles().subscribe(
              (response) => {
                this.tallasDisponibles = this.tallasDisponibles = response.payload; // Asigna solo el array del payload
                console.log("tallas:", this.tallasDisponibles)
                },
              (error) => {
                  console.error('Error al obtener las tallas disponibles:', error);
                  Swal.fire('Error', 'No se pudieron cargar las tallas disponibles', 'error');
                }
              );
            this.formulariomenor = true
            this.formulariomayor = false
            this.variablemenorvar = false;

          }
        }, (error) => {
          console.log(error);
          this.nuevoUsuario.variable11 = ""
          this.carreraService.getTallasDisponibles().subscribe(
            (response) => {
              this.tallasDisponibles = this.tallasDisponibles = response.payload; // Asigna solo el array del payload
              console.log("tallas:", this.tallasDisponibles)
            },
            (error) => {
              console.error('Error al obtener las tallas disponibles:', error);
              Swal.fire('Error', 'No se pudieron cargar las tallas disponibles', 'error');
            }
          );
          Swal.fire('error al intentar registrate por favor intentalo mas tarde')
          this.formulariomenor = true
          this.formulariomayor = false
          this.nuevoUsuario.variable1 = ""
          this.nuevoUsuario.variable2 = ""
          this.nuevoUsuario.variable3 = ""
          this.nuevoUsuario.variable4 = ""
          this.nuevoUsuario.variable5 = ""
          this.nuevoUsuario.variable6 = ""
          this.nuevoUsuario.variable7 = ""
          this.nuevoUsuario.variable8 = ""
          this.nuevoUsuario.variable9 = ""
          this.nuevoUsuario.variable10 = ""
          this.nuevoUsuario.variable11 = ""
          this.nuevoUsuario.variable12 = ""
          this.nuevoUsuario.variable13 = ""
          this.nuevoUsuario.variable14 = ""
          this.nuevoUsuario.variable15 = ""
          this.nuevoUsuario.variable16 = ""
          this.emailval = ""
          this.fechaval = ""
          this.tipoidemenor = ""
          this.generomenor = ""
          this.discapacidadmenor = ""
          this.sangremenor = ""
          this.terminosprincipal = ""
          this.variablemenorvar = false;


          this.comuna = ""

          this.tipoidadulto = ""
          this.generoadulto = ""
          this.discapacidadadulto = ""
          this.sangreadulto = ""

          this.x = Math.floor(Math.random() * (this.max - this.min + 1) + this.min);


          this.emailval = ""
          this.fechaval = ""


        }
      );


    }

  }




}

