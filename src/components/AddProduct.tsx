import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateProduct } from "../api/api";
import Modal from "./Modal";

type Props = {
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

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(2999.99);
  const [front_url, setFront_url] = useState(
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );
  const [back_url, setBack_url] = useState(
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );
  const [tags, setTags] = useState("");

  const [small, setSmall] = useState(1);
  const [medium, setMedium] = useState(1);
  const [large, setLarge] = useState(1);
  const [xlarge, setXlarge] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const history = useNavigate();

  const handleCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("triggered");
    e.preventDefault();
    const data: Props = {
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
    console.log(data);
    const create = await fetchCreateProduct(data);
    console.log({ create });

    history(-1);
  };

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      handleSubmit={handleCreate}
      modalTitle={"Add product"}
      modalTxt={"Add product"}
      submitBtnText={"Add"}
    >
      <section className="bg-white ">
        <div className="max-w-2xl px-4 py-8 mx-auto lg:py-16">
          <h2 className="mb-4 text-xl font-bold">Add a new product</h2>
          <form onSubmit={handleCreate}>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={title}
                  id="name"
                  className="text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Type product name"
                  onChange={(e) => setTitle(e.target.value)}
                  required
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
                  required
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
                  required
                  onChange={(e) => setPrice(e.target.valueAsNumber)}
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium">
                  Front Image URL
                </label>
                <input
                  type="text"
                  name="front_url"
                  value={front_url}
                  id="front_url"
                  className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                  placeholder="front_url"
                  onChange={(e) => setFront_url(e.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <label className="block mb-2 text-sm font-medium">
                  Back Image URL
                </label>
                <input
                  type="text"
                  name="back_url"
                  value={back_url}
                  id="back_url"
                  className="border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                  placeholder="back_url"
                  onChange={(e) => setBack_url(e.target.value)}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <div className="flex justify-between space-x-4">
                  <div className="w-40">
                    <label className="block mb-2 text-sm font-medium">
                      Small
                    </label>
                    <input
                      type="number"
                      name="small"
                      value={small}
                      id="small"
                      className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                      placeholder="1"
                      required
                      onChange={(e) => setSmall(e.target.valueAsNumber)}
                    />
                  </div>
                  <div className="w-40">
                    <label className="block mb-2 text-sm font-medium">
                      Medium
                    </label>
                    <input
                      type="number"
                      name="medium"
                      value={medium}
                      id="medium"
                      className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                      placeholder="1"
                      required
                      onChange={(e) => setMedium(e.target.valueAsNumber)}
                    />
                  </div>
                  <div className="w-40">
                    <label className="block mb-2 text-sm font-medium">
                      Large
                    </label>
                    <input
                      type="number"
                      name="large"
                      value={large}
                      id="large"
                      className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                      placeholder="1"
                      required
                      onChange={(e) => setLarge(e.target.valueAsNumber)}
                    />
                  </div>
                  <div className="w-40">
                    <label className="block mb-2 text-sm font-medium">
                      X-Large
                    </label>
                    <input
                      type="number"
                      name="xlarge"
                      value={xlarge}
                      id="xlarge"
                      className=" text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400  focus:ring-primary-500 focus:border-primary-500"
                      placeholder="1"
                      required
                      onChange={(e) => setXlarge(e.target.valueAsNumber)}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block mb-2 text-sm font-medium">
                  Description
                </label>
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
            {/* <button
              type="submit"
              className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50"
            >
              Add product
            </button>
            <button
              type="button"
              className="inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50"
              onClick={() => history(-1)}
            >
              go back
            </button> */}
          </form>
        </div>
      </section>
    </Modal>
  );
};

export default AddProduct;
