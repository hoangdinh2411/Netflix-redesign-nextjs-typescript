import React from 'react';
import { MdSearch } from 'react-icons/md';
import { HiOutlineBell } from 'react-icons/hi';
import Link from 'next/link';
type Props = {};

export default function Header({}: Props) {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () =>{
      window.removeEventListener('scroll', handleScroll);
    } 
  }, []);
  return (
    <header className={`${isScrolled && 'bg-[#141414]'} `}>
      <div className='flex items-center space-x-2 md:space-x-10'>
        <img
          src='https://rb.gy/ulxxee'
          className='cursor-pointer object-contain'
          width={150}
          height={150}
          alt=''
        />
        <ul className='hidden md:flex space-x-4'>
          <li className='headerLink cursor-default font-semibold text-white hover:text-white"'>
            Home
          </li>
          <li className='headerLink'>TV Shows</li>
          <li className='headerLink'>Movies</li>
          <li className='headerLink'>New & Popular</li>
          <li className='headerLink'>My List</li>
        </ul>
      </div>
      <div className='flex items-center space-x-4 text-sm font-light'>
        <MdSearch className='hidden sm:inline h-6 w-6' />
        <p className='hidden lg:inline'>Kids</p>
        <HiOutlineBell className=' h-6 w-6' />
        <Link href='/account'>
          <img
            src='https://rb.gy/g1pwyx'
            alt=''
            className='cursor-pointer rounded'
          />
        </Link>
      </div>
    </header>
  );
}
