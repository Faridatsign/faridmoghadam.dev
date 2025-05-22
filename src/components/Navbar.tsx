import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#order' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      // Focus the input after expansion animation
      setTimeout(() => {
        const input = document.querySelector('.search-input') as HTMLInputElement;
        if (input) input.focus();
      }, 300);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="text-lg font-light text-gray-800 hover:text-gray-900"
          >
            Farid Moghadam
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="text-blue-600 hover:text-blue-800 text-base font-light transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <div className="relative ml-12 z-50">
              <form
                onSubmit={handleSearch}
                className={`flex items-center justify-end transition-all duration-300 ease-in-out ${
                  isSearchExpanded ? 'w-64' : 'w-10'
                }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`search-input absolute right-0 w-64 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 focus:outline-none focus:border-blue-400 transition-all duration-300 ease-in-out ${
                    isSearchExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />
                <button
                  type="button"
                  onClick={toggleSearch}
                  className={`relative z-10 p-2 rounded-full bg-white shadow-sm border border-gray-200 hover:bg-gray-50 transition-all duration-300 ease-in-out ${
                    isSearchExpanded ? '-rotate-90' : ''
                  }`}
                >
                  <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
                </button>
              </form>
            </div>
            <a href="/login" className="text-blue-600 hover:text-blue-800 text-base font-light transition-colors duration-200 ml-4">Login</a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-sm border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-800"
                >
                  {item.name}
                </a>
              ))}
              <div className="relative px-3 py-2">
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 focus:outline-none focus:border-blue-400"
                  />
                  <button type="submit" className="absolute right-5 top-1/2 -translate-y-1/2 p-1">
                    <MagnifyingGlassIcon className="h-5 w-5 text-blue-600" />
                  </button>
                </form>
              </div>
              <a href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-800">Login</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 