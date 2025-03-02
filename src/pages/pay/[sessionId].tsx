import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCheck, FaPaypal } from 'react-icons/fa';
import { SiCashapp, SiVenmo} from 'react-icons/si';
import Layout from '../../components/Layout';

type Participant = {
  id: string;
  temp_identifier: string;
  amount_owed: number;
  claimed?: boolean;
};

type Session = {
  session_id: string;
  total_amount: number;
  currency: string;
  participants: Participant[];
};

export default function PaymentClaimPage() {
  const router = useRouter();
  const { sessionId } = router.query;
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchSessionData = async () => {
      try {
        // In production, use your actual API endpoint
        const response = await fetch(`/api/sessions/${sessionId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch session data');
        }
        
        const data = await response.json();
        setSession(data);
      } catch (error) {
        console.error('Error fetching session data:', error);
        setError('Could not load payment session. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId]);

  const handleParticipantSelect = (participant: Participant) => {
    setSelectedParticipant(participant);
  };

  const handlePaymentMethodSelect = async (method: string) => {
    if (!selectedParticipant || !sessionId) return;

    // Mark as claimed first
    try {
      const response = await fetch(`/api/sessions/${sessionId}/claim`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          participantId: selectedParticipant.id 
        })
      });

      if (!response.ok) {
        throw new Error('Failed to claim payment portion');
      }
    } catch (error) {
      console.error('Error claiming payment portion:', error);
      return;
    }

    // Then redirect to payment method
    const amount = selectedParticipant.amount_owed;
    const recipient = 'YourSlushUsername'; // Replace with your actual username
    
    let paymentUrl = '';
    switch (method) {
      case 'venmo':
        paymentUrl = `venmo://paycharge?txn=pay&recipients=${recipient}&amount=${amount}&note=Payment via Slush`;
        break;
      case 'cashapp':
        paymentUrl = `https://cash.app/$${recipient}/${amount}`;
        break;
      case 'paypal':
        paymentUrl = `https://paypal.me/${recipient}/${amount}`;
        break;
    }
    
    // Redirect to payment app
    window.location.href = paymentUrl;
  };

  if (loading) {
    return (
      <Layout title="Loading Payment | Slush">
        <div className="min-h-screen flex flex-col items-center justify-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading payment details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !session) {
    return (
      <Layout title="Payment Error | Slush">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  {error || 'Payment session not found. Please check the link and try again.'}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => router.push('/')}
            className="mt-8 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Go to Homepage
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Claim Your Payment | Slush">
      <div className="max-w-md mx-auto p-4 pb-16">
        <div className="text-center my-8">
          <h1 className="text-2xl font-bold text-gray-900">Slush Payment Request</h1>
          <p className="text-4xl font-bold text-orange-500 mt-2">
            ${session.total_amount.toFixed(2)}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Select your portion:</h2>
          <div className="space-y-3">
            {session.participants.map((participant) => (
              <button
                key={participant.id}
                onClick={() => !participant.claimed && handleParticipantSelect(participant)}
                disabled={participant.claimed}
                className={`w-full p-4 rounded-lg border-2 flex justify-between items-center ${
                  participant.claimed 
                    ? 'bg-gray-100 border-gray-200 opacity-75'
                    : selectedParticipant?.id === participant.id
                      ? 'bg-blue-50 border-orange-500'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-left">
                  <span className="block font-medium text-gray-900">{participant.temp_identifier}</span>
                </span>
                <span className="flex items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    ${participant.amount_owed.toFixed(2)}
                  </span>
                  {participant.claimed && (
                    <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <FaCheck className="mr-1" />
                      Paid
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        {selectedParticipant && !selectedParticipant.claimed && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pay with:</h2>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => handlePaymentMethodSelect('venmo')}
                className="flex items-center justify-center p-3 bg-[#3D95CE] text-white rounded-lg"
              >
                <SiVenmo className="mr-2 text-xl" />
                Pay with Venmo
              </button>
              <button
                onClick={() => handlePaymentMethodSelect('cashapp')}
                className="flex items-center justify-center p-3 bg-[#00D632] text-white rounded-lg"
              >
                <SiCashapp className="mr-2 text-xl" />
                Pay with Cash App
              </button>
              <button
                onClick={() => handlePaymentMethodSelect('paypal')}
                className="flex items-center justify-center p-3 bg-[#0070E0] text-white rounded-lg"
              >
                <FaPaypal className="mr-2 text-xl" />
                Pay with PayPal
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}