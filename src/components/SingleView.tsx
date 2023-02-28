import React, { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchProductById, createOrder } from "../api/api";
import { Product } from "./Interfaces";
import Reviews from "./Reviews";

type Props = {
  quantity: number;
};

const SingleView: FC<Props> = ({}) => {
  // need to pass productId from products component
  // then fetch the product and set the product id
  // then you can render the page with the required information
  const [product, setProduct] = useState<Product>();
  const [token, setToken] = useState("");
  const [productId, setProductId] = useState(0);

  console.log(productId);
  console.log(product);

  type String = {
    id: string;
  };
  const { id } = useParams<String>();

  const getProduct = async () => {
    const fetchedProduct = await fetchProductById(productId);
    setProduct(fetchedProduct);
  };

  const addProductToCart: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await createOrder({
        product_id: productId,
        quantity: 1,
        token: token,
      });
      console.log(res);
    } catch (error) {
      console.error();
    }
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
      <section>
        <div className="relative max-w-screen-xl px-4 py-8 mx-auto">
          <div className="grid items-start grid-cols-1 gap-8 md:grid-cols-2">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
              <img alt="Tee" src={product?.front_url} className="h-72 w-full rounded-xl object-cover lg:h-[540px]" />

              {/* <div className="grid grid-cols-2 gap-4 lg:mt-4">
                <img alt="Tee" src={product?.back_url} className="h-1 w-full rounded-xl object-cover lg:h-[540px]" />
              </div> */}
            </div>

            <div className="sticky top-0">
              <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
                Pre Order
              </strong>
              <Link to={`/edit/${product?.id}`}>
                <button className="mx-2">edit</button>
              </Link>

              <div className="flex justify-between mt-8">
                <div className="max-w-[35ch] space-y-2">
                  <h1 className="text-xl font-bold sm:text-2xl">{product?.title}</h1>

                  <p className="text-sm">Highest Rated Product</p>

                  <div className="-ml-0.5 flex">
                    <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg className="w-5 h-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg className="w-5 h-5 text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <button className="ml-2 text-xs underline text-blue-400">Add Review</button>
                  </div>
                </div>

                <p className="text-lg font-bold">£{product?.price} GBP</p>
              </div>

              <div className="mt-4">
                <div className="prose max-w-none">
                  <p>{product?.description}</p>
                </div>

                {/* <button className="mt-2 text-sm font-medium underline">Read More</button> */}
              </div>

              <form className="mt-8">
                <fieldset>
                  <legend className="mb-1 text-sm font-medium">Color</legend>

                  <div className="flex flex-wrap gap-1">
                    <label htmlFor="color_tt" className="cursor-pointer">
                      <input type="radio" name="color" id="color_tt" className="sr-only peer" />

                      <span className="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        Texas Tea
                      </span>
                    </label>

                    <label htmlFor="color_fr" className="cursor-pointer">
                      <input type="radio" name="color" id="color_fr" className="sr-only peer" />

                      <span className="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        Fiesta Red
                      </span>
                    </label>

                    <label htmlFor="color_cb" className="cursor-pointer">
                      <input type="radio" name="color" id="color_cb" className="sr-only peer" />

                      <span className="inline-block px-3 py-1 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        Cobalt Blue
                      </span>
                    </label>
                  </div>
                </fieldset>

                <fieldset className="mt-4">
                  <legend className="mb-1 text-sm font-medium">Size</legend>

                  <div className="flex flex-wrap gap-1">
                    <label htmlFor="size_xs" className="cursor-pointer">
                      <input type="radio" name="size" id="size_xs" className="sr-only peer" />

                      <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        XS
                      </span>
                    </label>

                    <label htmlFor="size_s" className="cursor-pointer">
                      <input type="radio" name="size" id="size_s" className="sr-only peer" />

                      <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        S
                      </span>
                    </label>

                    <label htmlFor="size_m" className="cursor-pointer">
                      <input type="radio" name="size" id="size_m" className="sr-only peer" />

                      <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        M
                      </span>
                    </label>

                    <label htmlFor="size_l" className="cursor-pointer">
                      <input type="radio" name="size" id="size_l" className="sr-only peer" />

                      <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        L
                      </span>
                    </label>

                    <label htmlFor="size_xl" className="cursor-pointer">
                      <input type="radio" name="size" id="size_xl" className="sr-only peer" />

                      <span className="inline-flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full group peer-checked:bg-black peer-checked:text-white">
                        XL
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div className="flex gap-4 mt-8">
                  <div>
                    <label htmlFor="quantity" className="sr-only">
                      Qty
                    </label>

                    <input
                      type="number"
                      id="quantity"
                      min="1"
                      value="1"
                      className="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  {/* remove disabled to use */}
                  <button
                    type="submit"
                    onClick={addProductToCart}
                    className="block px-5 py-3 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-500">
                    Add to Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div>
          <Reviews />
        </div>
      </section>
    </>
  );
};

export default SingleView;
