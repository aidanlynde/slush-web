// src/pages/pay/[sessionId].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCheck, FaPaypal } from 'react-icons/fa';
import { SiCashapp, SiVenmo } from 'react-icons/si';
import Layout from '../../components/Layout';
import { 
  getPublicSession, 
  claimParticipant, 
  selectPaymentPlatform,
  getPaymentLink,
  Participant, 
  Session 
} from '../../lib/api/sessions';
import { GetServerSideProps } from 'next';
import { getSessionData } from '../../lib/server/api';


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { sessionId } = context.params as { sessionId: string };

    const sessionData = await getSessionData(sessionId);

    if (!sessionData) {
        return {
        props: {
            initialSession: null,
            error: "Session not found or error loading data"
        }
        };
    }

    return {
        props: {
        initialSession: sessionData,
        error: null
        }
    };
};
  
// Then update your component props and initial state
type PaymentClaimPageProps = {
    initialSession: Session | null;
    error: string | null;
};
  
export default function PaymentClaimPage({ initialSession, error: initialError }: PaymentClaimPageProps) {
  const router = useRouter();
  const { sessionId } = router.query;
  const [session, setSession] = useState<Session | null>(initialSession);
  const [loading, setLoading] = useState(!initialSession);
  const [error, setError] = useState(initialError || '');
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [claimName, setClaimName] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [claimStep, setClaimStep] = useState<'SELECT' | 'CLAIM' | 'PAYMENT'>('SELECT');
  const [paymentUsername, setPaymentUsername] = useState('');

  // Get available payment methods with default values if not provided
  const availablePaymentMethods = session?.available_payment_methods || {
    venmo: true,
    cashapp: true,
    paypal: true
  };

  useEffect(() => {
    if (!sessionId || initialSession) return;

    const fetchSessionData = async () => {
      try {
        setLoading(true);
        const data = await getPublicSession(sessionId as string);
        setSession(data);
      } catch (error) {
        console.error('Error fetching session data:', error);
        setError('Could not load payment session. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [sessionId, initialSession]);

  const handleParticipantSelect = (participant: Participant) => {
    setSelectedParticipant(participant);
    if (participant.claimed_name) {
      setClaimStep('PAYMENT');
    } else {
      setClaimStep('CLAIM');
    }
  };

  const handleClaimSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedParticipant || !sessionId || !claimName.trim()) return;

    try {
      setClaiming(true);
      const updatedParticipant = await claimParticipant(
        sessionId as string,
        selectedParticipant.id,
        claimName
      );
      
      // Update the participant in the session
      if (session) {
        const updatedParticipants = session.participants.map(p => 
          p.id === updatedParticipant.id ? updatedParticipant : p
        );
        setSession({...session, participants: updatedParticipants});
      }
      
      setSelectedParticipant(updatedParticipant);
      setClaimStep('PAYMENT');
    } catch (error) {
      console.error('Error claiming participant:', error);
      setError('Failed to claim this portion. It may already be claimed.');
    } finally {
      setClaiming(false);
    }
  };

  const handlePaymentMethodSelect = async (platform: string) => {
    if (!selectedParticipant || !sessionId) return;

    try {
      // First update the payment platform
      await selectPaymentPlatform(
        sessionId as string,
        selectedParticipant.id,
        platform,
        paymentUsername || 'user' // Use a default if not provided
      );

      // Then get the payment link
      const { payment_link } = await getPaymentLink(
        sessionId as string,
        selectedParticipant.id
      );
      
      // Redirect to the payment platform
      window.location.href = payment_link;
    } catch (error) {
      console.error('Error processing payment:', error);
      setError('There was a problem setting up payment. Please try again.');
    }
  };

  // Check if any payment methods are available
  const hasAvailablePaymentMethods = 
    availablePaymentMethods.venmo || 
    availablePaymentMethods.cashapp || 
    availablePaymentMethods.paypal;

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

  if (!hasAvailablePaymentMethods) {
    return (
      <Layout title="Payment Error | Slush">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded max-w-md mx-auto">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">
                  The creator of this payment session has not enabled any payment methods.
                </p>
              </div>
            </div>
          </div>
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

        {claimStep === 'SELECT' && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Select your portion:</h2>
            <div className="space-y-3">
              {session.participants.map((participant) => {
                const isClaimed = !!participant.claimed_name;
                
                return (
                  <button
                    key={participant.id}
                    onClick={() => !isClaimed && handleParticipantSelect(participant)}
                    disabled={isClaimed}
                    className={`w-full p-4 rounded-lg border-2 flex justify-between items-center ${
                      isClaimed 
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
                      {isClaimed && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                          <FaCheck className="mr-1" />
                          Claimed
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {claimStep === 'CLAIM' && selectedParticipant && (
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Claim your portion:</h2>
            <div className="bg-white p-4 rounded-lg border-2 border-orange-500">
              <p className="mb-2 text-gray-700">Amount: ${selectedParticipant.amount_owed.toFixed(2)}</p>
              <form onSubmit={handleClaimSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={claimName}
                    onChange={(e) => setClaimName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setClaimStep('SELECT')}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={claiming}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded flex items-center"
                  >
                    {claiming ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Claim This Portion'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {claimStep === 'PAYMENT' && selectedParticipant && (
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">How would you like to pay?</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Your Payment Username (optional)
              </label>
              <input
                type="text"
                value={paymentUsername}
                onChange={(e) => setPaymentUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your Venmo/Cash App/PayPal username"
              />
              <p className="text-xs text-gray-500 mt-1">
                If provided, this will pre-fill your payment details
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {/* Only show payment methods that are available */}
              {availablePaymentMethods.venmo && (
                <button
                  onClick={() => handlePaymentMethodSelect('VENMO')}
                  className="flex items-center justify-center p-3 bg-[#3D95CE] text-white rounded-lg"
                >
                  <SiVenmo className="mr-2 text-xl" />
                  Pay with Venmo
                </button>
              )}
              
              {availablePaymentMethods.cashapp && (
                <button
                  onClick={() => handlePaymentMethodSelect('CASHAPP')}
                  className="flex items-center justify-center p-3 bg-[#00D632] text-white rounded-lg"
                >
                  <SiCashapp className="mr-2 text-xl" />
                  Pay with Cash App
                </button>
              )}
              
              {availablePaymentMethods.paypal && (
                <button
                  onClick={() => handlePaymentMethodSelect('PAYPAL')}
                  className="flex items-center justify-center p-3 bg-[#0070E0] text-white rounded-lg"
                >
                  <FaPaypal className="mr-2 text-xl" />
                  Pay with PayPal
                </button>
              )}
            </div>
            
            <button
              onClick={() => setClaimStep('SELECT')}
              className="mt-4 text-gray-600 hover:text-gray-800 text-sm"
            >
              ← Back to selection
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}