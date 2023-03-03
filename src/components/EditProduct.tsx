import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchEditProduct } from "../api/api";

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
};

const EditProduct: React.FC<Props> = ({ product, productId, setProductId }) => {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [front_url, setFront_url] = useState(product.front_url);
  const [back_url, setBack_url] = useState(product.back_url);
  const [tags, setTags] = useState("");
  // const [productId, setProductId] = useState(0);
  // const productId = product.id;
  // get all products
  // be able to select a product and get the id
  // send the data to fetchEditProduct

  const history = useNavigate();

  const { id } = useParams();

  console.log({ id });
  console.log({ productId });
  console.log({ product });

  const handleCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("triggered");
    e.preventDefault();
    const data: Product = { productId, title, description, price, front_url, back_url, tags };
    console.log(data);
    const edit = await fetchEditProduct(data);
    console.log({ edit });
    history(-1);
  };

  useEffect(() => {
    const getID = parseInt(id!);
    setProductId(getID);
  }, [productId]);

  return (
    <div>
      <h1>Edit Product</h1>

      <form onSubmit={handleCreate}>
        <label>title</label>
        <input className="mx-1 bg-gray-200 border" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>description</label>
        <input className="mx-1 bg-gray-200 border" type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <label>price</label>
        <input className="mx-1 bg-gray-200 border" type="number" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
        <label>front_url</label>
        <input className="mx-1 bg-gray-200 border" type="text" value={front_url} onChange={(e) => setFront_url(e.target.value)} />
        <label>back_url</label>
        <input className="mx-1 bg-gray-200 border" type="text" value={back_url} onChange={(e) => setBack_url(e.target.value)} />
        <label>tags</label>
        <input className="mx-1 bg-gray-200 border" type="text" value={tags} onChange={(e) => setTags(e.target.value)} />

        <button className="bg-slate-500" type="submit">
          edit
        </button>
      </form>
      <div className="flex">
        <button className="flex justify-center" onClick={() => history(-1)}>
          go back
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
