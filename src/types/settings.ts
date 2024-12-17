export type SettingItem = {
  id: string;
  type: 'country' | 'broker' | 'stock';
  name: string;
  ticker?: string;
};

export type Settings = {
  countries: SettingItem[];
  brokers: SettingItem[];
  stocks: SettingItem[];
};

const DEFAULT_STOCKS_DATA = [
  { stockName: 'TIGER 미국S&P500', ticker: '360750' },
  { stockName: 'TIGER 미국나스닥100', ticker: '133690' },
  { stockName: 'ACE 미국빅테크TOP7PLUS', ticker: '465580' },
  { stockName: 'SPDR S&p500ETF', ticker: 'SPLG' },
  { stockName: 'NASDAQ100 QQQ ETF', ticker: 'QQQ' },
  { stockName: 'INVESCO QQQM ETF', ticker: 'QQQM' },
  { stockName: 'TEAPRQQQ', ticker: 'TQQQ' },
  { stockName: 'VANECK USD ETF', ticker: 'SMH' },
  { stockName: 'TESLA', ticker: 'TSLA' }
];

export const DEFAULT_SETTINGS: Settings = {
  countries: [
    { id: 'KRW', type: 'country', name: 'KRW' },
    { id: 'USD', type: 'country', name: 'USD' }
  ],
  brokers: [
    { id: '한투증권', type: 'broker', name: '한투증권' },
    { id: '키움증권', type: 'broker', name: '키움증권' },
    { id: 'NH증권', type: 'broker', name: 'NH증권' }
  ],
  stocks: DEFAULT_STOCKS_DATA.map(stock => ({
    id: stock.ticker,
    type: 'stock',
    name: stock.stockName,
    ticker: stock.ticker
  }))
};