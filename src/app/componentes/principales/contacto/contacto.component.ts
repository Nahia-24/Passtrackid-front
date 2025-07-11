import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements AfterViewInit {

  @ViewChild('contactForm') contactForm?: ElementRef<HTMLFormElement>;

  ngAfterViewInit() {
    if (this.contactForm) {
      this.contactForm.nativeElement.addEventListener('submit', () => {
        setTimeout(() => {
          alert('¡Mensaje enviado correctamente! 🎉');
          this.contactForm?.nativeElement.reset();
        }, 500); // Pequeña espera para asegurar el envío
      });
    } else {
      console.error('El formulario no se encontró en el DOM.');
    }
  }
}
