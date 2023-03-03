import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editReview } from "../api/api";

type Props = {
  title: string;
  description: string;
  rating: number;
  reviewId: number;
};
type EditReviews = {
  title: string;
  description: string;
  rating: number;
  token: string;
  reviewId: number;
};

const EditReviews = (props: Props) => {
  console.log(props);
  const [title, setTitle] = useState(props.title);
  const [rating, setRating] = useState(props.rating);
  const [description, setDescription] = useState(props.description);
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  const handleEditReview: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    const data: EditReviews = {
      title,
      description,
      rating,
      token,
      reviewId: props.reviewId,
    };
    console.log(data);
    const editReviews = await editReview(data);
    // navigate(-1);
    console.log(editReviews);
  };

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    setToken(token);
  }, [token]);
  return (
    <div className="mt-5 md:col-span-2 md:mt-0">
      <form onSubmit={handleEditReview}>
        <div className="overflow-hidden shadow sm:rounded-md">
          <div className="bg-white px-4 py-5 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                  aria-required="true"
                >
                  Title<span className="text-[#F70000]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="col-span-6 sm:col-span-1">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                  aria-required="true"
                >
                  Rating<span className="text-[#F70000]">*</span>
                </label>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  value={rating}
                  defaultValue={1}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>

              <div className="col-span-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  autoComplete="description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-left sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditReviews;
