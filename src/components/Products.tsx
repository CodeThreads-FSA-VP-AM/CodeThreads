import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/api";
import { Product } from "./Interfaces";

type Props = {
  setProductId: (id: number) => void;
};

const Products: React.FC<Props> = ({ setProductId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts: Product[] = await fetchProducts();
        console.log(allProducts);
        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadProducts();
  }, []);

  const idHandle = (id: number) => {
    console.log(id);
    setProductId(id);
  };

  return (
    <>
      <div>Products</div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        products?.map((p: Product) => (
          <div key={p.id} onClick={() => idHandle(p.id)}>
            <Link to="/singleview">
              {p.id}, {p.title}, {p.description}, ${p.price}
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default Products;
