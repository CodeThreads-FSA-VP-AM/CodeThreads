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

  const idHandle = (id: number) => {
    console.log(id);
    setProductId(id);
  };

  return (
    <>
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

            <p className="max-w-md mt-4 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
              natus?
            </p>

            <Link to="/addproduct" className="flex justify-center">
              <button>add</button>
            </Link>
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* map over this code */}

            {loading ? (
              <div>Loading...</div>
            ) : (
              products?.map((p: Product) => (
                <li key={p.id}>
                  <Link to={`/products/${p.id}`} className="block overflow-hidden group" onClick={() => idHandle(p.id)}>
                    <img
                      src={p.front_url}
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />

                    <div className="relative pt-3 bg-white">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">{p.title}</h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-gray-900"> £{p.price} GBP </span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Products;
