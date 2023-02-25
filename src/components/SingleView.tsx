import { FC, useState } from 'react';
import { fetchProductById } from '../api/api';
import { Product } from './Interfaces';

type Props = {
  id: number;
  title: string;
  description: string;
  price: number;
};

const SingleView: FC<Props> = ({ id, title, description, price }) => {
  // need to pass productId from products component
  // then fetch the product and set the product id
  // then you can render the page with the required information
  const [productId, setProductId] = useState(0);
  const [product, setProduct] = useState<Product[]>([]);

  setProductId(0);

  const getProduct = async () => {
    // const product = await fetchProductById(productId);
  };

  return (
    <>
      <div>SingleView</div>
      {id}
      {title}
      {description}
      {price}
    </>
  );
};

export default SingleView;
