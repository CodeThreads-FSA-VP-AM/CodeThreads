import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchEditProduct, fetchProductById } from "../api/api";

type Props = {
  product: any;
};

type Product = {
  productId: number;
  title: string;
  description: string;
  price: number;
  front_url: string;
  back_url: string;
};

const EditProduct: React.FC<Props> = ({ product }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(99.99);
  const [front_url, setFront_url] = useState(product.front_url);
  const [back_url, setBack_url] = useState(product.back_url);
  const [productId, setProductId] = useState(0);

  // get all products
  // be able to select a product and get the id
  // send the data to fetchEditProduct

  const { id } = useParams();

  console.log({ productId });
  console.log({ product });

  const handleCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("triggered");
    e.preventDefault();
    const data: Product = { productId, title, description, price, front_url, back_url };
    console.log(data);
    const edit = await fetchEditProduct(data);
    console.log({ edit });
  };

  useEffect(() => {
    const getID = parseInt(id!);
    setProductId(getID);
  }, [productId]);

  return (
    <div>
      <h1>AddProduct</h1>

      <form onSubmit={handleCreate}>
        <label>title</label>
        <input className="bg-gray-200 border" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>description</label>
        <input className="bg-gray-200 border" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>price</label>
        <input className="bg-gray-200 border" type="number" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
        <label>front_url</label>
        <input className="bg-gray-200 border" type="text" value={front_url} onChange={(e) => setFront_url(e.target.value)} />
        <label>back_url</label>
        <input className="bg-gray-200 border" type="text" value={back_url} onChange={(e) => setBack_url(e.target.value)} />

        <button className="bg-slate-500" type="submit">
          edit
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
