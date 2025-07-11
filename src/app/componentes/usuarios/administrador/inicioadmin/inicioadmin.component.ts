import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioDto } from '../../../../modelos/usuario-dto';
import { CiudadelaService } from '../../../../servicios/ciudadela.service'
import { Subject } from "rxjs";


@Component({
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.component.html',
  styleUrls: ['./inicioadmin.component.css']
})
export class InicioadminComponent  implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings ={}
  usuarioDto: UsuarioDto[] = [];
  dtTrigger: Subject<any> = new Subject<any>()





  constructor(
    private ciudadelaService: CiudadelaService) { }

    ngOnInit(): void { 
      this.dtOptions={
        language:{
          url: '//cdn.datatables.net/plug-ins/1.12.1/i18n/es-ES.json'
        },
        pagingType: 'full_numbers',
    
      };
      
      
      this.ciudadelaService.getAllUser().subscribe((data: any) => {
        this.usuarioDto = data.payload;
        this.dtTrigger.next(data.payload);
        console.log(this.usuarioDto)
  



      }, error => {
        console.log(error);


      })}

      ngOnDestroy(): void {
        
        this.dtTrigger.unsubscribe();
      }







}
