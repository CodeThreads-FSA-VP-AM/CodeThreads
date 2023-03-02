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

export interface OrderData {
  id: number;
  order_id: number;
  product_id: number;
  users_id: number;
  price: number;
  status: string;
  title: string;
  description: string;
  quantity: number;
  front_url: string;
  back_url: string;

}

export interface Order {
  id: number;
  order_id: number;
  product_id: number;
  users_id: number;
  price: number;
  status: string;
  title: string;
  description: string;
  quantity: number;
  front_url: string;
  back_url: string;

}

export interface User {
  token: string;
  
}

export interface Review {
  id: number;
  product_id: number;
  rating: number;
  title: string;
  description: string;
  users_id: number;
}