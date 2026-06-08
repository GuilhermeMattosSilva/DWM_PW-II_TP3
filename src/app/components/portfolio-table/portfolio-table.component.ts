import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';
import { StockApiService } from '../../services/stock-api.service';
import { PortfolioRow } from '../../models/stock.model';

@Component({
  selector: 'app-portfolio-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-table.component.html',
  styleUrl: './portfolio-table.component.css'
})
export class PortfolioTableComponent implements OnInit {

  rows: PortfolioRow[] = [];
  isLoading = true;

  constructor(
    private portfolioService: PortfolioService,
    private stockApi: StockApiService
  ) {}

  ngOnInit(): void {
    this.portfolioService.loadPortfolio().subscribe(items => {
      this.rows = items.map(item => ({
        ...item,
        total: item.quantidade * item.precoCompra,
        cotacaoDia: null,
        valor: null,
        variacao: null,
        loading: true,
        erro: false
      }));

      this.isLoading = false;

      items.forEach((item, index) => {
        this.stockApi.getQuote(item.ticker).subscribe({
          next: (preco) => {
            const row = this.rows[index];
            row.cotacaoDia = preco;
            row.valor = item.quantidade * preco;
            row.variacao = ((preco - item.precoCompra) / item.precoCompra) * 100;
            row.loading = false;
          },
          error: () => {
            this.rows[index].loading = false;
            this.rows[index].erro = true;
          }
        });
      });
    });
  }

  getVariacaoClass(variacao: number | null): string {
    if (variacao === null) return '';
    if (variacao > 0) return 'variacao-positiva';
    if (variacao < 0) return 'variacao-negativa';
    return 'variacao-neutra';
  }

  get totalInvestido(): number {
    return this.rows.reduce((soma, r) => soma + r.total, 0);
  }

  get totalValor(): number | null {
    if (this.rows.some(r => r.loading || r.erro)) return null;
    return this.rows.reduce((soma, r) => soma + r.valor!, 0);
  }

  get totalVariacao(): number | null {
    if (this.totalValor === null) return null;
    return ((this.totalValor - this.totalInvestido) / this.totalInvestido) * 100;
  }
}
