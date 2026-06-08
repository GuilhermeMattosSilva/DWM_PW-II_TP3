// Representa uma ação na carteira (vem do portfolio.json)
export interface PortfolioItem {
  ticker: string;      // Ex: "MSFT"
  empresa: string;     // Ex: "Microsoft"
  dataCompra: string;  // Ex: "2026-03-01"
  quantidade: number;  // Ex: 20
  precoCompra: number; // Ex: 320.00
}

// Representa uma linha na tabela (inclui dados calculados e da API)
export interface PortfolioRow extends PortfolioItem {
  total: number;            // quantidade * precoCompra  (coluna azul)
  cotacaoDia: number | null; // preço atual da API
  valor: number | null;     // quantidade * cotacaoDia  (coluna verde)
  variacao: number | null;  // % ganho/perda desde compra (coluna verde)
  loading: boolean;         // true enquanto a API ainda não respondeu
  erro: boolean;            // true se a API falhou
}
