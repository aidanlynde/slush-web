import axios from 'axios';

const API_BASE_URL = process.env.API_URL || 'http://localhost:8000';

export const serverApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getSessionData(sessionId: string) {
  try {
    const response = await serverApi.get(`/payments/sessions/${sessionId}/public`);
    return response.data;
  } catch (error) {
    console.error('Server API error:', error);
    return null;
  }
}