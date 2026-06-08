import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface MarketstackResponse {
  data: {
    symbol: string;
    close: number;
    date: string;
  }[];
}

@Injectable({ providedIn: 'root' })
export class StockApiService {

  constructor(private http: HttpClient) {}

  getQuote(ticker: string): Observable<number> {
    const url = `http://api.marketstack.com/v1/eod/latest?access_key=${environment.marketstackApiKey}&symbols=${ticker}`;
    return this.http.get<MarketstackResponse>(url).pipe(
      map(res => res.data[0].close)
    );
  }
}
