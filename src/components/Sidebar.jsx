import React from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  List, 
  Settings, 
  Gavel, 
  Lock,
  History,
  Users,
  BarChart3
} from 'lucide-react';

const Sidebar = ({ isCollapsed }) => {
  return (
    <div className={`h-full flex flex-col font-sans transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      
      {/* Navigation */}
      <div className={`flex-1 overflow-hidden py-8 space-y-8 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-6'}`}>
        
        {/* Auctions Section */}
        <div className="space-y-4">
          {!isCollapsed && <p className="px-3 text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-4">Auctions</p>}
          <a href="#dashboard-top" className={`flex items-center group transition-all duration-300 ${isCollapsed ? 'justify-center w-12 h-12 rounded-full mx-auto bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200' : 'px-4 py-3 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200'}`}>
            <LayoutDashboard className="w-5 h-5" />
            {!isCollapsed && <span className="font-bold ml-3 whitespace-nowrap">Dashboard</span>}
          </a>
          <a href="#place-your-bid" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-blue-50/50 hover:text-blue-600 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500'}`}>
            <Gavel className="w-5 h-5 transition-colors group-hover:text-blue-500" />
            {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">Place Your Bid</span>}
          </a>
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-blue-50/50 hover:text-blue-600 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <PlusCircle className="w-5 h-5 transition-colors group-hover:text-blue-500" />
              {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">Create RFQ</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 opacity-60">
                <Lock className="w-3 h-3 text-blue-500" />
              </div>
            )}
          </a>
        </div>

        {/* Bids Section */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-3 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4">Bids</p>}
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-emerald-50/50 hover:text-emerald-600 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <Gavel className="w-5 h-5 transition-colors group-hover:text-emerald-500" />
              {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">My Bids</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 opacity-60">
                <Lock className="w-3 h-3 text-emerald-500" />
              </div>
            )}
          </a>
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-emerald-50/50 hover:text-emerald-600 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <History className="w-5 h-5 transition-colors group-hover:text-emerald-500" />
              {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap">Bid History</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 bg-emerald-50 rounded-full flex items-center justify-center border border-emerald-100 opacity-60">
                <Lock className="w-3 h-3 text-emerald-500" />
              </div>
            )}
          </a>
        </div>

        {/* Network Section */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-3 text-[10px] font-bold text-indigo-500 uppercase tracking-[0.1em] mb-4">Network</p>}
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-indigo-50/50 hover:text-indigo-600 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <Users className="w-5 h-5 transition-colors group-hover:text-indigo-500" />
              {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">Suppliers</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center border border-indigo-100 opacity-60">
                <Lock className="w-3 h-3 text-indigo-500" />
              </div>
            )}
          </a>
        </div>


      </div>

      {/* Bottom Actions */}
      <div className={`p-6 border-t border-slate-50 transition-all duration-300 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
        <a href="#" className={`flex items-center hover:bg-slate-50 hover:text-slate-900 rounded-2xl group transition-all duration-300 mb-6 ${isCollapsed ? 'p-3 justify-center text-slate-400' : 'px-4 py-3 justify-between w-full text-slate-500'}`}>
          <div className="flex items-center">
            <Settings className="w-5 h-5 transition-colors group-hover:text-blue-500" />
            {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap">Settings</span>}
          </div>
          {/* Lock Badge */}
          {!isCollapsed && (
            <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100">
              <Lock className="w-3 h-3 text-blue-500" />
            </div>
          )}
        </a>

      </div>

      {/* Powered By Section */}
      <div className={`mt-auto pt-4 px-4 pb-6 transition-all duration-300`}>
        <div className={`bg-slate-50/80 rounded-3xl p-4 flex flex-col items-center justify-center border border-slate-100/50 transition-all duration-300 hover:bg-blue-50/30`}>
          {!isCollapsed && <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 text-center">Powered by</p>}
          <div className="flex items-center opacity-80 hover:opacity-100 transition-opacity justify-center">
            <svg width={isCollapsed ? "20" : "100"} height="18" viewBox={isCollapsed ? "0 0 20 18" : "0 0 100 18"} fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="3" width="8" height="2" rx="1" fill="#3B82F6" />
              <rect x="0" y="7" width="12" height="2" rx="1" fill="#3B82F6" />
              <rect x="0" y="11" width="8" height="2" rx="1" fill="#3B82F6" />
              {!isCollapsed && (
                <>
                  <text x="16" y="14" fill="#3B82F6" style={{ font: '900 13px Outfit, sans-serif' }}>GO</text>
                  <text x="36" y="14" fill="#0F172A" style={{ font: '900 13px Outfit, sans-serif' }}>COMET</text>
                </>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
