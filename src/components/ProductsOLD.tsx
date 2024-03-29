import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDeleteProduct, fetchProducts } from "../api/api";
import { Product } from "./Interfaces";

type Props = {
  setProductId: (id: number) => void;
  user: any;
};

const Products2: React.FC<Props> = ({ setProductId, user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [selectedId, setSelectedId] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts();

        setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadProducts();
  }, [message]);

  const idHandle = (id: number) => {
    setProductId(id);
  };

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    e: any
  ) => {
    setProductId(e.target.value);
    setSelectedId(e.target.value);
  };

  const handleDelete = async () => {
    const deletedProduct = await fetchDeleteProduct(selectedId);

    const filteredOrders = products.filter((p) => p.id !== selectedId);
    setProducts(filteredOrders);
    setMessage("product deleted");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <>
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Product Collection
            </h2>

            <p className="max-w-md mt-4 text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>

            {user.is_admin && (
              <>
                <Link to="/addproduct" className="flex justify-center">
                  <button>add</button>
                </Link>

                <div>
                  <select onChange={handleSelect}>
                    <option value="delete">delete product</option>
                    {products.map((p) => (
                      <option value={p.id} key={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>

                  <button className="px-1" onClick={handleDelete}>
                    delete
                  </button>
                  <span className="text-red-400">{message}</span>
                </div>
              </>
            )}
          </header>

          <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* map over this code */}

            {loading ? (
              // <div>Loading...</div>
              <div className="flex">
                <div className="flex items-center justify-center w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
              </div>
            ) : (
              products?.map((p: Product) => (
                <li key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="block overflow-hidden group"
                    onClick={() => idHandle(p.id)}
                  >
                    <img
                      src={p.front_url}
                      alt=""
                      className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                    />

                    <div className="relative pt-3 bg-white">
                      <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                        {p.title}
                      </h3>

                      <p className="mt-2">
                        <span className="sr-only"> Regular Price </span>

                        <span className="tracking-wider text-gray-900">
                          {" "}
                          £{p.price} GBP{" "}
                        </span>
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

export default Products2;
