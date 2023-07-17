import axios from 'axios';

axios.defaults.baseURL = 'https://foodx-fnsa.onrender.com';

// Sign-In function
export const signIn = async (email, password) => {
  try {
    const response = await axios.post('/api/users/signin', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Helper function to get the auth token from local storage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Create an order
export const createOrder = async (orderData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post('/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Read all orders
export const getAllOrders = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get('/api/orders', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Read a specific order
export const getOrderById = async (orderId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// Update an order
export const updateOrder = async (orderId, updatedOrderData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.put(`/api/orders/${orderId}`, updatedOrderData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// Delete an order
export const deleteOrder = async (orderId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.delete(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
};

// Create a user
export const createUser = async (userData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post('/api/users', userData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Read all users
export const getAllUsers = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get('/api/users', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Read a specific user
export const getUserById = async (userId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update a user
export const updateUser = async (userId, updatedUserData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.put(`/api/users/${userId}`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (userId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};