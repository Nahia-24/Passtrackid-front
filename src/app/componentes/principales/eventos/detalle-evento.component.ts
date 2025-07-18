import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { EventService } from 'src/app/servicios/event.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AfterViewInit, Renderer2, ViewChild, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-detalle-evento',
  templateUrl: './detalle-evento.component.html',
  styleUrls: ['./detalle-evento.component.css']
})
export class DetalleEventoComponent implements OnInit {
  event: any;
  showMap = false;
  safeMapUrl: SafeResourceUrl = '';
  ticketError: string = '';
  eventUrl = '';

  showLoader = false;
  showTicketModal = false;
  showFormModal = false;
  showSuccessModal = false;
  showLoaderParticipants = false;

  currentStep = 1;

  @ViewChild('form', { static: true }) formRef!: ElementRef;
  @ViewChildren('step') steps!: QueryList<ElementRef>;
  @ViewChild('progressBar', { static: true }) progressBar!: ElementRef;
  @ViewChild('modalCompartir', { static: false }) modalCompartirRef!: ElementRef;

  availableTickets: any[] = [];
  ticketForms: any[] = [];
  minPrice: number | null = null;
  currentFormIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2,
  ) { }

  get selectedTickets() {
    return this.availableTickets.filter(t => t.quantity > 0);
  }

  ngAfterViewInit(): void {
    this.steps.forEach((step, index) => {
      if (index !== 0) {
        this.renderer.setStyle(step.nativeElement, 'display', 'none');
      }
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventosService.getEventoById(id).subscribe(evento => {
        this.event = evento;

        // Contar cuántos asistentes hay por cada tipo de ticket
        const participantesPorTipo: { [key: string]: number } = {};
        if (evento.participants && Array.isArray(evento.participants)) {
          evento.participants.forEach((p: any) => {
            if (!participantesPorTipo[p.tipo]) {
              participantesPorTipo[p.tipo] = 1;
            } else {
              participantesPorTipo[p.tipo]++;
            }
          });
        }

        // Construir la lista de tickets disponibles
        this.availableTickets = evento.tickets.map(ticket => {
          const usados = participantesPorTipo[ticket.tipo] || 0;
          return {
            id: ticket.tipo,
            name: ticket.tipo,
            price: ticket.valor,
            available: ticket.disponibles - usados,
            selected: 0,
            quantity: 0
          };
        });
        // Calcular precio mínimo para mostrar en vista
        const precios = evento.tickets
          .filter((t: any) => typeof t.valor === 'number' && t.valor > 0)
          .map((t: any) => t.valor);

        this.minPrice = precios.length > 0 ? Math.min(...precios) : null;
      });
    }
  }

  toggleMap() {
    this.showMap = !this.showMap;
    if (this.showMap) {
      const encodedLocation = encodeURIComponent(this.event.location);
      const url = `https://www.google.com/maps?q=${encodedLocation}&output=embed`;
      this.safeMapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  get currentTicketForm() {
    return this.ticketForms[this.currentFormIndex];
  }

  get isLastForm() {
    return this.currentFormIndex === this.ticketForms.length - 1;
  }

  nextForm() {
    if (this.currentFormIndex < this.ticketForms.length - 1) {
      this.currentFormIndex++;
    }
  }

  previousForm() {
    if (this.currentFormIndex > 0) {
      this.currentFormIndex--;
    }
  }

  irAlPago() {
    this.currentStep = 3;
    this.actualizarParticipantes();
  }

  comprarETicket() {
    this.showLoader = true;
    setTimeout(() => {
      this.showLoader = false;
      this.showTicketModal = true;
      this.currentStep = 1;
    }, 1500);
  }

  increaseQuantity(ticket: any) {
    ticket.quantity = (ticket.quantity || 0) + 1;
  }

  decreaseQuantity(ticket: any) {
    if (ticket.quantity && ticket.quantity > 0) {
      ticket.quantity--;
    }
  }

  removeTicket(ticket: any) {
    ticket.quantity = 0;
  }

  getTotal(): number {
    return this.selectedTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
  }

  volverASeleccion() {
    this.showFormModal = false;
    this.showTicketModal = true;
    this.currentStep = 1;
  }

  get progressWidth(): string {
    const totalSteps = 3;
    return ((this.currentStep - 1) / (totalSteps - 1)) * 100 + '%';
  }

  continuarConFormulario() {
    this.ticketForms = [];

    this.selectedTickets.forEach(ticket => {
      for (let i = 0; i < ticket.quantity; i++) {
        this.ticketForms.push({
          name: '',
          email: '',
          tipo: ticket.name
        });
      }
    });

    this.showTicketModal = false;
    this.showFormModal = true;
    this.currentStep = 2;
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      if (this.selectedTickets.length === 0) {
        this.ticketError = '⚠️ Debes seleccionar al menos un ticket para continuar.';
        return;
      }

      this.ticketError = '';
      this.continuarConFormulario(); // Ya cambia a currentStep = 2 internamente
      return; // ❗ Importante: no continúes con la animación aquí
    }

    if (this.currentStep === 2) {
      const current = this.steps.get(this.currentStep - 1)?.nativeElement;
      this.renderer.addClass(current, 'animate__animated');
      this.renderer.addClass(current, 'animate__fadeOutLeft');

      setTimeout(() => {
        this.steps.forEach(step => this.renderer.setStyle(step.nativeElement, 'display', 'none'));
        const next = this.steps.get(this.currentStep)?.nativeElement;
        this.renderer.setStyle(next, 'display', 'block');
        this.renderer.addClass(next, 'animate__animated');
        this.renderer.addClass(next, 'animate__fadeInRight');

        this.currentStep++;
        this.updateProgressBar();
      }, 500);
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      const current = this.steps.get(this.currentStep - 1)?.nativeElement;
      this.renderer.addClass(current, 'animate__animated');
      this.renderer.addClass(current, 'animate__fadeOutRight');

      setTimeout(() => {
        this.steps.forEach(step => this.renderer.setStyle(step.nativeElement, 'display', 'none'));
        const prev = this.steps.get(this.currentStep - 2)?.nativeElement;
        this.renderer.setStyle(prev, 'display', 'block');
        this.renderer.addClass(prev, 'animate__animated');
        this.renderer.addClass(prev, 'animate__fadeInLeft');

        this.currentStep--;
        this.updateProgressBar();
      }, 500);
    }
  }

  updateProgressBar(): void {
    const progressPercentage = ((this.currentStep - 1) / 2) * 100;
    this.renderer.setStyle(this.progressBar.nativeElement, 'width', `${progressPercentage}%`);
  }

  cerrarModales(): void {
    this.showSuccessModal = false;
    this.showTicketModal = false;
    this.showFormModal = false;
    this.ticketForms = [];
    this.currentStep = 1;
    this.availableTickets.forEach(t => (t.quantity = 0));
  }

  actualizarParticipantes() {
    this.showFormModal = false;
    this.showLoaderParticipants = true;

    const participantes = this.ticketForms.map(form => ({
      name: form.name,
      email: form.email,
      tipo: form.tipo
    }));

    const updatedEvent = {
      ...this.event,
      participants: [...(this.event.participants || []), ...participantes]
    };

    this.eventosService.actualizarEventoConParticipantes(updatedEvent).subscribe(
      () => {
        this.showLoaderParticipants = false;
        this.showSuccessModal = true;
      },
      error => {
        console.error('Error al actualizar el evento y participantes', error);
      }
    );
  }

  abrirModalCompartir() {
    this.eventUrl = `https://www.miapp.com/eventos/${this.event?._id || this.event?.id}`; // o usa tu lógica
    const modalElement = document.getElementById('modalCompartir');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  copiarEnlace() {
    navigator.clipboard.writeText(this.eventUrl);
    alert('¡Enlace copiado al portapapeles!');
  }

  encodeUrl(value: string): string {
    return encodeURIComponent(value);
  }
}
