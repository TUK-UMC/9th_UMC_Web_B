import type React from "react";

interface PagenationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagenation: React.FC<PagenationProps> = ({page, setPage}) => {

  return (
    <div className='flex items-center justify-center gap-6 mt-5'>
      <button 
      className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
      hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300 
      cursor-pointer disabled:cursor-not-allowed'
      disabled={page === 1} 
      onClick={() => setPage((prev) => prev - 1)}>{'<'}</button>
      <span>{page} 페이지</span>
      <button 
      className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md 
      hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
      onClick={() => setPage((prev) => prev + 1)}>{'>'}</button>
    </div>
  )
}