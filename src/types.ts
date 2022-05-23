export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  rating: Object,
}

export interface Stock {
  id: number;
  amount: number;
  rating: Object
}
