import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const allProducts = await fetchProducts();
    setProducts(allProducts);
  };

  return (
    <>
      <div>Products</div>
    </>
  );
};

export default Products;
