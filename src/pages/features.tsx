import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function FeaturesPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // More efficient scroll handling with debounce
  const handleScroll = useCallback(() => {
    // Don't track scroll position on mobile devices to improve performance
    if (isMobile) return;
    
    // Use requestAnimationFrame for smoother performance
    if (!window.requestAnimationFrame) {
      setScrollY(window.scrollY);
      return;
    }
    
    // Use a more efficient approach that doesn't update state on every scroll event
    const currentPosition = window.scrollY;
    if (Math.abs(currentPosition - scrollY) > 50) {
      window.requestAnimationFrame(() => {
        setScrollY(currentPosition);
      });
    }
  }, [scrollY, isMobile]);
  
  // Check for mobile devices on mount and when window resizes
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle scroll with passive listener for better performance
  useEffect(() => {
    // Only add scroll listener if not on mobile
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll, isMobile]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden will-change-transform">
          <svg className="absolute left-0 top-0 h-full w-1/2 -translate-x-1/4 transform text-orange-50" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          
          <div className="fixed -top-24 -left-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-200 to-orange-50 opacity-30 blur-3xl"></div>
          <div className="fixed top-1/4 -right-20 w-72 h-72 rounded-full bg-gradient-to-tr from-orange-300 to-orange-100 opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block">Powerful Features</span>
              <span className="block text-orange-500">Simplified Experience</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover how Slush transforms the way you split bills and handle shared expenses with friends, roommates, and family.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Core Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold tracking-wide uppercase text-orange-500">Core Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Everything you need in one app</p>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Feature Item 1 */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="lg:pr-8">
                <div className="p-6 bg-orange-50 rounded-2xl mb-6 inline-block">
                  <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Quick Split Creation</h3>
                <p className="mt-4 text-lg text-gray-500">Create bill splits in seconds with our intuitive interface. Enter the total amount, add participants, and let Slush handle the rest.</p>
                <ul className="mt-6 space-y-3">
                  {['Even splits for simple bills', 'Custom amounts for each person', 'Percentage-based splits', 'Item-by-item assignment'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-orange-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Phone Mockup for Feature 1 */}
            <motion.div
              className="relative mt-10 lg:mt-0 mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-64 sm:w-72 h-[500px] sm:h-[550px] mx-auto rounded-[40px] bg-black border-[14px] border-gray-800 overflow-hidden shadow-2xl transform rotate-2">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-10"></div>
                
                <div className="h-full w-full bg-black py-6 px-4">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="text-white text-lg font-medium">New Slush</div>
                    <div className="w-5"></div>
                  </div>
                  
                  {/* Amount input */}
                  <div className="text-center mb-6">
                    <span className="block text-white text-sm">Enter Amount</span>
                    <div className="text-5xl font-bold text-orange-500 mt-2">$74.36</div>
                    <span className="block text-gray-400 text-xs mt-1">USD</span>
                  </div>
                  
                  {/* Split options */}
                  <div className="bg-gray-800 rounded-xl p-4 mb-4">
                    <h4 className="text-white font-medium mb-3">Split Options</h4>
                    <div className="flex justify-between space-x-3">
                      <div className="flex-1 bg-gray-700 rounded-lg py-3 px-2 text-center text-white text-sm font-medium border-2 border-orange-500">Even</div>
                      <div className="flex-1 bg-gray-700 rounded-lg py-3 px-2 text-center text-gray-300 text-sm font-medium">Custom</div>
                      <div className="flex-1 bg-gray-700 rounded-lg py-3 px-2 text-center text-gray-300 text-sm font-medium">Items</div>
                    </div>
                  </div>
                  
                  {/* Participants */}
                  <div className="bg-gray-800 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-white font-medium">Participants</h4>
                      <button className="text-orange-500 text-sm">+ Add</button>
                    </div>
                    
                    {/* Participant list */}
                    <div className="space-y-3">
                      {[
                        { name: 'You', amount: '$18.59', status: 'Paid', owner: true },
                        { name: 'Alex', amount: '$18.59', status: 'Pending' },
                        { name: 'Taylor', amount: '$18.59', status: 'Pending' },
                        { name: 'Jordan', amount: '$18.59', status: 'Pending' }
                      ].map((person, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{person.name.charAt(0)}</span>
                            </div>
                            <span className="ml-2 text-white">{person.name}</span>
                            {person.owner && <span className="ml-2 text-xs text-orange-500">(Owner)</span>}
                          </div>
                          <div className="text-right">
                            <div className="text-white">{person.amount}</div>
                            <div className={`text-xs ${person.status === 'Paid' ? 'text-green-500' : 'text-amber-500'}`}>{person.status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Create button */}
                  <button className="w-full bg-orange-500 text-white py-3 rounded-full text-base font-medium mt-auto">
                    Create & Share Slush
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Feature Item 2 */}
            <motion.div 
              className="relative mt-20 lg:mt-32"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="lg:pr-8">
                <div className="p-6 bg-orange-50 rounded-2xl mb-6 inline-block">
                  <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Flexible Payment Options</h3>
                <p className="mt-4 text-lg text-gray-500">Connect with multiple payment methods and let everyone pay how they prefer. No more app-switching or payment limitations.</p>
                <ul className="mt-6 space-y-3">
                  {['Venmo integration', 'Cash App support', 'PayPal compatibility', 'Direct bank transfers', 'Payment tracking & reminders'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-orange-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Phone Mockup for Feature 2 */}
            <motion.div
              className="relative mt-10 lg:mt-0 mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-64 sm:w-72 h-[500px] sm:h-[550px] mx-auto rounded-[40px] bg-black border-[14px] border-gray-800 overflow-hidden shadow-2xl transform -rotate-2">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-10"></div>
                
                <div className="h-full w-full bg-black py-6 px-4">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="text-white text-lg font-medium">Payment Methods</div>
                    <div className="w-5"></div>
                  </div>
                  
                  {/* Payment methods list */}
                  <div className="space-y-4">
                    {[
                      { name: 'Venmo', color: 'bg-blue-600', icon: '$', selected: true },
                      { name: 'Cash App', color: 'bg-green-600', icon: '$', selected: false },
                      { name: 'PayPal', color: 'bg-indigo-600', icon: 'P', selected: false },
                      { name: 'Bank Transfer', color: 'bg-gray-600', icon: 'B', selected: false }
                    ].map((method, index) => (
                      <div key={index} className={`p-4 rounded-xl ${method.selected ? 'bg-gray-800 border-2 border-orange-500' : 'bg-gray-800'}`}>
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${method.color} rounded-lg flex items-center justify-center`}>
                            <span className="text-white font-bold">{method.icon}</span>
                          </div>
                          <div className="ml-3">
                            <p className="text-white font-medium">{method.name}</p>
                            {method.selected ? (
                              <p className="text-green-500 text-xs">Connected</p>
                            ) : (
                              <p className="text-gray-400 text-xs">Tap to connect</p>
                            )}
                          </div>
                          <div className="ml-auto">
                            {method.selected && (
                              <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 bg-gray-800 rounded-xl p-4">
                    <h4 className="text-white font-medium mb-3">Default Payment Method</h4>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">$</span>
                      </div>
                      <div className="ml-3">
                        <p className="text-white font-medium">Venmo</p>
                        <p className="text-gray-400 text-xs">Used for receiving payments</p>
                      </div>
                      <div className="ml-auto">
                        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add payment method button */}
                  <button className="w-full bg-orange-500 text-white py-3 rounded-full text-base font-medium mt-6">
                    Add Payment Method
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Feature Item 3 */}
            <motion.div 
              className="relative mt-20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="lg:pr-8">
                <div className="p-6 bg-orange-50 rounded-2xl mb-6 inline-block">
                  <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Group History & Tracking</h3>
                <p className="mt-4 text-lg text-gray-500">Keep a record of all your shared expenses. See who's paid, who still owes, and track payment history across multiple bills.</p>
                <ul className="mt-6 space-y-3">
                  {['Automatic payment tracking', 'Group expense history', 'Expense categorization', 'Export financial summaries', 'Payment reminders'].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-orange-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
            
            {/* Phone Mockup for Feature 3 */}
            <motion.div
              className="relative mt-10 lg:mt-0 mx-auto lg:mx-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative w-64 sm:w-72 h-[500px] sm:h-[550px] mx-auto rounded-[40px] bg-black border-[14px] border-gray-800 overflow-hidden shadow-2xl transform rotate-1">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-10"></div>
                
                <div className="h-full w-full bg-black py-6 px-4">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="text-white text-lg font-medium">Group History</div>
                    <div className="w-5"></div>
                  </div>
                  
                  {/* Group Info */}
                  <div className="bg-gray-800 rounded-xl p-4 mb-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-white font-medium">Roommates</h3>
                        <p className="text-gray-400 text-xs">4 members · 12 transactions</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <div className="bg-gray-700 rounded-lg p-2">
                        <p className="text-gray-400 text-xs">Total Spent</p>
                        <p className="text-white font-bold">$1,243.88</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-2">
                        <p className="text-gray-400 text-xs">Your Share</p>
                        <p className="text-white font-bold">$310.97</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Transaction History */}
                  <div className="space-y-3 mb-4">
                    <h4 className="text-white font-medium">Recent Transactions</h4>
                    
                    {[
                      { title: 'Utilities - March', date: 'Mar 15, 2025', amount: '$87.45', paid: true },
                      { title: 'Grocery Run', date: 'Mar 10, 2025', amount: '$124.53', paid: true },
                      { title: 'Internet Bill', date: 'Mar 5, 2025', amount: '$60.00', paid: false }
                    ].map((transaction, index) => (
                      <div key={index} className="bg-gray-800 rounded-xl p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white font-medium">{transaction.title}</p>
                            <p className="text-gray-400 text-xs">{transaction.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{transaction.amount}</p>
                            <p className={`text-xs ${transaction.paid ? 'text-green-500' : 'text-amber-500'}`}>
                              {transaction.paid ? 'Paid' : 'Pending'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* View All button */}
                  <button className="w-full bg-gray-800 text-white py-3 rounded-full text-base font-medium">
                    View All Transactions
                  </button>
                  
                  {/* Create New button */}
                  <button className="w-full bg-orange-500 text-white py-3 rounded-full text-base font-medium mt-3">
                    Create New Slush
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Advanced Features Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold tracking-wide uppercase text-orange-500">Advanced Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Take expense sharing to the next level</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Slush goes beyond basic expense splitting with powerful tools designed for every situation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Recurring Expenses",
                description: "Set up automatic monthly splits for rent, utilities, subscriptions, and other recurring bills.",
                icon: (
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                ),
                delay: 0
              },
              {
                title: "Group Management",
                description: "Create and save groups of friends, roommates, or family members for faster expense creation.",
                icon: (
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                delay: 0.1
              },
              {
                title: "Expense Categories",
                description: "Categorize expenses to track spending patterns and simplify budgeting across shared costs.",
                icon: (
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                ),
                delay: 0.2
              },
              {
                title: "Expense Reports",
                description: "Generate detailed reports to show payment history, outstanding balances, and spending trends.",
                icon: (
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
                delay: 0.3
              },
              {
                title: "Multi-Currency Support",
                description: "Split bills in different currencies with automatic conversion for international trips and expenses.",
                icon: (
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                delay: 0.4
              },
              {
                title: "Offline Mode",
                description: "Create and manage expenses even without an internet connection. Changes sync when you're back online.",
                icon: (
                  <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                ),
                delay: 0.5
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-xl p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: feature.delay }}
              >
                <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Integration Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold tracking-wide uppercase text-orange-500">Integrations</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Connects with your favorite apps</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Slush seamlessly integrates with the services you already use every day.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                name: "Venmo",
                icon: (
                  <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.5 3h-13C4.1 3 3 4.1 3 5.5v13C3 19.9 4.1 21 5.5 21h13c1.4 0 2.5-1.1 2.5-2.5v-13C21 4.1 19.9 3 18.5 3zM17 12c-.6 2.3-3 5.3-4.5 6.5-1.5-1.2-3.9-4.2-4.5-6.5C8 9.7 9 7.5 12 7.5s4 2.2 4 4.5z" />
                  </svg>
                ),
                delay: 0
              },
              {
                name: "PayPal",
                icon: (
                  <svg className="h-8 w-8 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.1 6.75c.08.47.13.97.13 1.5a6 6 0 0 1-5.02 5.92l-.73 3.58A1.5 1.5 0 0 1 13 19h-2a.5.5 0 0 1-.49-.62l.33-1.63A6 6 0 0 1 5 11a6 6 0 0 1 6-6h6c1.54 0 2.94.58 4 1.54a5.99 5.99 0 0 1-.9.21z" />
                    <path d="M16.75 5H9a3.75 3.75 0 0 0 0 7.5h1.44l-.18.88A1.5 1.5 0 0 0 11.75 15h2c.62 0 1.17-.38 1.38-.97l1.21-5.94c.15-.77.84-1.34 1.66-1.34h-.73A3.71 3.71 0 0 0 16.75 5z" />
                  </svg>
                ),
                delay: 0.1
              },
              {
                name: "Cash App",
                icon: (
                  <svg className="h-8 w-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16v-2h2v2h-2zm0-4V8h2v6h-2z" />
                  </svg>
                ),
                delay: 0.2
              },
              {
                name: "Zelle",
                icon: (
                  <svg className="h-8 w-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                ),
                delay: 0.3
              },
              {
                name: "Google Pay",
                icon: (
                  <svg className="h-8 w-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.95 10.23l-6.95 3.83v-7.67L16.95 10.23z" />
                    <path d="M3 6.39l10 5.5v2.22l-10-5.5V6.39z" />
                    <path d="M3 11.61l10 5.5v2.22l-10-5.5v-2.22z" />
                    <path d="M21 8.61l-10 5.5v-2.22l10-5.5v2.22z" />
                    <path d="M21 13.83l-10 5.5v-2.22l10-5.5v2.22z" />
                  </svg>
                ),
                delay: 0.4
              },
              {
                name: "Apple Pay",
                icon: (
                  <svg className="h-8 w-8 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.5 2a3.45 3.45 0 0 0-2.5 1 3.49 3.49 0 0 0-1-2 3.49 3.49 0 0 0-2 1 4.93 4.93 0 0 0-1.5 3c0 2 1.5 3.5 1.5 3.5S5 10 5 14.5c0 3.5 3 4.5 4 4.5 2 0 3-1 3-1s1 1 3 1c1 0 4-1 4-4.5 0-4.5-4-5.5-4-5.5S16 9 16 7c0-1-.5-2-1.5-3a3.49 3.49 0 0 0-2-1c-.83 0-1.6.41-2 1.06A3.49 3.49 0 0 0 14.5 2z" />
                  </svg>
                ),
                delay: 0.5
              },
              {
                name: "Stripe",
                icon: (
                  <svg className="h-8 w-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.8 5.4c-1.1-.5-2.2-.7-3.3-.7-1.3 0-2.4.3-3.3.8-1 .5-1.7 1.3-2.2 2.2-.5 1-.8 2.1-.8 3.4 0 1.3.3 2.4.8 3.4.5 1 1.2 1.7 2.2 2.2.9.5 2 .8 3.3.8 1.2 0 2.3-.2 3.3-.7 1-.5 1.8-1.2 2.4-2.1l-1.8-1.3c-.4.6-.9 1.1-1.5 1.4-.6.3-1.3.5-2.1.5-.8 0-1.5-.2-2.1-.5-.6-.4-1-.9-1.3-1.5-.3-.6-.5-1.3-.5-2.1 0-.8.2-1.5.5-2.1.3-.6.7-1.1 1.3-1.5.6-.4 1.3-.5 2.1-.5.8 0 1.5.2 2.1.5.6.3 1.1.8 1.5 1.4l1.8-1.3c-.6-.9-1.4-1.6-2.4-2.1z" />
                    <path d="M19.2 13.1L17 14.3v-7h-2v10h2v-1.5l.8-.4 1.5 1.9h2.3l-2.4-3.2z" />
                  </svg>
                ),
                delay: 0.6
              },
              {
                name: "Banking",
                icon: (
                  <svg className="h-8 w-8 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 10v7h3v-7H4zm6 0v7h3v-7h-3zM2 22h19v-3H2v3zm14-12v7h3v-7h-3zm-8-6L2 9h19L16 4H8z" />
                  </svg>
                ),
                delay: 0.7
              }
            ].map((app, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: app.delay }}
              >
                <div className="mb-2">
                  {app.icon}
                </div>
                <p className="text-gray-900 font-medium text-center">{app.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold tracking-wide uppercase text-orange-500">Testimonials</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">What our users say</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Don't just take our word for it. Here's what people love about Slush.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Slush has completely eliminated the awkwardness of asking friends for money. Everyone can see what they owe in real-time, and payments are a breeze.",
                name: "Alex T.",
                title: "Frequent Traveler",
                delay: 0
              },
              {
                quote: "As a roommate in a house of 5, keeping track of utilities and groceries was a nightmare until we started using Slush. Now we just scan receipts and everyone gets charged automatically.",
                name: "Jordan W.",
                title: "College Student",
                delay: 0.2
              },
              {
                quote: "The flexibility to split bills in different ways is what makes Slush stand out. Sometimes we split evenly, sometimes by percentage - the app handles it all beautifully.",
                name: "Morgan K.",
                title: "Finance Professional",
                delay: 0.4
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-xl p-6 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: testimonial.delay }}
              >
                <div className="mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 text-yellow-400 inline-block" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent mix-blend-overlay"></div>
            <div className="absolute -left-20 top-10">
              <svg className="w-40 h-40 text-white opacity-10" fill="currentColor" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" />
              </svg>
            </div>
            <div className="absolute -right-20 bottom-10">
              <svg className="w-60 h-60 text-white opacity-10" fill="currentColor" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" />
              </svg>
            </div>
            
            <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32 lg:px-16 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to simplify your shared expenses?
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-orange-50">
                Download Slush today and experience the easiest way to split bills with friends, roommates, and family.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#" className="px-8 py-3 bg-white text-orange-600 rounded-full font-medium shadow-lg hover:bg-orange-50 transition-colors">
                  Download for iOS
                </a>
                <a href="#" className="px-8 py-3 bg-transparent text-white border-2 border-white rounded-full font-medium hover:bg-white/10 transition-colors">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold tracking-wide uppercase text-orange-500">FAQs</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">Frequently asked questions</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              Have questions about Slush? We've got answers.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto divide-y divide-gray-200">
            {[
              {
                question: "Is Slush free to use?",
                answer: "Slush offers a free basic plan that includes all essential bill-splitting features. We also offer a premium plan with advanced features like receipt scanning, recurring bills, and detailed financial reports.",
                delay: 0
              },
              {
                question: "Which payment methods are supported?",
                answer: "Slush integrates with most major payment platforms including Venmo, PayPal, Cash App, Zelle, and direct bank transfers. We're constantly adding new payment options to give you maximum flexibility.",
                delay: 0.1
              },
              {
                question: "Can I use Slush for business expenses?",
                answer: "Absolutely! Many small businesses and teams use Slush to track shared business expenses, client dinners, and project costs. Our detailed expense tracking and reporting features are perfect for business use.",
                delay: 0.2
              },
              {
                question: "How does Slush handle different currencies?",
                answer: "Slush supports multiple currencies and automatically converts amounts using up-to-date exchange rates. This makes it perfect for travel groups, international roommates, or anyone dealing with expenses in multiple currencies.",
                delay: 0.3
              },
              {
                question: "Is my financial data secure with Slush?",
                answer: "Security is our top priority. Slush uses bank-level encryption to protect your financial data, and we never store actual payment credentials. We comply with all relevant data protection regulations and undergo regular security audits.",
                delay: 0.4
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="py-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: faq.delay }}
              >
                <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                <p className="mt-3 text-gray-500">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Add global styles for performance optimization and responsiveness */}
      <style jsx global>{`
        /* Performance optimizations */
        .contain-layout {
          contain: layout;
        }
        .contain-paint {
          contain: paint;
        }
        
        /* Optimize DOM rendering */
        .contain-strict {
          contain: strict;
        }
        
        /* Reduce layout thrashing - only apply will-change to elements that actually need it */
        .will-change-transform {
          will-change: transform;
        }
        
        /* Reduce scrolling jank */
        html, body {
          scroll-behavior: smooth;
          overscroll-behavior-y: none; /* Prevents bounce effects that can cause performance issues */
        }
        
        /* Optimize expensive animations */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
        
        `}</style>
    </Layout>
  );
}