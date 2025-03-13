import Link from 'next/link';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function HomePage() {
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
      {/* Hero Section with Phone Mockups */}
      <section className="relative bg-white overflow-hidden">
        {/* Performance optimized background elements */}
        <div className="absolute inset-0 overflow-hidden will-change-transform">
          <svg className="absolute right-0 top-0 h-full w-1/2 translate-x-1/4 transform text-orange-50" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          
          {/* Simplified background shapes for better performance */}
          <div className="fixed -top-24 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-orange-200 to-orange-50 opacity-30 blur-3xl"></div>
          <div className="fixed top-1/4 -left-20 w-72 h-72 rounded-full bg-gradient-to-tr from-orange-300 to-orange-100 opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-16 md:py-24 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text content - improved for mobile */}
            <div className="text-center lg:text-left">
              <motion.h1 
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="block">Split Bills</span>
                <span className="block text-orange-500">Effortlessly</span>
              </motion.h1>
              
              <motion.p 
                className="mt-4 sm:mt-6 max-w-xl mx-auto lg:mx-0 text-lg sm:text-xl text-gray-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                No more awkward money conversations. Split bills, get paid back, and track who owes what with Slush.
              </motion.p>
              
              <motion.div 
                className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/download" className="px-6 sm:px-8 py-3 rounded-full font-medium text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all">
                  Download App
                </Link>
                <Link href="/learn-more" className="px-6 sm:px-8 py-3 rounded-full font-medium text-orange-600 bg-white border border-orange-200 hover:border-orange-300 hover:shadow-lg hover:shadow-orange-50 transition-all">
                  Learn More
                </Link>
              </motion.div>
            </div>
            
            {/* Phone mockups - optimized for mobile */}
            <div className="relative mt-8 lg:mt-0 h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] will-change-transform mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Main phone - responsive sizing */}
              <motion.div 
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="relative w-52 sm:w-64 md:w-72 h-[400px] sm:h-[480px] md:h-[550px] rounded-[40px] bg-black border-[14px] border-gray-800 overflow-hidden shadow-xl sm:shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-5 sm:h-6 w-28 sm:w-40 bg-gray-800 rounded-b-xl z-10"></div>
                  
                  {/* Screen Content */}
                  <div className="h-full w-full bg-black pt-6 sm:pt-8 pb-4 sm:pb-6 px-3 sm:px-4">
                    {/* App header */}
                    <div className="flex justify-between items-center mb-3 sm:mb-4">
                      <div className="flex items-center">
                        <svg className="h-4 sm:h-5 w-4 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                      </div>
                      <div className="text-white text-base sm:text-lg font-medium">Share Slush</div>
                      <div className="w-4 sm:w-5"></div>
                    </div>
                    
                    {/* Amount display */}
                    <div className="text-center mb-4 sm:mb-6">
                      <span className="block text-white text-xs sm:text-sm">Total Amount</span>
                      <span className="block text-3xl sm:text-4xl font-bold text-orange-500 mt-2 sm:mt-4">$49.99</span>
                    </div>
                    
                    {/* QR Code */}
                    <div className="flex justify-center mb-2 sm:mb-3">
                      <div className="w-36 sm:w-44 md:w-48 h-36 sm:h-44 md:h-48 bg-white flex items-center justify-center">
                        <Image 
                          src="/frame.png" 
                          alt="QR Code to slush-app.com"
                          width={160}
                          height={160}
                          className="w-32 sm:w-40 md:w-44 h-32 sm:h-40 md:h-44"
                          priority
                        />
                      </div>
                    </div>
                    
                    <div className="text-center text-white text-[10px] sm:text-xs mb-4 sm:mb-8 px-3">
                      Share this QR code with your friends to split the payment
                    </div>
                    
                    <button className="w-full mb-4 sm:mb-6 bg-orange-500 text-white py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium">
                      Share Payment Link
                    </button>
                    
                  </div>
                </div>
              </motion.div>
              
              {/* Secondary phone - responsive sizing and positioning */}
              <motion.div 
                className="absolute hidden sm:block left-[58%] top-[45%] transform -translate-y-1/2 z-10 opacity-90 will-change-transform"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 0.75, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{
                  transform: `translate(-50%, -50%) rotate(${3 + (scrollY * 0.005)}deg)`
                }}
              >
                <div className="relative w-40 md:w-48 lg:w-56 h-[320px] md:h-[400px] lg:h-[450px] rounded-[32px] sm:rounded-[36px] bg-black border-[8px] sm:border-[10px] border-gray-800 shadow-lg sm:shadow-xl overflow-hidden">
                  {/* Screen Content */}
                  <div className="h-full w-full bg-black py-4 md:py-6 px-2 md:px-3 overflow-hidden">
                    {/* App header */}
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                      {/* Hamburger menu */}
                      <div className="flex flex-col gap-0.5 md:gap-1">
                        <div className="w-4 md:w-5 h-0.5 bg-orange-500 rounded-full"></div>
                        <div className="w-4 md:w-5 h-0.5 bg-orange-500 rounded-full"></div>
                        <div className="w-4 md:w-5 h-0.5 bg-orange-500 rounded-full"></div>
                      </div>
                      
                      {/* Profile icon */}
                      <div className="w-5 md:w-6 h-5 md:h-6 rounded-full bg-orange-500 flex items-center justify-center">
                        <svg className="h-2.5 md:h-3 w-2.5 md:w-3 text-black" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0 2c-5.52 0-10 2.98-10 7v1c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-1c0-4.02-4.48-7-10-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Amount display */}
                    <div className="text-center mb-5 md:mb-8">
                      <span className="block text-2xl md:text-3xl font-medium text-white">$49.99</span>
                    </div>
                    
                    {/* Keypad - smaller to fit within phone */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, '←'].map((key, i) => (
                        <div key={i} className="flex items-center justify-center text-white text-base md:text-xl font-light">
                          {key}
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute bottom-4 md:bottom-6 left-2 md:left-3 right-2 md:right-3">
                      <button className="w-full bg-orange-500 text-white py-2 md:py-2.5 rounded-full text-xs md:text-base font-medium">
                        Create Slush
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section - Mobile Optimized */}
      <section className="bg-gray-50 py-12 sm:py-16 md:py-24 contain-layout">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2 
              className="text-base font-semibold tracking-wide uppercase text-orange-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Features
            </motion.h2>
            <motion.p 
              className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900 md:text-4xl tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Everything you need to split bills
            </motion.p>
            <motion.p 
              className="mt-3 md:mt-4 max-w-2xl text-lg sm:text-xl text-gray-500 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Slush makes it simple to split expenses and get paid back quickly.
            </motion.p>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-16">
            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Feature Cards - Responsive for mobile */}
              {[
                {
                  title: "Create payment sessions",
                  description: "Enter the total amount, split it evenly or customize each person's share in just a few taps.",
                  icon: (
                    <svg className="h-5 sm:h-6 w-5 sm:w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  ),
                  delay: 0
                },
                {
                  title: "Share instantly",
                  description: "Generate QR codes and payment links to share with your friends for quick and seamless payments.",
                  icon: (
                    <svg className="h-5 sm:h-6 w-5 sm:w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  delay: 0.2
                },
                {
                  title: "Multiple payment methods",
                  description: "Choose from Venmo, Cash App, PayPal, and more to accommodate everyone's preferred payment method.",
                  icon: (
                    <svg className="h-5 sm:h-6 w-5 sm:w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  ),
                  delay: 0.4
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="relative pt-8 sm:pt-10 px-4 sm:px-6 pb-6 sm:pb-8 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden will-change-transform"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-500"></div>
                  <div>
                    <div className="absolute -top-8 -right-8 w-32 sm:w-40 h-32 sm:h-40 bg-orange-100 rounded-full opacity-30"></div>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-orange-100 rounded-md shadow">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="mt-6 sm:mt-8 text-lg sm:text-xl font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Mobile Optimized */}
      <section className="bg-white py-12 sm:py-16 contain-paint contain-layout">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 shadow-lg sm:shadow-xl">
            <div className="absolute inset-0">
              {/* Simplified gradient background for better performance */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 translate-y-[-30%] w-[800px] h-[800px] rounded-full bg-white opacity-10"></div>
              <div className="absolute right-1/4 bottom-0 transform translate-y-1/2 w-[600px] h-[600px] rounded-full bg-white opacity-5"></div>
            </div>
            <div className="relative px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24 lg:px-16">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
                <div className="text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                    Ready to simplify bill splitting?
                  </h2>
                  <p className="mt-3 sm:mt-4 text-base sm:text-lg text-orange-100">
                    Download Slush today and say goodbye to awkward money talks. 
                    Split bills effortlessly and keep track of who paid what.
                  </p>
                  <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a href="#" className="px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-white bg-white text-orange-600 rounded-full font-medium hover:bg-orange-50 transition-colors shadow-lg">
                      Download for iOS
                    </a>
                    {/* <a href="#" className="px-5 sm:px-6 py-2.5 sm:py-3 border-2 border-white text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
                      Download for Android
                    </a> */}
                  </div>
                </div>
                
                {/* Mobile phone mockup */}
                <div className="mt-10 lg:mt-0 flex justify-center will-change-transform">
                  <div className="relative w-52 sm:w-64 h-[400px] sm:h-[500px] rounded-[36px] sm:rounded-[40px] bg-black border-[10px] sm:border-[14px] border-gray-800 overflow-hidden shadow-xl sm:shadow-2xl transform rotate-3">
                    <div className="h-full w-full bg-black px-2.5 sm:px-3 py-4 sm:py-6 flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-3 sm:mb-4">
                        <svg className="h-4 sm:h-5 w-4 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <div className="text-white text-sm sm:text-base font-medium">Slush Details</div>
                        <svg className="h-4 sm:h-5 w-4 sm:w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </div>
                      
                      {/* Slush Info Card */}
                      <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-white text-sm sm:text-base font-medium">Slush #da3439b7</p>
                            <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 sm:mt-1">Created on Mon, Mar 10, 2025 at 9:07 AM</p>
                          </div>
                          <div className="px-1.5 sm:px-2 py-0.5 bg-amber-800/60 rounded text-amber-400 text-[10px] sm:text-xs font-medium">
                            PENDING
                          </div>
                        </div>
                        <p className="text-orange-500 text-2xl sm:text-4xl font-bold mt-2 sm:mt-3">$300.00</p>
                        <p className="text-gray-400 text-[10px] sm:text-xs">USD</p>
                      </div>
                      
                      {/* Payment Progress */}
                      <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3">
                        <p className="text-white text-sm sm:text-lg font-medium mb-2 sm:mb-3">Payment Progress</p>
                        <div className="grid grid-cols-3 gap-1 sm:gap-2">
                          <div>
                            <p className="text-white text-sm sm:text-base font-medium">$0.00</p>
                            <p className="text-gray-400 text-[10px] sm:text-xs">Collected</p>
                          </div>
                          <div>
                            <p className="text-white text-sm sm:text-base font-medium">0%</p>
                            <p className="text-gray-400 text-[10px] sm:text-xs">Complete</p>
                          </div>
                          <div>
                            <p className="text-white text-sm sm:text-base font-medium">1/3</p>
                            <p className="text-gray-400 text-[10px] sm:text-xs">Claimed</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Participants */}
                      <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3">
                        <p className="text-white text-sm sm:text-lg font-medium">Participants</p>
                      </div>
                      
                      {/* Available Payment Methods */}
                      <div className="bg-gray-800/70 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-2 sm:mb-3">
                        <p className="text-white text-sm sm:text-lg font-medium mb-2 sm:mb-3">Available Payment Methods</p>
                        <div className="flex items-center">
                          <div className="w-5 sm:w-7 h-5 sm:h-7 bg-blue-600 flex items-center justify-center rounded mr-2">
                            <span className="text-white font-bold text-[10px] sm:text-xs">$</span>
                          </div>
                          <span className="text-white text-sm sm:text-base">Venmo</span>
                        </div>
                      </div>
                      
                      {/* Share Button */}
                      <div className="mt-auto">
                        <button className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium flex items-center justify-center">
                          <svg className="h-4 sm:h-5 w-4 sm:w-5 mr-1 sm:mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                          </svg>
                          Share Slush
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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