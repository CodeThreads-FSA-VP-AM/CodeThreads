import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchDeleteProduct, fetchProducts } from '../api/api';
import { Product } from './Interfaces';
import Loader from './Loader';

type Props = {
  setProductId: (id: number) => void;
  user: any;
};

const MaleProducts: React.FC<Props> = ({ setProductId, user }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [selectedId, setSelectedId] = useState(0);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  console.log(user.is_admin);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const allProducts = await fetchProducts();
        const mensProducts = allProducts.filter((product) => product.tags.some((tag: { name: string }) => tag.name === 'mens'));
        setProducts(mensProducts);
        // console.log(allProducts);
        // setProducts(allProducts);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    loadProducts();
  }, [message]);

  const idHandle = (id: number) => {
    console.log(id);
    setProductId(id);
  };

  const handleSelect: React.ChangeEventHandler<HTMLSelectElement> = (e: any) => {
    setProductId(e.target.value);
    setSelectedId(e.target.value);
  };

  const handleDelete = async () => {
    console.log(selectedId);
    console.log('delete me');
    const deletedProduct = await fetchDeleteProduct(selectedId);

    const filteredOrders = products.filter((p) => p.id !== selectedId);
    setProducts(filteredOrders);
    setMessage('product deleted');

    setTimeout(() => {
      setMessage('');
    }, 3000);

    console.log('product removed', deletedProduct);
  };

  return (
    <>
      <section className='py-6 bg-white sm:py-8 lg:py-12'>
        <div className='px-4 mx-auto max-w-screen-2xl md:px-8'>
          {/* <!-- text - start --> */}
          <header className='mb-10 md:mb-16'>
            <h2 className='mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-6'>Product Collection</h2>

            <p className='max-w-screen-md mx-auto text-center text-gray-500 md:text-lg'>
              From everyday essentials to statement pieces, our selection features something for every occasion. Start exploring now and find your new
              favorite outfit!
            </p>

            {user.is_admin && (
              <>
                <div className='flex items-center justify-center py-1'>
                  <Link to='/addproduct' className='pr-52'>
                    <button className='inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50'>
                      add
                    </button>
                  </Link>

                  <select className='rounded' onChange={handleSelect}>
                    <option value='delete'>delete product</option>
                    {products.map((p) => (
                      <option value={p.id} key={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>

                  <button
                    className='inline-flex items-center px-5 py-2.5 m-4 sm:mt-6 text-sm font-medium text-center bg-blue-500 rounded-lg focus:ring-4 focus:ring-primary-200 focus:ring-primary-900 hover:bg-blue-800 text-gray-50'
                    onClick={handleDelete}
                  >
                    delete
                  </button>
                  <span className='text-red-400'>{message}</span>
                </div>
              </>
            )}

            <div className='flex items-center justify-center pt-9 '>
              <input
                className='w-full max-w-xs input input-bordered input-secondary border rounded border-gray-800 p-3'
                value={search}
                placeholder='search'
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </div>
          </header>
          {/* <!-- text - end --> */}

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-8'>
            {/* <!-- product - start --> */}
            {loading ? (
              // <div className="flex">
              //   <div className="flex items-center justify-center w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
              // </div>
              <Loader />
            ) : (
              products
                .filter((p) => {
                  if (search === '') {
                    return p;
                  } else if (p.title.toLowerCase().includes(search)) {
                    return p.title;
                  } else if (p.tags.some((t: any) => t.name.toLowerCase() === search)) {
                    return p;
                  }
                })
                ?.map((p: Product) => (
                  <div key={p.id}>
                    <Link
                      to={`/products/${p.id}`}
                      className='relative block mb-2 overflow-hidden bg-gray-100 rounded-lg shadow-lg group h-96 lg:mb-3'
                      onClick={() => idHandle(p.id)}
                    >
                      <img
                        src={p.front_url}
                        loading='lazy'
                        alt=''
                        className='object-cover object-center w-full h-full transition duration-200 group-hover:scale-110'
                      />

                      <div className='absolute flex gap-2 left-2 bottom-2'>
                        {/* <span className="bg-red-500 text-white text-sm font-semibold tracking-wider uppercase rounded-r-lg px-3 py-1.5">-50%</span> */}
                        {p.tags?.map((t: any) => {
                          return (
                            <span key={t.id} className='bg-white text-gray-800 text-sm font-bold tracking-wider uppercase rounded-lg px-3 py-1.5'>
                              {t.name}
                            </span>
                          );
                        })}
                      </div>
                    </Link>

                    <div className='flex items-start justify-between gap-2 px-2'>
                      <div className='flex flex-col'>
                        <a href='#' className='text-lg font-bold text-gray-800 capitalize transition duration-100 hover:text-gray-500 lg:text-xl'>
                          {p.title}
                        </a>
                        <span className='text-gray-500'>by codeThreads</span>
                      </div>

                      <div className='flex flex-col items-end'>
                        <span className='font-bold text-gray-600 lg:text-lg'> £{p.price} GBP </span>
                        {/* <span className="text-sm text-red-500 line-through">$39.99</span> */}
                      </div>
                    </div>
                  </div>
                ))
            )}
            {/* <!-- product - end --> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default MaleProducts;