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
    const response = await axios.patch(`/api/orders/${orderId}`, updatedOrderData, {
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
    const response = await axios.patch(`/api/users/${userId}`, updatedUserData, {
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


// Create a delivery partner
export const createDeliveryPartner = async (deliveryPartnerData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post('/api/delivery-partners', deliveryPartnerData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating delivery partner:', error);
    throw error;
  }
};

// Read all delivery partners
export const getAllDeliveryPartners = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get('/api/delivery-partners', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery partners:', error);
    throw error;
  }
};

// Read a specific delivery partner
export const getDeliveryPartnerById = async (deliveryPartnerId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/delivery-partners/${deliveryPartnerId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery partner:', error);
    throw error;
  }
};

// Update a delivery partner
export const updateDeliveryPartner = async (deliveryPartnerId, updatedDeliveryPartnerData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.patch(`/api/delivery-partners/${deliveryPartnerId}`, updatedDeliveryPartnerData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating delivery partner:', error);
    throw error;
  }
};

// Delete a delivery partner
export const deleteDeliveryPartner = async (deliveryPartnerId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.delete(`/api/delivery-partners/${deliveryPartnerId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting delivery partner:', error);
    throw error;
  }
};


// Create a restaurant
export const createRestaurant = async (restaurantData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post('/api/restaurants', restaurantData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
};

// Read all restaurants
export const getAllRestaurants = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get('/api/restaurants', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

// Read a specific restaurant
export const getRestaurantById = async (restaurantId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/restaurants/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw error;
  }
};

// Update a restaurant
export const updateRestaurant = async (restaurantId, updatedRestaurantData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.patch(`/api/restaurants/${restaurantId}`, updatedRestaurantData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};

// Delete a restaurant
export const deleteRestaurant = async (restaurantId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.delete(`/api/restaurants/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};

export const createMenuItems = async (restaurantData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post('/api/menu', restaurantData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating restaurant:', error);
    throw error;
  }
};

// Read all restaurants
export const getMenuItemsByRestauarantId = async (restaurantId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.post('/api/menu/getAll',{restaurantId}, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

// Read a specific restaurant
export const getMenuDetailsById = async (menuId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/restaurants/${menuId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    throw error;
  }
};

// Update a restaurant
export const updateMenuById = async (menuId, updatedRestaurantData) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.patch(`/api/restaurants/${menuId}`, updatedRestaurantData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating restaurant:', error);
    throw error;
  }
};

// Delete a restaurant
export const deleteMenuById = async (menuId) => {
  try {
    const authToken = getAuthToken();
    const response = await axios.delete(`/api/restaurants/${menuId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    throw error;
  }
};






export const getOrdersCount = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/users/get-orders-count`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Fetching:', error);
    throw error;
  }
};

export const getCustomersCount = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/users/get-users-count`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Fetching:', error);
    throw error;
  }
};

export const getSalesCount = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/users/get-order-sales`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Fetching:', error);
    throw error;
  }
};


export const getPaymentMethodAnalytics = async () => {
  try {
    const authToken = getAuthToken();
    const response = await axios.get(`/api/users/get-paymentMethod-data`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error Fetching:', error);
    throw error;
  }
};