import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId } = req.query;
  const { participantId } = req.body;
  
  if (typeof sessionId !== 'string' || !participantId) {
    return res.status(400).json({ error: 'Invalid request parameters' });
  }

  // In production, update your database
  // await prisma.participant.update({
  //   where: { id: participantId, sessionId },
  //   data: { claimed: true }
  // });
  
  // For now, just return success
  res.status(200).json({ success: true });
}