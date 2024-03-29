import React, { FC, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  fetchProductById,
  createOrder,
  fetchDeleteProduct,
  createWishlist,
} from "../api/api";
import AddReview from "./AddReview";
import { Product, Review } from "./Interfaces";
import Loader from "./Loader";
import Reviews from "./Reviews";

type Props = {
  quantity: number;
  user: any;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
  setWishlist: any;
  wishlist: any;
  setOrders: any;
  orders: any;
};

const SingleView: FC<Props> = ({
  user,
  setSuccess,
  setSuccessMsg,
  setSuccessTitle,
  setWishlist,
  wishlist,
  orders,
  setOrders,
}) => {
  const [product, setProduct] = useState<Product>();
  const [token, setToken] = useState("");
  const [productId, setProductId] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  type String = {
    id: string;
  };
  const { id } = useParams<String>();

  const getProduct = async () => {
    try {
      const fetchedProduct = await fetchProductById(productId);
      setProduct(fetchedProduct);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const addProductToCart: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        product_id: productId,
        quantity: quantity,
        token: token,
      });
      setSuccess(true);
      setSuccessTitle("Success!");
      setSuccessMsg("Item added to cart!");

      setOrders([...orders, res]);
    } catch (error) {
      console.error();
    }
  };

  const addProductToWishlist: React.MouseEventHandler<
    HTMLButtonElement
  > = async (e) => {
    e.preventDefault();

    try {
      const res = await createWishlist({
        product_id: productId,
        quantity: 1,
        token,
      });
      setSuccess(true);
      setSuccessTitle("Success!");
      setSuccessMsg("Item added to wishlist!");

      setWishlist([...wishlist, res]);
    } catch (error) {
      console.error(error);
    }
  };

  const guestAddToCart: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    try {
      let cart = sessionStorage.getItem("cart") || "[]";
      let cartItems = JSON.parse(cart);
      const existingItem = cartItems.find(
        (i: { id: number }) => i.id === productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push({ id: productId, quantity: 1 });
      }
      sessionStorage.setItem("cart", JSON.stringify(cartItems));
      setSuccess(true);
      setSuccessTitle("Success!");
      setSuccessMsg("Item added to cart!");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async () => {
    const deletedProduct = await fetchDeleteProduct(productId);

    navigate(-1);
  };

  useEffect(() => {
    if (productId !== 0) {
      getProduct();
    }
    setToken(localStorage.getItem("token") ?? "");
    const getID = parseInt(id!);
    setProductId(getID);
  }, [productId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section>
          <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
            <div className="flex m-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-left"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <polyline points="15 6 9 12 15 18" />
              </svg>
              <button
                className="pl-2 text-sm leading-none hover:underline text-indigo-900"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
            <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
              <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
                <img
                  alt="Tee"
                  src={product?.front_url}
                  className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
                />
                {/* <img
                  alt="Tee"
                  src={product?.back_url}
                  className="h-20 max-w-full rounded-lg"
                /> */}
              </div>
              <div className="sticky top-0">
                <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                  Pre Order
                </strong>

                {user.is_admin && (
                  <div className="flex">
                    <Link to={`/edit/${product?.id}`}>
                      <button className="capitalize mx-2 hover:underline text-indigo-600">
                        edit
                      </button>
                    </Link>
                    <div>
                      <button
                        onClick={deleteProduct}
                        className="capitalize hover:underline text-red-600"
                      >
                        delete
                      </button>
                    </div>
                  </div>
                )}
                <div className="flex justify-between mt-8">
                  <div className="max-w-[35ch] space-y-2">
                    <h1 className="text-xl font-bold capitalize sm:text-2xl">
                      {product?.title}
                    </h1>
                    <p className="text-sm">Highest Rated Product</p>

                    <div className="-ml-0.5 flex">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="w-5 h-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="w-5 h-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="w-5 h-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>

                      <svg
                        className="w-5 h-5 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {token && (
                        <AddReview
                          token={token}
                          product_id={productId}
                          reviews={reviews}
                          setReviews={setReviews}
                          user={user.username}
                          setSuccess={setSuccess}
                          setSuccessTitle={setSuccessTitle}
                          setSuccessMsg={setSuccessMsg}
                        />
                      )}
                    </div>
                  </div>

                  <p className="text-lg font-bold">${product?.price} USD</p>
                </div>
                <div className="mt-4">
                  <div className="prose max-w-none capitalize">
                    <p>{product?.description}</p>
                  </div>
                </div>
                <form className="mt-8">
                  <fieldset className="mt-4">
                    <legend className="mb-1 text-sm font-medium">Size</legend>

                    <div className="flex flex-wrap gap-1">
                      <label htmlFor="size_xs" className="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_xs"
                          className="sr-only peer"
                        />

                        <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                          XS
                        </span>
                      </label>

                      <label htmlFor="size_s" className="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_s"
                          className="sr-only peer"
                        />

                        <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                          S
                        </span>
                      </label>

                      <label htmlFor="size_m" className="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_m"
                          className="sr-only peer"
                        />

                        <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                          M
                        </span>
                      </label>

                      <label htmlFor="size_l" className="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_l"
                          className="sr-only peer"
                        />

                        <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                          L
                        </span>
                      </label>

                      <label htmlFor="size_xl" className="cursor-pointer">
                        <input
                          type="radio"
                          name="size"
                          id="size_xl"
                          className="sr-only peer"
                        />

                        <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                          XL
                        </span>
                      </label>
                    </div>
                  </fieldset>

                  <div className="flex gap-4 mt-8">
                    <div>
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-medium text-gray-700"
                        aria-required="true"
                      >
                        Quantity
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        value={quantity}
                        defaultValue={1}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                    {/* remove disabled to use */}

                    {token ? (
                      <>
                        <button
                          type="submit"
                          onClick={addProductToCart}
                          className={`block px-5 py-3 text-sm font-medium text-white rounded hover:bg-green-500 ${
                            product?.tags.some(
                              (tag: { name: string }) => tag.name === "soldout"
                            )
                              ? "bg-red-600 hover:bg-red-500"
                              : "bg-green-600"
                          }`}
                          disabled={product?.tags.some(
                            (tag: { name: string }) => tag.name === "soldout"
                          )}
                        >
                          {product?.tags.some(
                            (tag: { name: string }) => tag.name === "soldout"
                          )
                            ? "Sold Out"
                            : "Add to Cart"}
                        </button>
                        <button
                          type="submit"
                          onClick={addProductToWishlist}
                          className="block px-5 py-3 text-xs font-medium text-white bg-indigo-600 rounded hover:bg-green-500"
                        >
                          Add to wishlist
                        </button>
                      </>
                    ) : (
                      <button
                        type="submit"
                        onClick={guestAddToCart}
                        className={`block px-5 py-3 text-xs font-medium text-white rounded hover:bg-green-500 ${
                          product?.tags.some(
                            (tag: { name: string }) => tag.name === "soldout"
                          )
                            ? "bg-red-600 hover:bg-red-500"
                            : "bg-green-600"
                        }`}
                        disabled={product?.tags.some(
                          (tag: { name: string }) => tag.name === "soldout"
                        )}
                      >
                        {product?.tags.some(
                          (tag: { name: string }) => tag.name === "soldout"
                        )
                          ? "Sold Out"
                          : "Add to Cart"}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div>
            <Reviews
              product_id={productId}
              token={token}
              reviews={reviews}
              setReviews={setReviews}
              setSuccess={setSuccess}
              setSuccessTitle={setSuccessTitle}
              setSuccessMsg={setSuccessMsg}
            />
          </div>
        </section>
      )}
    </>
  );
};

export default SingleView;
