'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '@/lib/redux/features/todoSlice';

const AddTodo = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <div className='space-y-4'>
      <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900">Masukan Todo List</label>
      <input value={input} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-sm p-2.5 ' onChange={e => setInput(e.target.value)} />
      <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600' onClick={handleAdd}>Tambah</button>
    </div>
  );
};

export default AddTodo;
