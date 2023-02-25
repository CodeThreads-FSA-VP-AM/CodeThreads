import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);

  console.log(products);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const allProducts = await fetchProducts();
    setProducts(allProducts);
  };

  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
  }

  return (
    <>
      <div>Products</div>
      <div>
        {products.map((p) => (
          <div>{p}</div>
        ))}
      </div>
    </>
  );
};

export default Products;
