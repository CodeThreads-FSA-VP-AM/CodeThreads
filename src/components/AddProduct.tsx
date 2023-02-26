import React, { useState } from "react";
import { fetchCreateProduct } from "../api/api";

type Props = {
  title: string;
  description: string;
  price: number;
  front_url: string;
  back_url: string;
};

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [front_url, setFront_url] = useState("");
  const [back_url, setBack_url] = useState("");

  const handleCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("triggered");
    e.preventDefault();
    const data: Props = { title, description, price, front_url, back_url };
    console.log(data);
    const create = await fetchCreateProduct(data);
    console.log({ create });
  };

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
        <input className="bg-gray-200 border" type="text" value={front_url} onChange={(e) => setFront_url(e.target.value)} required />
        <label>back_url</label>
        <input className="bg-gray-200 border" type="text" value={back_url} onChange={(e) => setBack_url(e.target.value)} required />

        <button className="bg-slate-500" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default AddProduct;