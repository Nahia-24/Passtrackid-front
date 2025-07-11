// src/app/inicio/inicio.component.ts
import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/servicios/event.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  terminoBusqueda: string = '';
  eventosOriginales: any[] = [];
  eventosFiltrados: any[] = [];

  currentIndex = 0;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getUpcomingEvents().subscribe((eventos) => {
      this.eventosOriginales = eventos.map(e => ({
        id: e.id,
        image: e.thumbnailImage, // la miniatura que quieres en la card
        title: e.name,
        description: e.description,
        fullEvent: e // guardar el evento completo si lo necesitas para la navegación
      }));
      this.eventosFiltrados = [...this.eventosOriginales];
    });
  }

  buscarEventos() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.eventosFiltrados = this.eventosOriginales.filter(evento =>
      evento.title.toLowerCase().includes(termino) || evento.description.toLowerCase().includes(termino)
    );
  }

  nextEvent() {
    this.currentIndex = (this.currentIndex + 1) % this.eventosFiltrados.length;
  }

  prevEvent() {
    this.currentIndex = (this.currentIndex - 1 + this.eventosFiltrados.length) % this.eventosFiltrados.length;
  }
}
/* 
import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  terminoBusqueda: string = '';
  eventosOriginales = [
    { image: 'assets/headercrocs.jpg', title: 'Evento Gobernación del Valle', description: 'Disfruta de este beneficio especial de zapatos, medias, dispositivos de rastreo y más de 800 unidades de camisetas.' },
    { image: 'assets/fondo3.png', title: 'Exposición de Arte', description: 'Sumérgete en el mundo del arte moderno y clásico.' },
    { image: 'assets/fondo4.png', title: 'Conferencia Tecnológica', description: 'Aprende sobre las últimas innovaciones tecnológicas.' },
    { image: 'assets/fondo5.png', title: 'Conferencia Tecnológica', description: 'Aprende sobre las últimas innovaciones tecnológicas.' },
  ];

  currentIndex = 0;

  eventosDestacados = [
    { image: 'assets/BaloncestoEnFamilia.webp', title: 'Liga Baloncesto', description: 'La mejor liga de baloncesto los sábados.' },
    { image: 'assets/membrete.jpg', title: 'Exposición de Fotografía', description: 'Una galería con los mejores fotógrafos locales.' },
    { image: 'assets/membrete.jpg', title: 'Feria Gastronómica', description: 'Descubre los sabores más exquisitos en esta feria.' }
  ];

  nextEvent() {
    this.currentIndex = (this.currentIndex + 1) % this.eventosDestacados.length;
  }

  prevEvent() {
    this.currentIndex = (this.currentIndex - 1 + this.eventosDestacados.length) % this.eventosDestacados.length;
  }

  eventosFiltrados = [...this.eventosOriginales];

  buscarEventos() {
    const termino = this.terminoBusqueda.toLowerCase().trim();
    this.eventosFiltrados = this.eventosOriginales.filter(evento =>
      evento.title.toLowerCase().includes(termino) || evento.description.toLowerCase().includes(termino)
    );
  }
}
 */