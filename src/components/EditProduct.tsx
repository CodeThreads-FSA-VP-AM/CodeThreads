import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEditProduct } from "../api/api";
import Loader from "./Loader";

type Props = {
  product: any;
  productId: number;
  setProductId: (id: number) => void;
};

type Product = {
  productId: number;
  title: string;
  description: string;
  price: number;
  front_url: string;
  back_url: string;
  tags: string;
  small: number;
  medium: number;
  large: number;
  xlarge: number;
};

const EditProduct: React.FC<Props> = ({ product, productId, setProductId }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [front_url, setFront_url] = useState(product.front_url);
  const [back_url, setBack_url] = useState(product.back_url);
  const [tags, setTags] = useState("");

  const [small, setSmall] = useState(product.sizes[0].small);
  const [medium, setMedium] = useState(product.sizes[0].medium);
  const [large, setLarge] = useState(product.sizes[0].large);
  const [xlarge, setXlarge] = useState(product.sizes[0].xlarge);
  const [loading, setLoading] = useState<Boolean>(true);

  const history = useNavigate();

  const { id } = useParams();

  const handleEdit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const data: Product = {
      productId,
      title,
      description,
      price,
      front_url,
      back_url,
      tags,
      small,
      medium,
      large,
      xlarge,
    };
    const edit = await fetchEditProduct(data);
    console.log({ edit });
    setLoading(false);
    history(-1);
  };

  useEffect(() => {
    const getID = parseInt(id!);
    setLoading(false);
    setProductId(getID);
  }, [productId]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="bg-white ">
          <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
            <h2 className="mb-4 text-xl font-bold">Edit product</h2>
            <form onSubmit={handleEdit}>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={title}
                    id="name"
                    className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Type product name"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={tags}
                    id="tags"
                    className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Tags"
                    onChange={(e) => setTags(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={price}
                    id="price"
                    className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                    placeholder="$2999"
                    onChange={(e) => setPrice(e.target.valueAsNumber)}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium">Front Image URL</label>
                  <input
                    type="text"
                    name="front_url"
                    value={front_url}
                    id="front_url"
                    className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                    placeholder="front_url"
                    onChange={(e) => setFront_url(e.target.value)}
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-2 text-sm font-medium">Back Image URL</label>
                  <input
                    type="text"
                    name="back_url"
                    value={back_url}
                    id="back_url"
                    className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                    placeholder="back_url"
                    onChange={(e) => setBack_url(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="flex justify-between space-x-4">
                    <div className="w-40">
                      <label className="block mb-2 text-sm font-medium">Small</label>
                      <input
                        type="number"
                        name="small"
                        value={small}
                        id="small"
                        className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => setSmall(e.target.valueAsNumber)}
                      />
                    </div>
                    <div className="w-40">
                      <label className="block mb-2 text-sm font-medium">Medium</label>
                      <input
                        type="number"
                        name="medium"
                        value={medium}
                        id="medium"
                        className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => setMedium(e.target.valueAsNumber)}
                      />
                    </div>
                    <div className="w-40">
                      <label className="block mb-2 text-sm font-medium">Large</label>
                      <input
                        type="number"
                        name="large"
                        value={large}
                        id="large"
                        className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => setLarge(e.target.valueAsNumber)}
                      />
                    </div>
                    <div className="w-40">
                      <label className="block mb-2 text-sm font-medium">X-Large</label>
                      <input
                        type="number"
                        name="xlarge"
                        value={xlarge}
                        id="xlarge"
                        className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                        onChange={(e) => setXlarge(e.target.valueAsNumber)}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium">Description</label>
                  <textarea
                    id="description"
                    rows={8}
                    value={description}
                    className="block p-2.5 w-full text-sm   rounded-lg border focus:ring-primary-500 focus:border-primary-500 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your description here"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50">
                Edit product
              </button>
              <button
                type="button"
                className="inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50"
                onClick={() => history(-1)}>
                go back
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default EditProduct;
