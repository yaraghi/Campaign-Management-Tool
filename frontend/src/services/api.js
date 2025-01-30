import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL

axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const handleError = (error) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    const message = error.response.data.message || 'Something went wrong!';
    throw new Error(message);
  } else if (error.request) {
    throw new Error('Network error, please try again!');
  } else {
    throw new Error(error.message);
  }
};

export async function registerUser({ name, email, password, password_confirmation }) {
  try {
    const response = await axios.post('/register', {
      name,
      email,
      password,
      password_confirmation,
    });
    return response.data; 
  } catch (error) {
    handleError(error);
  }
}

export async function loginUser({ email, password }) {
  try {
    const response = await axios.post('/login', { email, password });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}


export async function logoutUser() {
  try {
    const response = await axios.post('/logout');
    localStorage.removeItem('token'); 
    window.location.href = '/login';
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getCampaigns(params = {}) {
  try {
    const response = await axios.get('/campaigns', { params });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function getCountries() {
  try {
    const response = await axios.get('/countries');
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function createCampaign(payload) {
  try {
    const response = await axios.post('/campaigns', payload);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

export async function updateCampaignStatus(id, newStatus) {
  try {
    const response = await axios.patch(`/campaigns/${id}/status`, {
      activity_status: newStatus,
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
}
