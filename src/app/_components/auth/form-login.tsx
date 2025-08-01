"use client";

import { useActionState } from 'react';
import Link from 'next/link';
import { signInCredentials } from '@/lib/auth/action';
import { ButtonLogin } from '@/app/_components/button';

const FormLogin = () => {
  const [state, formActions] = useActionState(signInCredentials,null);
  return (
    <form action={formActions} className='space-y-6'>
      {state?.message ? (
      <div className='p-4 mb-4 text-red-500 text-sm rounded-lg bg-red-100' role='alert'>
        <span className='font-medium'>
          {state?.message}
        </span>
      </div>
      ):null}
      <div>
        <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900'>Email</label>
        <input type="email" name="email" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5' />
        <div aria-live='polite' aria-atomic='true' >
          <span className='text-red-500 text-sm mt-2'>{state?.error?.email}</span>
        </div>
      </div>
      <div>
        <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
        <input type="password" name="password" className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5' />
        <div aria-live='polite' aria-atomic='true' >
          <span className='text-red-500 text-sm mt-2'>{state?.error?.password}</span>
        </div>
      </div>
      <ButtonLogin />
      <p className='text-sm font-light text-gray-500'>Don&apos;t have an account yet?
        <Link href="/register"> <span className='font-medium pl-1 text-blue-600 hover:text-blue-700'>Sign Up here</span></Link>
      </p>
    </form>
      
  )
}

export default FormLogin;
