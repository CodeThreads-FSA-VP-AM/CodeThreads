import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDeleteProduct, fetchProducts } from "../api/api";
import { Product } from "./Interfaces";

type Props = {
  setProductId: (id: number) => void;
  user: any;
};

const Products: React.FC<Props> = ({ setProductId, user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [selectedId, setSelectedId] = useState(0);
  const [message, setMessage] = useState("");

  console.log(user.is_admin);

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
  }, [message]);

  const idHandle = (id: number) => {
    console.log(id);
    setProductId(id);
  };

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (
    e: any
  ) => {
    setProductId(e.target.value);
    setSelectedId(e.target.value);
  };

  const handleDelete = async () => {
    console.log(selectedId);
    console.log("delete me");
    const deletedProduct = await fetchDeleteProduct(selectedId);

    const filteredOrders = products.filter((p) => p.id !== selectedId);
    setProducts(filteredOrders);
    setMessage("product deleted");

    setTimeout(() => {
      setMessage("");
    }, 3000);

    console.log("product removed", deletedProduct);
  };

  return (
    <>
      <section className="py-6 bg-white sm:py-8 lg:py-12">
        <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
          {/* <!-- text - start --> */}
          <header className="mb-10 md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6">
              Product Collection
            </h2>

            <p className="max-w-screen-md mx-auto text-center text-gray-500 md:text-lg">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
              praesentium cumque iure dicta incidunt est ipsam, officia dolor
              fugit natus?
            </p>

            {user.is_admin && (
              <>
                <div className="flex items-center justify-center py-1">
                  <Link to="/addproduct" className="pr-52">
                    <button className="inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50">
                      add
                    </button>
                  </Link>

                  <select className="rounded" onChange={handleSelect}>
                    <option value="delete">delete product</option>
                    {products.map((p) => (
                      <option value={p.id} key={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>

                  <button
                    className="inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50"
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                  <span className="text-red-400">{message}</span>
                </div>
              </>
            )}
          </header>
          {/* <!-- text - end --> */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
            {/* <!-- product - start --> */}
            {loading ? (
              <div className="flex">
                <div className="flex items-center justify-center w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
              </div>
            ) : (
              products?.map((p: Product) => (
                <div key={p.id}>
                  <Link
                    to={`/products/${p.id}`}
                    className="relative block mb-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg group h-96 lg:mb-3"
                    onClick={() => idHandle(p.id)}
                  >
                    <img
                      src={p.front_url}
                      loading="lazy"
                      alt=""
                      className="object-cover object-center w-full h-full transition duration-200 group-hover:scale-110"
                    />

                    <div className="absolute flex gap-2 left-2 bottom-2">
                      {/* <span className="bg-red-500 text-white text-sm font-semibold tracking-wider uppercase rounded-r-lg px-3 py-1.5">-50%</span> */}
                      {p.tags.map((t: any) => {
                        return (
                          <span className="bg-white text-gray-800 text-sm font-bold tracking-wider uppercase rounded-lg px-3 py-1.5">
                            {t.name}
                          </span>
                        );
                      })}
                    </div>
                  </Link>

                  <div className="flex items-start justify-between gap-2 px-2">
                    <div className="flex flex-col">
                      <a
                        href="#"
                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl capitalize"
                      >
                        {p.title}
                      </a>
                      <span className="text-gray-500">by codeThreads</span>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="font-bold text-gray-600 lg:text-lg">
                        {" "}
                        £{p.price} GBP{" "}
                      </span>
                      {/* <span className="text-sm text-red-500 line-through">$39.99</span> */}
                    </div>
                  </div>
                </div>
              ))
            )}
            {/* <!-- product - end --> */}
          </div>
        </div>
      </section>
    </>

    // <>
    //   <section>
    //     <div classNameName="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
    //       <header>
    //         <h2 classNameName="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>

    //         <p classNameName="max-w-md mt-4 text-gray-500">
    //           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
    //           natus?
    //         </p>

    //         {user.is_admin && (
    //           <>
    //             <Link to="/addproduct" classNameName="flex justify-center">
    //               <button>add</button>
    //             </Link>

    //             <div>
    //               <select onChange={handleSelect}>
    //                 <option value="delete">delete product</option>
    //                 {products.map((p) => (
    //                   <option value={p.id} key={p.id}>
    //                     {p.title}
    //                   </option>
    //                 ))}
    //               </select>

    //               <button classNameName="px-1" onClick={handleDelete}>
    //                 delete
    //               </button>
    //               <span classNameName="text-red-400">{message}</span>
    //             </div>
    //           </>
    //         )}
    //       </header>

    //       <ul classNameName="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
    //         {/* map over this code */}

    //         {loading ? (
    //           // <div>Loading...</div>
    //           <div classNameName="flex">
    //             <div classNameName="flex items-center justify-center w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
    //           </div>
    //         ) : (
    //           products?.map((p: Product) => (
    //             <li key={p.id}>
    //               <Link to={`/products/${p.id}`} classNameName="block overflow-hidden group" onClick={() => idHandle(p.id)}>
    //                 <img
    //                   src={p.front_url}
    //                   alt=""
    //                   classNameName="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
    //                 />

    //                 <div classNameName="relative pt-3 bg-white">
    //                   <h3 classNameName="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">{p.title}</h3>

    //                   <p classNameName="mt-2">
    //                     <span classNameName="sr-only"> Regular Price </span>

    //                     <span classNameName="tracking-wider text-gray-900"> £{p.price} GBP </span>
    //                   </p>
    //                 </div>
    //               </Link>
    //             </li>
    //           ))
    //         )}
    //       </ul>
    //     </div>
    //   </section>
    // </>
  );
};

export default Products;
