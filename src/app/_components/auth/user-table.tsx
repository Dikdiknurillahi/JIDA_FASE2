import React from 'react';
import { getUser } from '@/lib/auth/data/data';

const UserTable = async () => {
  const users = await getUser();
  if (!users?.length) {
    return <h1 className='mt-20 text-2xl'>No users found.</h1>;
  }
  return (
    <div>
      <table className="w-full bg-white mt-3">
        <thead className='border-b border-gray-100'>
          <tr>
            <th className='py-3 px-6 text-left text-sm'>Name</th>
            <th className='py-3 px-6 text-left text-sm'>Email</th>
            <th className='py-3 px-6 text-left text-sm'>Role</th>
            <th className='py-3 px-6 text-left text-sm'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className='py-3 px-6'>{user.name}</td>
              <td className='py-3 px-6'>{user.email}</td>
              <td className='py-3 px-6'>{user.role}</td>
              <td className='py-3 px-6'>
                {/* Actions can be added here, e.g., edit or delete */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable