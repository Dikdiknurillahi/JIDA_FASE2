'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { removeTodo } from '@/lib/redux/features/todoSlice';

const TodoList = () => {
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  return (
    <div className='mt-4'>
            <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
        <p className='mx-4 mb-0 text-center font-semibold text-gray-600'>Todo</p>
      </div>
      {todos.map((todo, i) => (
        <div key={i} className='flex justify-between items-center bg-gray-200 p-2 rounded mb-2 w-sm'>
          <article className=' w-sm'>
            <p>{ i+1 }.{todo}</p>
          </article>
          <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-3 py-1.5' onClick={() => dispatch(removeTodo(i))}>Selesai</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
