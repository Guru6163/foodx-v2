import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/api';
import GenericTable from '../components/Table/GenericTable';



function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setUsers(res?.data?.users)

      })
      .catch(() => setUsers([]));
    console.log(users)
  }, []);

  const columns = [
    { key: 'firstName', header: 'First Name' },
    { key: 'lastName', header: 'Last Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', className: "text-emerald-500" },
    { key: 'address', header: 'Address' },
  ];

  return (
    <div>
      <GenericTable data={users} columns={columns} title="All Users" />
    </div>
  );
}

export default Users;
