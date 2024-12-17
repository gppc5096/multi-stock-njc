import { StockTransaction } from "@/types/stock";

const STORAGE_KEY = "stocks";

export const loadStocks = (): StockTransaction[] => {
  const stocksJson = localStorage.getItem(STORAGE_KEY);
  return stocksJson ? JSON.parse(stocksJson) : [];
};

export const saveStock = (stock: StockTransaction) => {
  const stocks = loadStocks();
  stocks.push(stock);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
  window.dispatchEvent(new Event('stocksChanged'));
};

export const updateStock = (updatedStock: StockTransaction) => {
  const stocks = loadStocks();
  const index = stocks.findIndex(stock => stock.id === updatedStock.id);
  if (index !== -1) {
    stocks[index] = updatedStock;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stocks));
    window.dispatchEvent(new Event('stocksChanged'));
  }
};

export const deleteStock = (id: string) => {
  const stocks = loadStocks();
  const filteredStocks = stocks.filter(stock => stock.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredStocks));
  window.dispatchEvent(new Event('stocksChanged'));
};