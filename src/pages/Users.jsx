import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/api';
import GenericTable from '../components/Table/GenericTable';
import { useNavigate } from 'react-router-dom';


function Users() {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res?.data?.users);
      })
      .catch(() => setUsers([]))
      .finally(() => setIsLoading(false));
  }, []);

  const columns = [
    { key: 'firstName', header: 'First Name' },
    { key: 'lastName', header: 'Last Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', className: 'text-emerald-500' },
    { key: 'address', header: 'Address' },
  ];

  if (isLoading) {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
          <h2 className="text-lg font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <button
        className="p-2 px-6 mb-2 border-2 bg-white font-bold text-black cursor-pointer rounded-sm hover:bg-blue-600 hover:text-white"
        style={{ width: 'max-content' }}
        onClick={() => navigate('add')}
      >
        Add New User
      </button>
      <GenericTable data={users} columns={columns} title="All Users" />

    </div>
  );
}

export default Users;
