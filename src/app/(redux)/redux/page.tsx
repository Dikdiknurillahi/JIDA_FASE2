import AddTodo from '@/app/_components/redux/AddTodo';
import TodoList from '@/app/_components/redux/TodoList';

export default function Home() {
  return (
    <div className='pt-4 '>
      <AddTodo />
      <TodoList />
    </div>
  );
}
