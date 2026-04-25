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
      <div className={`flex-1 overflow-y-auto py-8 space-y-8 custom-scrollbar transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-6'}`}>
        
        {/* Auctions Section (Referred to as Scheduling in the image) */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-3 text-[11px] font-bold text-blue-500 uppercase tracking-[0.2em] mb-4">Auctions</p>}
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 ${isCollapsed ? 'justify-center bg-blue-50 text-blue-600 shadow-sm' : 'px-4 bg-blue-50 text-blue-600 shadow-sm'}`}>
            <LayoutDashboard className="w-5 h-5" />
            {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap">Dashboard</span>}
          </a>
          <a href="#place-your-bid" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <Gavel className="w-5 h-5 transition-colors group-hover:text-blue-500" />
              {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap">Place Your Bid</span>}
            </div>
          </a>
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <PlusCircle className="w-5 h-5 transition-colors group-hover:text-blue-500" />
              {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap">Create RFQ</span>}
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
          {!isCollapsed && <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Bids</p>}
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <Gavel className="w-5 h-5 transition-colors group-hover:text-blue-500" />
              {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap">My Bids</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 opacity-60">
                <Lock className="w-3 h-3 text-blue-500" />
              </div>
            )}
          </a>
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <History className="w-5 h-5 transition-colors group-hover:text-blue-500" />
              {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap">Bid History</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 opacity-60">
                <Lock className="w-3 h-3 text-blue-500" />
              </div>
            )}
          </a>
        </div>

        {/* Network Section */}
        <div className="space-y-2">
          {!isCollapsed && <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Network</p>}
          <a href="#" className={`flex items-center py-3 rounded-2xl group transition-all duration-300 hover:bg-slate-50 hover:text-slate-900 ${isCollapsed ? 'justify-center text-slate-400' : 'px-4 text-slate-500 justify-between'}`}>
            <div className="flex items-center">
              <Users className="w-5 h-5 transition-colors group-hover:text-blue-500" />
              {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap">Suppliers</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center border border-blue-100 opacity-60">
                <Lock className="w-3 h-3 text-blue-500" />
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

        {/* Powered By Section */}
        <div className={`pt-6 border-t border-slate-50 flex flex-col items-center justify-center transition-all duration-300`}>
          {!isCollapsed && <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 text-center">Powered by</p>}
          <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity justify-center">
            <svg width={isCollapsed ? "20" : "100"} height="20" viewBox={isCollapsed ? "0 0 20 20" : "0 0 100 20"} fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="4" width="8" height="2" rx="1" fill="#3B82F6" />
              <rect x="0" y="8" width="12" height="2" rx="1" fill="#3B82F6" />
              <rect x="0" y="12" width="8" height="2" rx="1" fill="#3B82F6" />
              {!isCollapsed && (
                <>
                  <text x="16" y="15" fill="#3B82F6" style={{ font: 'bold 14px Outfit, sans-serif' }}>GO</text>
                  <text x="38" y="15" fill="#0F172A" style={{ font: 'bold 14px Outfit, sans-serif' }}>COMET</text>
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
