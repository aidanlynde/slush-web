import type { NextApiRequest, NextApiResponse } from 'next';

// This is a mock implementation - replace with actual database calls
const mockSessions: Record<string, any> = {
  'mock-session-id': {
    session_id: 'mock-session-id',
    total_amount: 86.75,
    currency: 'USD',
    participants: [
      {
        id: '1',
        temp_identifier: '@user_1',
        amount_owed: 28.92,
        claimed: false
      },
      {
        id: '2',
        temp_identifier: '@user_2',
        amount_owed: 28.92,
        claimed: false
      },
      {
        id: '3',
        temp_identifier: '@user_3',
        amount_owed: 28.91,
        claimed: true
      }
    ]
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  
  if (typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'Invalid session ID' });
  }

  // In production, fetch from your database
  // const session = await prisma.session.findUnique({ where: { id: sessionId } });
  
  // For now, use mock data
  const session = mockSessions[sessionId] || mockSessions['mock-session-id'];
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.status(200).json(session);
}