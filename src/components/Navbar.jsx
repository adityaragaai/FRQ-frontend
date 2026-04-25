import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  return (
    <div className="flex-1 flex items-center justify-between">
      
      <div className="flex items-center">
        {/* Title removed as requested */}
      </div>

      <div className="flex items-center space-x-8">
        
        {/* Search */}
        <div className="hidden lg:flex relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search RFQs..." 
            className="w-72 pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 bg-white border border-slate-50 hover:border-slate-100 hover:shadow-sm p-1 pr-4 rounded-2xl transition-all duration-300 cursor-pointer group">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            <User className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-black text-slate-800 leading-tight">Aditya Gupta</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Buyer Admin</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
