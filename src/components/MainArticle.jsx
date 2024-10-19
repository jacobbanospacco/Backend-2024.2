import React from 'react';
import Maps from './Maps';

export const MainArticle = () => {
  return (
    <section className='mb-12'>
      <div className='w-full h-auto'>
        <Maps />
      </div>
      <div className='sm:flex'>
       <div className='flex-1 py-6'>
         <h2 className='text-[40px] font-bold sm:text-[50px] leading-none'> Dashboard CENSIS - IGP 2.0</h2>
       </div>
       <div className='flex-1 pt-9'>
         <p className='text-[13px] mb-10 sm:text-[15px]'>____________________________________________________</p>
       </div>
      </div>
    </section>
  );
}
