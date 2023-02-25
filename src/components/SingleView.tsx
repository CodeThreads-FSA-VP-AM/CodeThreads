import React, { FC, useState, useEffect } from "react";
import { fetchProductById } from "../api/api";
import { Product } from "./Interfaces";

type Props = {
  productId: number;
};

const SingleView: FC<Props> = ({ productId }) => {
  // need to pass productId from products component
  // then fetch the product and set the product id
  // then you can render the page with the required information
  const [product, setProduct] = useState<Product>();

  console.log(productId);
  console.log(product);

  const getProduct = async () => {
    const fetchedProduct = await fetchProductById(productId);
    setProduct(fetchedProduct);
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  return (
    <>
      <div>SingleView</div>
      {productId}
      {product?.title}
      {product?.description}
      {product?.price}
      {product?.id}
    </>
  );
};

export default SingleView;
