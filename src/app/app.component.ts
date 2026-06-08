import { Component } from '@angular/core';
import { PortfolioTableComponent } from './components/portfolio-table/portfolio-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PortfolioTableComponent],
  template: `
    <nav class="navbar navbar-dark bg-dark mb-4">
      <div class="container">
        <span class="navbar-brand">
          📈 Carteira de Ações
        </span>
        <span class="text-white-50 small">Monitorização em tempo real</span>
      </div>
    </nav>
    <app-portfolio-table></app-portfolio-table>
  `
})
export class AppComponent {}
