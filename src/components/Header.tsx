import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center -ml-20 mb-5">
              <div className="relative h-8 w-auto">
                <Image 
                  src="/slush-logo-large.png" 
                  alt="Slush Logo"
                  width={300}
                  height={30}
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop nav */}
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <Link href="/about" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              About
            </Link>
            <Link href="/features" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Features
            </Link>
            <Link 
              href="/download" 
              className="inline-flex items-center px-4 h-8 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-orange-500 hover:bg-orange-600 mt-4"
              style={{ lineHeight: '1.25rem' }}
              >
              Download
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              About
            </Link>
            <Link href="/features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
              Features
            </Link>
            <Link href="/download" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-orange-500 hover:bg-orange-600 px-3 py-2 rounded-md">
              Download
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}