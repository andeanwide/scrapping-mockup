export interface order {
  _id: string;
  client: string;
  externalId: string;
  currency: number;
  amount: number;
  symbol: string;
  status: string;
  type: string;
  rate: orderRate;
  environment: string;
  createdAt: string;
}

export interface orderRate {
  id: string;
  symbol: string;
  timestamp: number;
  bid: number;
  offer: number;
  last: number;
}

export interface orderFormProps {
  _id: string;
  client: string;
  externalId: string;
  currency: number;
  amount: number;
  symbol: string;
  status: string;
  type: string;
  rate: orderRate;
  environment: string;
  createdAt: string;
}

export interface orderFilters {
  status?: string;
  currency?: string;
  type?: string;
  externalId?: '';
  companyName?: '';
  client?: '';
}
