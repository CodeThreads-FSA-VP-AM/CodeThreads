import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCreateProduct } from "../api/api";

type Props = {
  title: string;
  description: string;
  price: number;
  front_url: string;
  back_url: string;
  tags: string;
};

const AddProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [front_url, setFront_url] = useState(
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );
  const [back_url, setBack_url] = useState(
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  );
  const [tags, setTags] = useState("");

  const history = useNavigate();

  const handleCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    console.log("triggered");
    e.preventDefault();
    const data: Props = { title, description, price, front_url, back_url, tags };
    console.log(data);
    const create = await fetchCreateProduct(data);
    console.log({ create });
    history(-1);
  };

  return (
    <div>
      <h1>AddProduct</h1>

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
          create
        </button>
      </form>
      <button onClick={() => history(-1)}>go back</button>
    </div>
  );
};

export default AddProduct;
