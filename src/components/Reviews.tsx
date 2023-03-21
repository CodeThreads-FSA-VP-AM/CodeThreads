import React, { useEffect, useState } from "react";
import { getAllReviews, fetchUser, deleteReview } from "../api/api";
import { Review, User } from "./Interfaces";
import EditReviews from "./EditReviews";
import Loader from "./Loader";
import Modal from "./Modal";

type Props = {
  product_id: number;
  token: string;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
  setSuccess: any;
  setSuccessTitle: any;
  setSuccessMsg: any;
};

const Reviews = (props: Props) => {
  const [user, setUser] = useState("");
  const [userId, setUserId] = useState(0);
  const [loading, setLoading] = useState<Boolean>(true);
  const [showModal, setShowModal] = useState(false);

  const handleDeleteReview = async (reviewId: number) => {
    const token = props.token;
    try {
      const res = await deleteReview({ reviewId, token });
      console.log(res);
      props.setReviews(
        props.reviews.filter((review) => review.id !== reviewId)
      );
      setShowModal(false);
      props.setSuccess(true);
      props.setSuccessTitle("Success!");
      props.setSuccessMsg("Review deleted!");
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUser = async (data: User) => {
      const { token } = data;
      try {
        const userInfo = await fetchUser({ token });
        setUser(userInfo.username);
        setUserId(userInfo.id);
      } catch (error) {
        console.error(error);
      }
    };
    const token = props.token;
    getUser({ token });
  }, [user]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const allReviews = await getAllReviews();
        console.log(allReviews);
        props.setReviews(allReviews);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getReviews();
  }, []);
  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold sm:text-2xl">Customer Reviews</h2>

          <div className="flex items-center gap-4 mt-4">
            <p className="text-3xl font-medium">
              3.8
              <span className="sr-only"> Average review score </span>
            </p>

            <div>
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-200"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <p className="mt-0.5 text-xs text-gray-500">
                Based on 48 reviews
              </p>
            </div>
          </div>

          {props.reviews
            .filter((r: Review) => r.product_id === props.product_id)
            .map((r: Review, idx) => (
              <div
                className="grid grid-cols-1 mt-8 gap-x-16 gap-y-12 lg:grid-cols-2"
                key={idx}
              >
                <blockquote>
                  <header className="sm:flex sm:items-center sm:gap-4">
                    <div className="flex">
                      {r.rating}/5
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 ${
                          r.rating > 0 ? "text-yellow-400" : "text-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 ${
                          r.rating >= 2 ? "text-yellow-400" : "text-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 ${
                          r.rating >= 3 ? "text-yellow-400" : "text-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 ${
                          r.rating >= 4 ? "text-yellow-400" : "text-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 ${
                          r.rating >= 5 ? "text-yellow-400" : "text-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>

                    <p className="mt-2 font-medium sm:mt-0">{r.title}</p>
                  </header>

                  <p className="mt-2 text-gray-700">{r.description}</p>

                  {r.users_id === userId && (
                    <div className="flex gap-6">
                      <div className="">
                        <EditReviews
                          description={r.description}
                          title={r.title}
                          rating={r.rating}
                          reviewId={r.id}
                          reviews={props.reviews}
                          setReviews={props.setReviews}
                          setSuccess={props.setSuccess}
                          setSuccessTitle={props.setSuccessTitle}
                          setSuccessMsg={props.setSuccessMsg}
                        />
                      </div>
                      <Modal
                        showModal={showModal}
                        setShowModal={setShowModal}
                        handleSubmit={() => handleDeleteReview(r.id)}
                        modalTitle={"Delete review"}
                        modalTxt={"Delete review"}
                        submitBtnText="Delete"
                      >
                        <div>
                          <h1>Are you sure you want to delete this review?</h1>
                        </div>
                      </Modal>
                    </div>
                  )}
                </blockquote>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default Reviews;
