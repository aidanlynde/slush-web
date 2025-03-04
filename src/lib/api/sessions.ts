import apiClient from './client';

export type Participant = {
  id: number;
  temp_identifier: string;
  amount_owed: number;
  status: string;
  claimed_name?: string;
  claimed_at?: string;
  payment_platform?: string;
  platform_username?: string;
  payment_timestamp?: string;
  service_fee: number;
  total_with_fee: number;
};

export type Session = {
  id: number;
  session_id: string;
  created_at: string;
  total_amount: number;
  currency: string;
  status: string;
  service_fee: number;
  total_with_fee: number;
  participants: Participant[];
};

// Get public session details (no auth required)
export const getPublicSession = async (sessionId: string): Promise<Session> => {
  const response = await apiClient.get(`/payments/sessions/${sessionId}/public`);
  return response.data;
};

// Claim a participant spot
export const claimParticipant = async (
  sessionId: string,
  participantId: number,
  claimedName: string
): Promise<Participant> => {
  const response = await apiClient.post(
    `/payments/sessions/${sessionId}/participants/${participantId}/claim`,
    { claimed_name: claimedName }
  );
  return response.data;
};

// Select payment platform
export const selectPaymentPlatform = async (
  sessionId: string,
  participantId: number,
  platform: string,
  platformUsername: string
): Promise<Participant> => {
  const response = await apiClient.post(
    `/payments/sessions/${sessionId}/participants/${participantId}/platform`,
    { 
      platform: platform,
      platform_username: platformUsername
    }
  );
  return response.data;
};

// Get direct payment link for a specific platform
export const getPaymentLink = async (
  sessionId: string,
  participantId: number
): Promise<{ payment_link: string }> => {
  const response = await apiClient.get(
    `/payments/sessions/${sessionId}/participants/${participantId}/payment-link`
  );
  return response.data;
};

// Mark payment as complete (for testing)
export const markPaymentComplete = async (
  sessionId: string,
  participantId: number
): Promise<any> => {
  const response = await apiClient.post(
    `/payments/sessions/${sessionId}/participants/${participantId}/complete`
  );
  return response.data;
};