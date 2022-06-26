import React, { useRef, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Loading from './../components/Loading';
import useAuth from '../hooks/useAuth';

type Props = {};

function SignUp({}: Props) {
  const [submit, setSubmit] = useState<boolean>(false);
  const { loading, error, signUp } = useAuth();

  const password = useRef({})
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  password.current = watch('password','')

  const onSubmit = (email: string, password: string) => {
    signUp(email,password)
  };

  if(loading) return (
    <Loading/>
  )
  return (
    <div className='relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Netflix - Register account</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Image
        src='https://rb.gy/p2hphi'
        alt=''
        layout='fill'
        className='-z-10 !hidden opacity-60 sm:!inline'
        objectFit='cover'
      />
      <img
        src='https://rb.gy/ulxxee'
        className='absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6'
        width={150}
        height={150}
        alt=''
      />

      <form
        className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14'
        onSubmit={handleSubmit(({ email, password }) =>
          onSubmit(email, password),
        )}
      >
        <h1 className='text-4xl font-semibold'>Sign up</h1>
        <div className='space-y-4'>
          <label className='inline-block w-full'>
            <input
              type='email'
              placeholder='Email'
              className={`input ${
                errors.email && 'border-b-2 border-orange-500'
              }`}
              {...register('email', { required: 'Enter email ', pattern: {
                value :/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: 'Enter a valid email address '
              } })}
            />
            {errors.email && (
              <p className='p-1 text-[13px] font-light  text-orange-500'>
                {errors.email.message}
              </p>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type='password'
              {...register('password', { required: 'Enter password ', minLength: {
                value :6,
                message: 'Your password must contain between 6 and 60 characters.'
              } })}
              placeholder='Password'
              className={`input ${
                errors.password && 'border-b-2 border-orange-500'
              }`}
            />
            {errors.password && (
              <p className='p-1 text-[13px] font-light  text-orange-500'>
                              {errors.password.message}
              </p>
            )}
          </label>
          <label className='inline-block w-full'>
            <input
              type='password'
              {...register('confirmPassword', { required: 'Enter password confirmation', minLength: {
                value :6,
                message: 'Your password must contain between 6 and 60 characters.'
              },
              validate: value=>value === password.current  || 'The password confirmation does not match'
            })}
              placeholder='Confirm Password'
              className={`input ${
                errors.confirmPassword && 'border-b-2 border-orange-500'
              }`}
            />
            {errors.confirmPassword && (
              <p className='p-1 text-[13px] font-light  text-orange-500'>
               {errors.confirmPassword.message}
              </p>
            )}
          </label>
        </div>
        <button
          className='w-full rounded bg-[#E50914] py-3 font-semibold'
          onClick={() => setSubmit(true)}
          type='submit'
        >
          Sign Up
        </button>
        <div className='text-[gray]'>
          Do you have account?  {' '}
          <Link
          href="/login"
          >
            <a  className='text-white hover:underline'>
            Login now
            </a>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
