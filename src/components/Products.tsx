import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/api';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        console.log(allProducts);
        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      <div>Products</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        products?.map((p: Product) => (
          <div key={p.id}>
            {p.id}, {p.title}, {p.description}, ${p.price}
          </div>
        ))
      )}
    </>
  );
};

export default Products;
