import React from 'react';
import { Movie } from '../typings';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';
import Thumbnail from './Thumbnail';

type Props = {
  title: string;
  movies: Movie[];
};

export default function Row({ title, movies }: Props) {
  const rowRef = React.useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = React.useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      if (scrollTo === 0) {
        setIsMoved(false);
      }
    }
  };

  return (
    <div className='h-40 space-y-0.5 md:space-y-2 '>
      <h2 className='w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl'>
        {title}
      </h2>
      <div className='group relative md:-ml-2'>
        <HiOutlineChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            !isMoved && 'hidden'
          }`}
          onClick={() => handleClick('left')}
        />
        <div
          className='flex items-center space-x-3 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2'
          ref={rowRef}
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <HiOutlineChevronRight
          className='absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100'
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  );
}
