import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function AboutPage() {
  const [scrollY, setScrollY] = useState(0);
  
  // Optimize scroll handler with useCallback and throttling
  const handleScroll = useCallback(() => {
    // Throttle scroll updates to improve performance
    if (!window.requestAnimationFrame) {
      setScrollY(window.scrollY);
      return;
    }
    
    window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });
  }, []);
  
  // Handle scroll with passive listener for better performance
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-white py-16 sm:py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden will-change-transform">
          <div className="fixed -top-24 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-200 to-orange-50 opacity-30 blur-3xl"></div>
          <div className="fixed top-1/4 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-orange-300 to-orange-100 opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block">Reimagining</span>
              <span className="block text-orange-500">Shared Finances</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We're on a mission to eliminate awkward money conversations and make expense sharing effortless for everyone.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Mission Section with Phone Visual */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base font-semibold tracking-wide uppercase text-orange-500">Our Mission</h2>
              <p className="mt-3 text-3xl font-extrabold text-gray-900">Making shared expenses stress-free</p>
              <p className="mt-5 text-lg text-gray-500">
                Born from our own frustrations with splitting expenses, Slush was created to solve the universal problem of shared finances.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Our elegant solution simplifies the entire process from bill splitting to payment collection, ensuring everyone pays their fair share without the awkward reminders.
              </p>
              
              <div className="mt-8 space-y-4">
                {[
                  { title: "User-Focused", description: "Every feature is designed with real users in mind, solving actual pain points." },
                  { title: "Innovative", description: "We continuously push the boundaries of what expense-sharing apps can do." },
                  { title: "Reliable", description: "Built on a robust foundation to ensure your financial data is always accurate and secure." }
                ].map((value, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-orange-500 text-white">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{value.title}</h3>
                      <p className="mt-1 text-gray-500">{value.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative lg:pl-12"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                transform: `rotate(${2 + (scrollY * 0.003)}deg)`
              }}
            >
              <div className="relative mx-auto w-64 sm:w-72 h-[500px] sm:h-[550px] rounded-[40px] bg-black border-[14px] border-gray-800 overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-10"></div>
                
                <div className="h-full w-full bg-black py-6 px-4">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-white text-lg font-medium">Slush</div>
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">S</span>
                    </div>
                  </div>
                  
                  {/* Dashboard Overview */}
                  <div className="bg-gray-800 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-white font-medium">Overview</h3>
                      <span className="text-orange-500 text-sm">March 2025</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-400 text-xs">You are owed</p>
                        <p className="text-green-500 font-bold text-xl">$128.45</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-3">
                        <p className="text-gray-400 text-xs">You owe</p>
                        <p className="text-amber-500 font-bold text-xl">$42.90</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Active Groups */}
                  <div className="mb-4">
                    <h3 className="text-white font-medium mb-3">Your Groups</h3>
                    
                    <div className="space-y-2.5">
                      {[
                        { name: "Roommates", members: 4, pending: 2 },
                        { name: "Road Trip", members: 6, pending: 0 },
                        { name: "Dinner Club", members: 8, pending: 3 }
                      ].map((group, index) => (
                        <div key={index} className="bg-gray-800 rounded-xl p-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-white font-medium">
                              {group.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-white">{group.name}</p>
                              <p className="text-gray-400 text-xs">{group.members} members</p>
                            </div>
                          </div>
                          {group.pending > 0 && (
                            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                              {group.pending} pending
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex space-x-3 mb-4">
                    <button className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg text-sm font-medium">
                      New Slush
                    </button>
                    <button className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium">
                      Settle Up
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Coming Soon Features Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base font-semibold tracking-wide uppercase text-orange-500">Coming Soon</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">The future of Slush</p>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
              We're constantly innovating to make expense sharing even more effortless. Here's a sneak peek at what's coming next.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Smart Receipt Scanning Feature */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mx-auto w-64 sm:w-72 h-[500px] sm:h-[550px] rounded-[40px] bg-black border-[14px] border-gray-800 overflow-hidden shadow-2xl transform -rotate-2">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-10"></div>
                
                <div className="h-full w-full bg-black py-6 px-4">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="text-white text-lg font-medium">Scan Receipt</div>
                    <div className="w-5"></div>
                  </div>
                  
                  {/* Receipt Preview */}
                  <div className="bg-gray-800 rounded-xl p-3 mb-4">
                    <div className="bg-white rounded-lg p-2 h-48 flex flex-col items-center justify-center">
                      <div className="w-full border-b border-gray-200 pb-2 text-center">
                        <p className="text-gray-900 font-medium">GROCERY MARKET</p>
                        <p className="text-xs text-gray-500">123 Main Street</p>
                        <p className="text-xs text-gray-500">March 13, 2025 • 2:45 PM</p>
                      </div>
                      
                      <div className="w-full py-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-800">Milk 1gal</span>
                          <span className="text-gray-800">$4.99</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-800">Eggs (12)</span>
                          <span className="text-gray-800">$3.49</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-800">Bread</span>
                          <span className="text-gray-800">$2.99</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-800">Apples (4)</span>
                          <span className="text-gray-800">$5.96</span>
                        </div>
                      </div>
                      
                      <div className="w-full border-t border-gray-200 pt-2 flex justify-between">
                        <span className="font-medium text-gray-900">TOTAL</span>
                        <span className="font-medium text-gray-900">$17.43</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-2">
                      <span className="text-green-500 text-xs font-medium flex items-center">
                        <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Receipt scanned successfully
                      </span>
                    </div>
                  </div>
                  
                  {/* Detected Items */}
                  <div className="bg-gray-800 rounded-xl p-4 mb-4">
                    <h4 className="text-white font-medium mb-3">Detected Items</h4>
                    
                    <div className="space-y-2">
                      {[
                        { name: "Milk 1gal", price: "$4.99", assigned: "Unassigned" },
                        { name: "Eggs (12)", price: "$3.49", assigned: "Unassigned" },
                        { name: "Bread", price: "$2.99", assigned: "You" },
                        { name: "Apples (4)", price: "$5.96", assigned: "Shared" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center bg-gray-700 rounded-lg p-2">
                          <div>
                            <p className="text-white text-sm">{item.name}</p>
                            <p className="text-gray-400 text-xs">{item.assigned}</p>
                          </div>
                          <p className="text-white font-medium">{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gray-800 text-white py-2.5 rounded-lg text-sm font-medium">
                      Adjust
                    </button>
                    <button className="flex-1 bg-orange-500 text-white py-2.5 rounded-lg text-sm font-medium">
                      Create Slush
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="order-1 lg:order-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="lg:pl-12">
                <div className="p-6 bg-orange-50 rounded-2xl mb-6 inline-block">
                  <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Smart Receipt Scanning</h3>
                <p className="mt-5 text-lg text-gray-500">
                  Simply take a photo of your receipt, and our AI will automatically identify items, prices, and even suggest how to split them based on your group's preferences.
                </p>
                
                <ul className="mt-6 space-y-3">
                  {[
                    "Instantly extract item names and prices",
                    "Automatic tax and tip calculation",
                    "Smart item assignment based on past behavior",
                    "Receipt history for expense tracking",
                    "Works with virtually any receipt format"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-orange-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 inline-flex items-center text-orange-500 font-medium">
                  <span>Coming Summer 2025</span>
                </div>
              </div>
            </motion.div>
            
            {/* Voice Activated Feature */}
            <motion.div 
              className="relative order-4 lg:order-3 mt-12 lg:mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mx-auto w-64 sm:w-72 h-[500px] sm:h-[550px] rounded-[40px] bg-black border-[14px] border-gray-800 overflow-hidden shadow-2xl transform rotate-2">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-6 w-40 bg-gray-800 rounded-b-xl z-10"></div>
                
                <div className="h-full w-full bg-black py-6 px-4">
                  {/* App header */}
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    </div>
                    <div className="text-white text-lg font-medium">Voice Assistant</div>
                    <div className="w-5"></div>
                  </div>
                  
                  {/* Voice UI */}
                  <div className="flex flex-col items-center justify-center mt-6">
                    <div className="w-24 h-24 rounded-full bg-gray-800 border-4 border-orange-500 flex items-center justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center animate-pulse">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                      </div>
                    </div>
                    
                    <p className="text-white text-lg font-medium mb-2">Listening...</p>
                    <p className="text-gray-400 text-sm text-center mb-6">
                      Say something like "Split the $45 dinner bill with Alex and Taylor"
                    </p>
                  </div>
                  
                  {/* Conversation */}
                  <div className="bg-gray-800 rounded-xl p-4 mb-4 h-52 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-orange-500 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm">Split a $85 dinner bill with Jordan and Casey</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="bg-gray-700 text-white rounded-2xl rounded-tl-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm">Creating a new Slush for $85 split evenly between you, Jordan, and Casey. Each person will pay $28.33. Is that correct?</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-orange-500 text-white rounded-2xl rounded-tr-none px-4 py-2 max-w-[80%]">
                          <p className="text-sm">Yes, that's correct</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Suggestion buttons */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <button className="bg-gray-800 text-white py-2 px-3 rounded-full text-sm">
                      Add tip
                    </button>
                    <button className="bg-gray-800 text-white py-2 px-3 rounded-full text-sm">
                      Split unevenly
                    </button>
                    <button className="bg-gray-800 text-white py-2 px-3 rounded-full text-sm">
                      Cancel
                    </button>
                  </div>
                  
                  {/* Confirm button */}
                  <button className="w-full bg-orange-500 text-white py-3 rounded-full text-base font-medium">
                    Confirm & Create
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="order-3 lg:order-4 mt-12 lg:mt-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="lg:pl-12">
                <div className="p-6 bg-orange-50 rounded-2xl mb-6 inline-block">
                  <svg className="h-8 w-8 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Voice & AI Assistant</h3>
                <p className="mt-5 text-lg text-gray-500">
                  Create splits, check balances, and manage expenses with natural voice commands. Our AI assistant understands context and handles complex requests.
                </p>
                
                <ul className="mt-6 space-y-3">
                  {[
                    "Create new bills with natural language",
                    "Ask for summaries of what you owe or are owed",
                    "Set up recurring payments via voice",
                    "Get spending insights and suggestions",
                    "Hands-free operation while driving or cooking"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-orange-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8 inline-flex items-center text-orange-500 font-medium">
                  <span>Coming Fall 2025</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Vision Statement Section */}
      <section className="py-16 sm:py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-base font-semibold tracking-wide uppercase text-orange-400">Our Vision</h2>
              <p className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">
                A world where money doesn't complicate relationships
              </p>
              <p className="mt-6 text-xl text-gray-300 leading-relaxed">
                We envision a future where shared expenses strengthen rather than strain relationships. Where financial clarity leads to stronger connections. Where everyone can focus on enjoying experiences together instead of worrying about who pays what.
              </p>
              <p className="mt-6 text-xl text-gray-300 leading-relaxed">
                Slush is more than an app—it's a movement towards healthier, more transparent financial relationships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent mix-blend-overlay"></div>
            
            <div className="relative px-6 py-16 sm:px-12 sm:py-24 lg:py-32 lg:px-16 text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Join the financial harmony revolution
              </h2>
              <p className="mt-6 max-w-2xl mx-auto text-lg text-orange-50">
                Download Slush today and experience the future of bill splitting and expense sharing.
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
      
      {/* Add global styles for performance optimization and responsiveness */}
      <style jsx global>{`
        /* Performance optimizations */
        .contain-layout {
          contain: layout;
        }
        .contain-paint {
          contain: paint;
        }
        /* Reduce layout thrashing */
        .will-change-transform {
          will-change: transform;
        }
        /* Reduce scrolling jank */
        html, body {
          scroll-behavior: smooth;
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
        /* Hardware acceleration for smoother scrolling */
        .phone-mockup {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        /* Extra animation optimization for mobile */
        @media (max-width: 640px) {
          .will-change-transform {
            will-change: auto;
          }
        }
        
        /* Improve touch target sizes on mobile */
        @media (max-width: 640px) {
          button, a {
            min-height: 44px;
          }
        }
      `}</style>
    </Layout>
  );
}