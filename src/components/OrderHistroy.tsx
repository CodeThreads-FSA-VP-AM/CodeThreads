import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchOrderHistory } from '../api/api';
import Products from './Products';

type Props = {};

const OrderHistroy = (props: Props) => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(4);

  useEffect(() => {
    const orderHistory = async (userId: number) => {
      const order = await fetchOrderHistory(userId);
      setOrders(order);
    };

    if (userId !== undefined) {
      orderHistory(userId);
    }
  }, []);

  console.log(orders);

  return (
    <div className='bg-white'>
      <div className='py-16 sm:py-24'>
        <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
          <div className='max-w-2xl px-4 mx-auto lg:max-w-4xl lg:px-0'>
            <h1 className='text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl'>Order history</h1>
            <p className='mt-2 text-sm text-gray-500'>Check the status of recent orders, manage returns, and discover similar products.</p>
          </div>
        </div>

        <div className='mt-16'>
          <h2 className='sr-only'>Recent orders</h2>
          <div className='mx-auto max-w-7xl sm:px-2 lg:px-8'>
            <div className='max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0'>
              {orders.map((order: any) => {
                const date = new Date(order.purchased_at);
                const formattedDate = date.toLocaleDateString();

                let total = 0;
                order.products.forEach((p: any) => {
                  total += Number(p.price) * Number(p.quantity);
                });

                console.log(total);
                return (
                  <div key={order.id} className='bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border'>
                    <h3 className='sr-only'>
                      Order placed on <time dateTime={order.createdDatetime}>{order.createdDate}</time>
                    </h3>

                    <div className='flex items-center p-4 border-b border-gray-200 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6'>
                      <dl className='grid flex-1 grid-cols-2 text-sm gap-x-6 sm:col-span-3 sm:grid-cols-3 lg:col-span-2'>
                        <div>
                          <dt className='font-medium text-gray-900'>Order number</dt>
                          <dd className='mt-1 text-gray-500'>{order.id}</dd>
                        </div>
                        <div className='hidden sm:block'>
                          <dt className='font-medium text-gray-900'>Date placed</dt>
                          <dd className='mt-1 text-gray-500'>
                            <time dateTime={order.purchased_at}>{formattedDate}</time>
                          </dd>
                        </div>
                        <div>
                          <dt className='font-medium text-gray-900'>Total amount</dt>
                          <dd className='mt-1 font-medium text-gray-900'>{total.toFixed(2)}</dd>
                        </div>
                      </dl>
                    </div>

                    {/* Products */}
                    <h4 className='sr-only'>Items</h4>
                    <ul role='list' className='divide-y divide-gray-200'>
                      {order.products.map((product: any) => (
                        <li key={product.id} className='p-4 sm:p-6'>
                          <div className='flex items-center sm:items-start'>
                            <div className='flex-shrink-0 w-20 h-20 overflow-hidden bg-gray-200 rounded-lg sm:h-40 sm:w-40'>
                              <img src={product.front_url} alt={product.front_url} className='object-cover object-center w-full h-full' />
                            </div>
                            <div className='flex-1 ml-6 text-sm'>
                              <div className='font-medium text-gray-900 sm:flex sm:justify-between'>
                                <h5 className='font-extrabold'>{product.title}</h5>
                                <p className='mt-2 sm:mt-0'>{product.price}</p>
                              </div>
                              <p className='hidden text-gray-500 sm:mt-2 sm:block'>{product.description}</p>
                              <p className='hidden text-gray-500 sm:mt-2 sm:block'>Quantity: {product.quantity}</p>
                            </div>
                          </div>

                          <div className='mt-6 sm:flex sm:justify-between'>
                            <div className='flex items-center pt-4 mt-6 space-x-4 text-sm font-medium border-t border-gray-200 divide-x divide-gray-200 sm:mt-0 sm:ml-4 sm:border-none sm:pt-0'>
                              <div className='flex justify-center flex-1'>
                                <Link to={`/products/${product.id}`} className='text-indigo-600 whitespace-nowrap hover:text-indigo-500'>
                                  View product
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistroy;
