export type StockTransaction = {
  id: string;
  date: string;
  type: 'buy' | 'sell';
  country: 'KRW' | 'USD';
  broker: string;
  stockName: string;
  ticker: string;
  quantity: number;
  exchangeRate: number;
  price: number;
  usdAmount: number;
  krwAmount: number;
};

export type DefaultStock = {
  stockName: string;
  ticker: string;
};