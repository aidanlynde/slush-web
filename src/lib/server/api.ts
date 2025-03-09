import axios from 'axios';
import { Session } from '../api/sessions';

const API_BASE_URL = process.env.API_URL || 'http://localhost:8000';

export const serverApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getSessionData(sessionId: string): Promise<Session | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments/sessions/${sessionId}/public`
    );
    
    if (!response.ok) {
      console.error('Error fetching session:', response.status, response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    // Make sure available_payment_methods has a default value if not provided
    if (!data.available_payment_methods) {
      data.available_payment_methods = {
        venmo: true,
        cashapp: true,
        paypal: true
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching session data:', error);
    return null;
  }
}