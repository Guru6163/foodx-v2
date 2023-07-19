import React, { useState, useEffect } from 'react';
import { createUser, getUserById, deleteUser, updateUser } from '../../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';

function CreateUserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: '',
    role: 'User',
    lat: '',
    lng: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    setCreating(true);
    createUser(formData)
      .then((response) => {
        console.log('User created:', response.data);
        setFormData({});
        toast.success('User created successfully!');
        setTimeout(() => {
          navigate('/users');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error creating user:', error);
        toast.error('Error creating user. Please try again.');
      })
      .finally(() => {
        setCreating(false);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdating(true);
    updateUser(id, formData)
      .then((response) => {
        console.log('User updated:', response.data);
        toast.success('User updated successfully!');
        setTimeout(() => {
          navigate('/users');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        toast.error('Error updating user. Please try again.');
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handleDelete = () => {
    setDeleting(true);
    deleteUser(id)
      .then((response) => {
        console.log('User deleted:', response.data);
        toast.success('User deleted successfully!');
        setTimeout(() => {
          navigate('/users');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user. Please try again.');
      })
      .finally(() => {
        setDeleting(false);
      });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);

      getUserById(id)
        .then((response) => {
          const user = response?.data?.user;
          if (user) {
            setFormData(user);
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          // Handle error accordingly (e.g., show an error message)
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
          <h2 className="text-lg font-bold mb-4">Loading...</h2>
        </div>
      </div>
    );
  }

  if (deleting) {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
          <h2 className="text-lg font-bold mb-4">Deleting...</h2>
        </div>
      </div>
    );
  }

  if (creating) {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
          <h2 className="text-lg font-bold mb-4">Creating...</h2>
        </div>
      </div>
    );
  }

  if (updating) {
    return (
      <div className="bg-gray-100 flex items-center justify-center">
        <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
          <h2 className="text-lg font-bold mb-4">Updating...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full bg-white shadow-lg rounded-sm px-8 py-6">
        <h2 className="text-lg font-bold mb-4 ">Create a User</h2>
        <form onSubmit={id ? handleUpdate : handleCreate} className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="block font-semibold mb-1 text-gray-800">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block font-semibold mb-1 text-gray-800">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1 text-gray-800">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold mb-1 text-gray-800">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block font-semibold mb-1 text-gray-800">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block font-semibold mb-1 text-gray-800">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block font-semibold mb-1 text-gray-800">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
              required
            >
              <option value="Admin">Admin</option>
              <option value="Delivery-Partner">Delivery Partner</option>
              <option value="User">User</option>
            </select>
          </div>
          <div>
            <label htmlFor="lat" className="block font-semibold mb-1 text-gray-800">
              Latitude
            </label>
            <input
              type="text"
              id="lat"
              name="lat"
              value={formData.lat}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="lng" className="block font-semibold mb-1 text-gray-800">
              Longitude
            </label>
            <input
              type="text"
              id="lng"
              name="lng"
              value={formData.lng}
              onChange={handleChange}
              className="border border-gray-300 rounded-sm px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </form>
        <div>
          {id ? (
            <div>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white py-1 px-6 rounded-sm hover:bg-blue-600 mt-3 mr-2"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-1 px-6 rounded-sm hover:bg-red-600 mt-3"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          ) : (
            <button
              onClick={handleCreate}
              className="bg-blue-500 text-white py-1 px-6 rounded-sm hover:bg-blue-600 mt-3"
            >
              Create User
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateUserForm;
