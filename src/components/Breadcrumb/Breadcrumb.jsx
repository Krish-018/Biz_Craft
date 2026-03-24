// src/components/Breadcrumb/Breadcrumb.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const pathNames = {
    'guides': 'Guides',
    'suppliers': 'Suppliers',
    'tools': 'Tools',
    'dashboard': 'Dashboard',
    'profile': 'Profile',
    'settings': 'Settings',
    'help': 'Help Center',
    'contact': 'Contact Us',
    'calculators': 'Calculators',
    'business-tools': 'Business Tools',
    'business-guide': 'My Guides',
    'my-tools': 'My Tools',
    'search': 'Search Results'
  };

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4 py-2">
      <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        <Home size={16} />
        <span className="sr-only md:not-sr-only md:inline">Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        let displayName = pathNames[name] || (name.charAt(0).toUpperCase() + name.slice(1));
        if (!isNaN(displayName)) {
          displayName = 'Details';
        }

        return (
          <React.Fragment key={name}>
            <ChevronRight size={14} className="text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-800">{displayName}</span>
            ) : (
              <Link 
                to={routeTo} 
                className="hover:text-blue-600 transition-colors"
              >
                {displayName}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;