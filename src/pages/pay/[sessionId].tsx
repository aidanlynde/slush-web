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
  const [processingPayment, setProcessingPayment] = useState(false);

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
      setProcessingPayment(true);
      // First update the payment platform - we're not sending username anymore
      await selectPaymentPlatform(
        sessionId as string,
        selectedParticipant.id,
        platform,
        '' // Empty string instead of username
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
      setProcessingPayment(false);
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600">Loading payment details...</p>
        </div>
      </Layout>
    );
  }

  if (error || !session) {
    return (
      <Layout title="Payment Error | Slush">
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
          <div className="bg-white shadow-md rounded-lg border border-red-100 p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Payment Error</h3>
                <p className="text-sm text-gray-600">
                  {error || 'Payment session not found. Please check the link and try again.'}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/')}
              className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!hasAvailablePaymentMethods) {
    return (
      <Layout title="Payment Error | Slush">
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
          <div className="bg-white shadow-md rounded-lg border border-red-100 p-6 max-w-md w-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">No Payment Methods Available</h3>
                <p className="text-sm text-gray-600">
                  The creator of this payment session has not enabled any payment methods.
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push('/')}
              className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            >
              Go to Homepage
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Claim Your Payment | Slush">
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-6 px-6">
            <h1 className="text-xl font-bold text-white text-center">Slush Payment Request</h1>
            <p className="text-4xl font-bold text-white text-center mt-2">
              ${session.total_amount.toFixed(2)}
            </p>
          </div>

          <div className="p-6">
            {/* Select Step */}
            {claimStep === 'SELECT' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Select your portion:</h2>
                <div className="space-y-3">
                  {session.participants.map((participant) => {
                    const isClaimed = !!participant.claimed_name;
                    
                    return (
                      <button
                        key={participant.id}
                        onClick={() => !isClaimed && handleParticipantSelect(participant)}
                        disabled={isClaimed}
                        className={`w-full p-4 rounded-lg border transition-all ${
                          isClaimed 
                            ? 'bg-gray-50 border-gray-200 opacity-75'
                            : selectedParticipant?.id === participant.id
                              ? 'bg-orange-50 border-orange-500 shadow-sm'
                              : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-left">
                            <span className="block font-medium text-gray-900">{participant.temp_identifier}</span>
                          </span>
                          <div className="flex items-center">
                            <span className="text-lg font-semibold text-gray-900">
                              ${participant.amount_owed.toFixed(2)}
                            </span>
                            {isClaimed && (
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center">
                                <FaCheck className="mr-1" />
                                Claimed
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Claim Step */}
            {claimStep === 'CLAIM' && selectedParticipant && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Claim your portion:</h2>
                <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Your portion:</span>
                    <span className="text-lg font-semibold text-orange-600">${selectedParticipant.amount_owed.toFixed(2)}</span>
                  </div>
                  <form onSubmit={handleClaimSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={claimName}
                        onChange={(e) => setClaimName(e.target.value)}
                        className="shadow-sm appearance-none border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        onClick={() => setClaimStep('SELECT')}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={claiming}
                        className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 transition-colors flex items-center"
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

            {/* Payment Step */}
            {claimStep === 'PAYMENT' && selectedParticipant && (
              <div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Your portion</p>
                      <p className="text-lg font-medium text-gray-900">${selectedParticipant.amount_owed.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Claimed by</p>
                      <p className="text-lg font-medium text-gray-900">{selectedParticipant.claimed_name}</p>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-lg font-medium text-gray-900 mb-4">Choose payment method</h2>
                
                <div className="space-y-3">
                  {processingPayment && (
                    <div className="flex items-center justify-center p-6">
                      <svg className="animate-spin h-8 w-8 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="ml-3 text-gray-700">Preparing payment...</span>
                    </div>
                  )}
                  
                  {!processingPayment && (
                    <>
                      {/* Venmo Button */}
                      {availablePaymentMethods.venmo && (
                        <button
                          onClick={() => handlePaymentMethodSelect('VENMO')}
                          className="w-full flex items-center justify-center p-4 bg-[#3D95CE] text-white rounded-lg hover:bg-[#3685b8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#3D95CE] focus:ring-offset-2"
                        >
                          <SiVenmo className="text-2xl mr-3" />
                          <span className="text-lg font-medium">Pay with Venmo</span>
                        </button>
                      )}
                      
                      {/* Cash App Button */}
                      {availablePaymentMethods.cashapp && (
                        <button
                          onClick={() => handlePaymentMethodSelect('CASHAPP')}
                          className="w-full flex items-center justify-center p-4 bg-[#00D632] text-white rounded-lg hover:bg-[#00b82b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00D632] focus:ring-offset-2"
                        >
                          <SiCashapp className="text-2xl mr-3" />
                          <span className="text-lg font-medium">Pay with Cash App</span>
                        </button>
                      )}
                      
                      {/* PayPal Button */}
                      {availablePaymentMethods.paypal && (
                        <button
                          onClick={() => handlePaymentMethodSelect('PAYPAL')}
                          className="w-full flex items-center justify-center p-4 bg-[#0070E0] text-white rounded-lg hover:bg-[#0063c4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0070E0] focus:ring-offset-2"
                        >
                          <FaPaypal className="text-2xl mr-3" />
                          <span className="text-lg font-medium">Pay with PayPal</span>
                        </button>
                      )}
                    </>
                  )}
                </div>
                
                {!processingPayment && (
                  <button
                    onClick={() => setClaimStep('SELECT')}
                    className="mt-6 text-gray-600 hover:text-gray-800 text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to selection
                  </button>
                )}
              </div>
            )}

            {error && (
              <div className="mt-4 p-4 bg-red-50 rounded-md border border-red-200">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}