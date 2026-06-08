import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PortfolioItem } from '../models/stock.model';

@Injectable({ providedIn: 'root' })
export class PortfolioService {

  constructor(private http: HttpClient) {}

  // Carrega a carteira do ficheiro public/portfolio.json
  loadPortfolio(): Observable<PortfolioItem[]> {
    return this.http.get<PortfolioItem[]>('/portfolio.json');
  }
}
