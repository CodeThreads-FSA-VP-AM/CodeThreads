// can resuse interfaces in this file for multiple components
// add export to interface

import { ReactNode } from "react";



export interface Product {
  product_id(product_id: any): void;
  status: ReactNode;
  quantity: string | number | readonly string[] | undefined;
  id: number;
  title: string;
  description: string;
  price: number;
  front_url?: string
  back_url?: string
  tags?: any
}

export interface ProductCreate {
  title: string;
  description: string;
  price: number;
  front_url: string
  back_url: string
  tags: string
  small: number
  medium: number
  large: number
  xlarge: number
}

export interface ProductEdit {
  productId: number
  title: string;
  description: string;
  price: number;
  front_url: string
  back_url: string
  tags: string
  small: number
  medium: number
  large: number
  xlarge: number
}

export interface SizeQTY {
  productId: number
  small: number
  medium: number
  large: number
  xlarge: number
}

export interface WishlistData {
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

export interface CartItem {
  id: number;
  quantity: number;
}

