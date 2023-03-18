import React, { useState, useEffect } from "react";
import { editReview } from "../api/api";
import { Review } from "./Interfaces";
import Modal from "./Modal";

type Props = {
  title: string;
  description: string;
  rating: number;
  reviewId: number;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
};
type EditReviews = {
  title: string;
  description: string;
  rating: number;
  token: string;
  reviewId: number;
};

const EditReviews = (props: Props) => {
  const [title, setTitle] = useState(props.title);
  const [rating, setRating] = useState(props.rating);
  const [description, setDescription] = useState(props.description);
  const [showModal, setShowModal] = useState(false);

  const [token, setToken] = useState("");

  const handleEditReview: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const data: EditReviews = {
        title,
        description,
        rating,
        token,
        reviewId: props.reviewId,
      };
      const editedReview = await editReview(data);
      const editedReviewIndex = props.reviews.findIndex((review) => review.id === props.reviewId);
      const updatedReviews = [...props.reviews];
      updatedReviews[editedReviewIndex] = editedReview;
      props.setReviews(updatedReviews);
      props.setSuccess(true);
      props.setSuccessTitle("Success!");
      props.setSuccessMsg("Review has been edited!");
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token") ?? "";
    setToken(token);
  }, [token]);
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      handleSubmit={handleEditReview}
      modalTitle={"Edit review"}
      modalTxt={"Edit review"}
      submitBtnText={"Edit"}>
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                    aria-required="true">
                    Title<span className="text-[#F70000]">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="col-span-6 sm:col-span-1">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                    aria-required="true">
                    Rating<span className="text-[#F70000]">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    value={rating}
                    defaultValue={1}
                    onChange={(e) => setRating(parseInt(e.target.value))}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>

                <div className="col-span-4">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditReviews;
