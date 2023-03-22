import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchDeleteProduct, fetchProducts } from "../api/api";
import AddProduct from "./AddProduct";
import Footer from "./Footer";
import { Product } from "./Interfaces";
import Loader from "./Loader";
import Modal from "./Modal";

type Props = {
  setProductId: (id: number) => void;
  user: any;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
  products: any;
  setProducts: any;
};

const Products: React.FC<Props> = ({
  setProductId,
  user,
  setSuccess,
  setSuccessMsg,
  setSuccessTitle,
  products,
  setProducts,
}) => {
  // const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [selectedId, setSelectedId] = useState(0);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products.filter((p: any) => {
    if (search === "") {
      return p;
    } else if (p.title.toLowerCase().includes(search)) {
      return p.title;
    } else if (p.tags.some((t: any) => t.name.toLowerCase() === search)) {
      return p;
    }
  });

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  // const loadProducts = async () => {
  //   try {
  //     const allProducts = await fetchProducts();
  //     console.log(allProducts);
  //     setProducts(allProducts);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // useEffect(() => {
  //   loadProducts();
  // }, []);

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

    const filteredOrders = products.filter((p: any) => p.id !== selectedId);
    setProducts(filteredOrders);
    setMessage("product deleted");
    setSuccess(true);
    setSuccessTitle("Success!");
    setSuccessMsg("Product deleted!");
    setShowModal(false);
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
              From everyday essentials to statement pieces, our selection
              features something for every occasion. Start exploring now and
              find your new favorite outfit!
            </p>

            {user.is_admin && (
              <>
                <div className="flex items-center flex-col justify-center py-1">
                  <select
                    className="rounded-md mr-1 capitalize"
                    onChange={handleSelect}
                  >
                    <option value="delete">delete product</option>
                    {products.map((p: any) => (
                      <option value={p.id} key={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <div className="p-2">
                    <AddProduct
                      setSuccess={setSuccess}
                      setSuccessTitle={setSuccessTitle}
                      setSuccessMsg={setSuccessMsg}
                    />
                    <Modal
                      showModal={showModal}
                      setShowModal={setShowModal}
                      handleSubmit={handleDelete}
                      modalTitle={"Delete product"}
                      modalTxt={"Delete product"}
                      submitBtnText="Delete"
                    >
                      <div>
                        <h1>Are you sure you want to delete this product?</h1>
                      </div>
                    </Modal>
                  </div>
                  <span className="text-red-400">{message}</span>
                </div>
              </>
            )}
            <div className="flex items-center justify-center pt-9 ">
              <div className="relative mb-6 pointer-events-auto">
                <svg
                  className="absolute text-slate-800 h-6 w-6 ml-[5px]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                className="w-full max-w-xs p-3 pl-8 border border-gray-800 rounded input input-bordered input-secondary"
                value={search}
                placeholder="Search"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
          </header>
          {/* <!-- text - end --> */}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8">
            {/* <!-- product - start --> */}
            {loading ? (
              <Loader />
            ) : (
              filteredProducts
                .slice(indexOfFirstProduct, indexOfLastProduct)
                ?.map((p: Product) => (
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
                        {p.tags?.map((t: any) => {
                          return (
                            <span
                              key={t.id}
                              className="bg-white text-gray-800 text-sm font-bold tracking-wider uppercase rounded-lg px-3 py-1.5"
                            >
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
                          className="text-lg font-bold text-gray-800 capitalize transition duration-100 hover:text-gray-500 lg:text-xl"
                        >
                          {p.title}
                        </a>
                        <span className="text-gray-500">by codeThreads</span>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="font-bold text-gray-600 lg:text-lg">
                          {" "}
                          ${p.price} USD{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
            )}
            {/* <!-- product - end --> */}
          </div>
          {/* pagination */}
          {totalProducts > 0 && (
            <nav
              className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6"
              aria-label="Pagination"
            >
              <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstProduct + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastProduct, totalProducts)}
                  </span>{" "}
                  of <span className="font-medium">{totalProducts}</span>{" "}
                  products
                </p>
              </div>
              <div className="flex justify-center flex-1 sm:justify-end">
                <nav className="flex gap-2" aria-label="Pagination">
                  <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    className={`px-3 py-1 rounded-md transition duration-150 ease-in-out ${
                      currentPage === 1
                        ? "text-gray-400"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageClick(i + 1)}
                      className={`px-3 py-1 rounded-md transition duration-150 ease-in-out ${
                        i + 1 === currentPage
                          ? "bg-blue-500 text-gray-50"
                          : "text-gray-500 hover:bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    className={`px-3 py-1 rounded-md transition duration-150 ease-in-out ${
                      currentPage === totalPages
                        ? "text-gray-400"
                        : "text-gray-500 hover:bg-gray-200"
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </nav>
              </div>
            </nav>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Products;
