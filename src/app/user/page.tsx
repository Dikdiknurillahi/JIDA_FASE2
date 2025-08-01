import type { Metadata } from 'next';
import UserTable from '@/app/_components/auth/user-table';
import { Container } from '../_components/Container';

export const metadata: Metadata = {
  title: 'User Page',
};

const UserPage = () => {
  return (
    <Container>
      <div className="bg-slate-50 min-h-screen">
        <div className="max-w-screen-md mx-auto py-10">
          <h1 className='text-2xl font-bold'>User list</h1>
          <UserTable />
        </div>
      </div>
    </Container>
  )
}

export default UserPage
