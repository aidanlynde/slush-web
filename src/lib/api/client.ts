import axios from 'axios';

// Configure base URL

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://slush-backend-production.up.railway.app';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;