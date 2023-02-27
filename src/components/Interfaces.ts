// can resuse interfaces in this file for multiple components
// add export to interface

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  front_url?: string
  back_url?: string
}

export interface ProductCreate {
  title: string;
  description: string;
  price: number;
  front_url: string
  back_url: string
}

export interface ProductEdit {
  productId: number
  title: string;
  description: string;
  price: number;
  front_url: string
  back_url: string
}