/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useFirebase } from './FirebaseProvider';
import { Heart, LogIn, LogOut, Menu, X, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export function Navbar({ currentTab, setCurrentTab }: NavbarProps) {
  const { user, isAdmin, login, logout } = useFirebase();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Our Services' },
    { id: 'impact', label: 'Our Impact' },
    { id: 'volunteer', label: 'Get Involved' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-xs font-sans">
      <div className="flex justify-between items-center w-full px-6 py-4.5 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNav('home')} 
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="relative p-2 bg-[#1B7330]/10 rounded-full group-hover:scale-105 transition-all duration-200">
            <Heart className="w-5 h-5 text-[#1B7330] fill-[#1B7330]/20" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#0A2240]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-[#0A2240] block leading-none font-sans">
              DAD <span className="text-[#1B7330]">FOUNDATION</span>
            </span>
            <span className="text-[10px] uppercase font-bold text-[#1B7330] tracking-widest block mt-1">
              Care. Support. Empower.
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`font-semibold text-sm transition-all duration-200 cursor-pointer pb-1 relative ${
                currentTab === link.id
                  ? 'text-[#1B7330]'
                  : 'text-[#4A5D6E] hover:text-[#0A2240]'
              }`}
            >
              {link.label}
              {currentTab === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1B7330] rounded-full" />
              )}
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => handleNav('admin')}
              className={`font-semibold text-xs flex items-center gap-1 px-3 py-1 bg-[#1B7330]/10 text-[#1B7330] border border-[#1B7330]/20 rounded-full transition-all duration-200 cursor-pointer ${
                currentTab === 'admin' ? 'ring-2 ring-[#1B7330]' : 'hover:bg-[#1B7330]/20'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Admin
            </button>
          )}
        </nav>

        {/* Session / Donate Buttons */}
        <div className="hidden lg:flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-3">
              <img 
                src={user.photoURL || 'https://lh3.googleusercontent.com/a/default-user'} 
                alt={user.displayName || 'Donor'} 
                className="w-8 h-8 rounded-full border-2 border-[#1B7330]/40"
              />
              <button 
                onClick={logout} 
                className="flex items-center gap-1.5 text-xs font-semibold text-[#4A5D6E] hover:text-red-500 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          ) : (
            <button 
              onClick={login}
              className="flex items-center gap-1.5 text-sm font-semibold text-[#0A2240] hover:text-[#1B7330] transition-colors cursor-pointer"
            >
              <LogIn className="w-4 h-4 text-[#1B7330]" />
              Sign In
            </button>
          )}

          <button 
            onClick={() => handleNav('donation')}
            className="bg-[#1B7330] hover:bg-[#145A24] text-white px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all duration-150 cursor-pointer hover:scale-[1.02]"
          >
            <Heart className="w-3.5 h-3.5 text-white/95 fill-transparent" />
            Donate Now
          </button>
        </div>

        {/* Hamburger Menu Mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <button 
            onClick={() => handleNav('donation')}
            className="bg-[#1B7330] hover:bg-[#145A24] text-white px-4 py-2 rounded-full font-bold text-xs shadow-sm cursor-pointer"
          >
            Donate
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 text-[#4A5D6E] hover:text-[#1B7330] focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-6 py-4 space-y-3 shadow-inner">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`text-left font-bold text-base py-2 cursor-pointer ${
                  currentTab === link.id ? 'text-[#1B7330] border-l-2 border-[#1B7330] pl-2' : 'text-[#4A5D6E]'
                }`}
              >
                {link.label}
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => handleNav('admin')}
                className="text-left font-bold text-base py-2 text-[#1B7330] flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldAlert className="w-5 h-5" />
                Admin Dashboard
              </button>
            )}

            <div className="h-px bg-slate-100 my-2" />

            {user ? (
               <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <img src={user.photoURL || ''} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-semibold text-slate-750">{user.displayName}</span>
                </div>
                <button 
                  onClick={logout}
                  className="text-xs font-bold text-red-500 flex items-center gap-1 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <button 
                onClick={login}
                className="text-left font-bold text-base py-2 text-[#0A2240] flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-5 h-5 text-[#1B7330]" /> Google Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
