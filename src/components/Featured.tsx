import React from 'react';
import { Link } from 'react-router-dom';

type Props = {};

const Featured = (props: Props) => {
  return (
    <section>
      <div className='max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8'>
        <header className='text-center'>
          <h2 className='text-xl font-bold text-gray-900 sm:text-3xl'>New Collection</h2>

          {/* <p className="max-w-md mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
            natus?
          </p> */}
        </header>

        <ul className='grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3'>
          <li>
            <Link to='/mens' className='relative block group'>
              <img
                src='https://images.pexels.com/photos/1046425/pexels-photo-1046425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt=''
                className='object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-lg'
              />

              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-xl font-medium text-white'>Trendy Mens Fashion</h3>

                <span className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Shop Now</span>
              </div>
            </Link>
          </li>

          <li>
            <Link to='/products' className='relative block group'>
              <img
                src='https://images.pexels.com/photos/2752045/pexels-photo-2752045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt=''
                className='object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-lg'
              />

              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-xl font-medium text-white'>Social Outfits</h3>

                <span className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Shop Now</span>
              </div>
            </Link>
          </li>

          <li className='lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1'>
            <Link to='/womens' className='relative block group'>
              <img
                src='https://images.pexels.com/photos/2584279/pexels-photo-2584279.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                alt=''
                className='object-cover w-full transition duration-500 aspect-square group-hover:opacity-90 rounded-lg'
              />

              <div className='absolute inset-0 flex flex-col items-start justify-end p-6'>
                <h3 className='text-xl font-medium text-white'>Trendy Womens Fashion</h3>

                <span className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'>Shop Now</span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Featured;
