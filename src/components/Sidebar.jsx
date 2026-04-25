import React from 'react';
import { LayoutDashboard, PlusCircle, List, History, Users, BarChart3, Settings, LogOut, HelpCircle, Gavel } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-[#0A1128] text-slate-300 flex flex-col font-sans">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800/50">
        <Gavel className="w-6 h-6 text-blue-500 mr-3" />
        <span className="text-xl font-bold text-white tracking-wide">RFQBid</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
        
        {/* Section 1 */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Auctions</p>
          <a href="#" className="flex items-center px-3 py-2.5 bg-blue-600/10 text-blue-500 rounded-lg group transition-colors">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span className="font-medium">Dashboard</span>
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 hover:text-white rounded-lg group transition-colors">
            <PlusCircle className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white" />
            <span className="font-medium">Create RFQ</span>
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 hover:text-white rounded-lg group transition-colors">
            <List className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white" />
            <span className="font-medium">All RFQs</span>
          </a>
        </div>

        {/* Section 2 */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Bids</p>
          <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 hover:text-white rounded-lg group transition-colors">
            <Gavel className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white" />
            <span className="font-medium">My Bids</span>
          </a>
          <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 hover:text-white rounded-lg group transition-colors">
            <History className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white" />
            <span className="font-medium">Bid History</span>
          </a>
        </div>

        {/* Section 3 */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Network</p>
          <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 hover:text-white rounded-lg group transition-colors">
            <Users className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white" />
            <span className="font-medium">Suppliers</span>
          </a>
        </div>

        {/* Section 4 */}
        <div className="space-y-1">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Reports</p>
          <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 hover:text-white rounded-lg group transition-colors">
            <BarChart3 className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white" />
            <span className="font-medium">Reports & Analytics</span>
          </a>
        </div>

      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-slate-800/50 space-y-1">
        <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 hover:text-white rounded-lg group transition-colors">
          <Settings className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white" />
          <span className="font-medium">Settings</span>
        </a>
        <a href="#" className="flex items-center px-3 py-2.5 hover:bg-white/5 text-red-400 rounded-lg group transition-colors">
          <LogOut className="w-5 h-5 mr-3" />
          <span className="font-medium">Logout</span>
        </a>
      </div>

      {/* Help widget */}
      <div className="p-4">
        <div className="bg-[#131d38] rounded-xl p-4 flex items-start space-x-3">
          <div className="bg-blue-600/20 p-2 rounded-lg mt-0.5">
            <HelpCircle className="w-5 h-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">Need Help?</p>
            <p className="text-xs text-slate-400 mt-1">Check our docs or contact support.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
