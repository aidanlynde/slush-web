import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/about" className="text-base text-gray-500 hover:text-gray-900">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">App</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/download" className="text-base text-gray-500 hover:text-gray-900">
                  Download
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-base text-gray-500 hover:text-gray-900">
                  Features
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} Slush. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}