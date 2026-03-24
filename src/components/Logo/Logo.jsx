// src/components/Logo/Logo.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Logo = ({ showText = true, size = 'md', collapsed = false }) => {
  const navigate = useNavigate();

  const goToHome = () => {
    window.location.href = '/';
  };

  const sizes = {
    sm: { container: 'gap-1', image: collapsed ? 'h-6 w-6' : 'h-8 w-auto', text: 'text-lg' },
    md: { container: 'gap-2', image: collapsed ? 'h-8 w-8' : 'h-10 w-auto', text: 'text-xl' },
    lg: { container: 'gap-3', image: collapsed ? 'h-10 w-10' : 'h-12 w-auto', text: 'text-2xl' }
  };

  const selectedSize = sizes[size] || sizes.md;

  return (
    <button 
      onClick={goToHome}
      className={`flex items-center ${selectedSize.container} group cursor-pointer ${collapsed ? 'justify-center w-full' : ''}`}
    >
      <img 
        src={logo} 
        alt="BizCraft Logo" 
        className={`object-contain ${selectedSize.image} transition-all duration-300`}
      />
      {showText && !collapsed && (
        <span className={`${selectedSize.text} font-bold text-gray-800 group-hover:text-blue-600 transition-colors`}>
          BizCraft
        </span>
      )}
    </button>
  );
};

export default Logo;