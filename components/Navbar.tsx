import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Side: Logo and Primary Links */}
          <div className="flex items-center gap-10">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {/* Replace with your actual logo later */}
              <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                ParkSmart
              </span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors">
                Home
              </Link>
              <Link href="/how-it-works" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors">
                How it Works
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-semibold transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Right Side: Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-bold transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Sign Up
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}