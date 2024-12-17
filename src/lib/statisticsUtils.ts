import { StockTransaction } from "@/types/stock";

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat().format(value);
};

export const calculatePercentage = (amount: number, total: number) => {
  return ((amount / total) * 100).toFixed(2);
};

export type CountryStats = {
  krwAmount: number;
  usdAmount: number;
  quantity: number;
};

export type BrokerStockStats = {
  quantity: number;
  krwAmount: number;
  usdAmount: number;
};

export type BrokerStats = {
  stocks: Record<string, BrokerStockStats>;
  totalKRW: number;
  totalUSD: number;
};

export type TickerStats = {
  stockName: string;
  quantity: number;
  krwAmount: number;
  usdAmount: number;
};

export const calculateCountryStats = (stocks: StockTransaction[]) => {
  return stocks.reduce((acc, stock) => {
    const country = stock.country;
    if (!acc[country]) {
      acc[country] = {
        krwAmount: 0,
        usdAmount: 0,
        quantity: 0,
      };
    }
    
    acc[country].quantity += stock.quantity;
    
    if (country === 'KRW') {
      acc[country].krwAmount += stock.krwAmount;
    } else {
      acc[country].usdAmount += stock.usdAmount;
      acc[country].krwAmount += stock.krwAmount;
    }
    
    return acc;
  }, {} as Record<string, CountryStats>);
};

export const calculateBrokerStats = (stocks: StockTransaction[]) => {
  return stocks.reduce((acc, stock) => {
    const broker = stock.broker;
    if (!acc[broker]) {
      acc[broker] = {
        stocks: {},
        totalKRW: 0,
        totalUSD: 0,
      };
    }
    
    if (!acc[broker].stocks[stock.ticker]) {
      acc[broker].stocks[stock.ticker] = {
        quantity: 0,
        krwAmount: 0,
        usdAmount: 0,
      };
    }
    
    acc[broker].stocks[stock.ticker].quantity += stock.quantity;
    acc[broker].stocks[stock.ticker].krwAmount += stock.krwAmount;
    if (stock.country === 'USD') {
      acc[broker].stocks[stock.ticker].usdAmount += stock.usdAmount;
    }
    
    acc[broker].totalKRW += stock.krwAmount;
    if (stock.country === 'USD') {
      acc[broker].totalUSD += stock.usdAmount;
    }
    
    return acc;
  }, {} as Record<string, BrokerStats>);
};

export const calculateTickerStats = (stocks: StockTransaction[]) => {
  return stocks.reduce((acc, stock) => {
    const ticker = stock.ticker;
    if (!acc[ticker]) {
      acc[ticker] = {
        stockName: stock.stockName,
        quantity: 0,
        krwAmount: 0,
        usdAmount: 0,
      };
    }
    
    acc[ticker].quantity += stock.quantity;
    acc[ticker].krwAmount += stock.krwAmount;
    if (stock.country === 'USD') {
      acc[ticker].usdAmount += stock.usdAmount;
    }
    
    return acc;
  }, {} as Record<string, TickerStats>);
};