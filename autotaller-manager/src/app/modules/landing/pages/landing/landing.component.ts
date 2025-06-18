import { Component} from '@angular/core';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent {
  generarMailto(): string {
    const destinatario = 'automotriz@email.com';
    const asunto = encodeURIComponent('Consulta desde la web');
    const cuerpo = encodeURIComponent('Hola, me gustaría obtener más información sobre sus servicios.');

    return `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;
  }
}
