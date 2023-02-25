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

  return (
    <>
      <div>Products</div>
    </>
  );
};

export default Products;
