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
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
               style={{ color: '#3B82F6' }}>Auctions</p>
          )}

          {/* Dashboard – active item */}
          <a href="#dashboard-top" className={`flex items-center group transition-all duration-300 ${isCollapsed ? 'justify-center w-12 h-12 rounded-full mx-auto' : 'px-4 py-3 rounded-2xl'}`}
             style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)', boxShadow: '0 4px 16px rgba(99,102,241,0.4)' }}>
            <LayoutDashboard className="w-5 h-5 text-white" />
            {!isCollapsed && <span className="font-bold ml-3 whitespace-nowrap text-white">Dashboard</span>}
          </a>

          {/* Place Your Bid */}
          <a href="#place-your-bid"
             className={`flex items-center py-3 rounded-2xl group transition-all duration-200 ${isCollapsed ? 'justify-center' : 'px-4'}`}
             style={{ color: 'rgba(148,163,184,0.85)' }}
             onMouseEnter={e => { e.currentTarget.style.background='rgba(59,130,246,0.12)'; e.currentTarget.style.color='#93C5FD'; }}
             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(148,163,184,0.85)'; }}>
            <Gavel className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">Place Your Bid</span>}
          </a>

          {/* Create RFQ */}
          <a href="#"
             className={`flex items-center py-3 rounded-2xl group transition-all duration-200 ${isCollapsed ? 'justify-center' : 'px-4 justify-between'}`}
             style={{ color: 'rgba(148,163,184,0.85)' }}
             onMouseEnter={e => { e.currentTarget.style.background='rgba(59,130,246,0.12)'; e.currentTarget.style.color='#93C5FD'; }}
             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(148,163,184,0.85)'; }}>
            <div className="flex items-center">
              <PlusCircle className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">Create RFQ</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                   style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
                <Lock className="w-3 h-3" style={{ color: '#60A5FA' }} />
              </div>
            )}
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginLeft: isCollapsed ? 8 : 12, marginRight: isCollapsed ? 8 : 12 }} />

        {/* Bids Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.2em] mb-4"
               style={{ color: '#34D399' }}>Bids</p>
          )}

          {/* My Bids */}
          <a href="#"
             className={`flex items-center py-3 rounded-2xl group transition-all duration-200 ${isCollapsed ? 'justify-center' : 'px-4 justify-between'}`}
             style={{ color: 'rgba(148,163,184,0.85)' }}
             onMouseEnter={e => { e.currentTarget.style.background='rgba(52,211,153,0.1)'; e.currentTarget.style.color='#6EE7B7'; }}
             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(148,163,184,0.85)'; }}>
            <div className="flex items-center">
              <Gavel className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">My Bids</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                   style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <Lock className="w-3 h-3" style={{ color: '#34D399' }} />
              </div>
            )}
          </a>

          {/* Bid History */}
          <a href="#"
             className={`flex items-center py-3 rounded-2xl group transition-all duration-200 ${isCollapsed ? 'justify-center' : 'px-4 justify-between'}`}
             style={{ color: 'rgba(148,163,184,0.85)' }}
             onMouseEnter={e => { e.currentTarget.style.background='rgba(52,211,153,0.1)'; e.currentTarget.style.color='#6EE7B7'; }}
             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(148,163,184,0.85)'; }}>
            <div className="flex items-center">
              <History className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">Bid History</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                   style={{ background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)' }}>
                <Lock className="w-3 h-3" style={{ color: '#34D399' }} />
              </div>
            )}
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginLeft: isCollapsed ? 8 : 12, marginRight: isCollapsed ? 8 : 12 }} />

        {/* Network Section */}
        <div className="space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold uppercase tracking-[0.1em] mb-4"
               style={{ color: '#818CF8' }}>Network</p>
          )}

          {/* Suppliers */}
          <a href="#"
             className={`flex items-center py-3 rounded-2xl group transition-all duration-200 ${isCollapsed ? 'justify-center' : 'px-4 justify-between'}`}
             style={{ color: 'rgba(148,163,184,0.85)' }}
             onMouseEnter={e => { e.currentTarget.style.background='rgba(129,140,248,0.1)'; e.currentTarget.style.color='#A5B4FC'; }}
             onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(148,163,184,0.85)'; }}>
            <div className="flex items-center">
              <Users className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-semibold ml-3 whitespace-nowrap text-sm">Suppliers</span>}
            </div>
            {!isCollapsed && (
              <div className="w-6 h-6 rounded-full flex items-center justify-center"
                   style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid rgba(129,140,248,0.25)' }}>
                <Lock className="w-3 h-3" style={{ color: '#818CF8' }} />
              </div>
            )}
          </a>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className={`px-4 pb-4 transition-all duration-300 ${isCollapsed ? 'flex flex-col items-center' : ''}`}
           style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="#"
           className={`flex items-center rounded-2xl transition-all duration-200 mt-4 ${isCollapsed ? 'p-3 justify-center' : 'px-4 py-3 justify-between w-full'}`}
           style={{ color: 'rgba(148,163,184,0.85)' }}
           onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.05)'; e.currentTarget.style.color='#F1F5F9'; }}
           onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='rgba(148,163,184,0.85)'; }}>
          <div className="flex items-center">
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="font-medium ml-3 whitespace-nowrap text-sm">Settings</span>}
          </div>
          {!isCollapsed && (
            <div className="w-6 h-6 rounded-full flex items-center justify-center"
                 style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)' }}>
              <Lock className="w-3 h-3" style={{ color: '#60A5FA' }} />
            </div>
          )}
        </a>
      </div>

      {/* Powered By */}
      <div className={`pt-2 px-4 pb-6 transition-all duration-300`}>
        <div className={`rounded-3xl p-4 flex flex-col items-center justify-center transition-all duration-300`}
             style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {!isCollapsed && (
            <p className="text-[9px] font-black uppercase tracking-[0.3em] mb-3 text-center"
               style={{ color: 'rgba(148,163,184,0.5)' }}>Powered by</p>
          )}
          <div className="flex items-center opacity-70 hover:opacity-100 transition-opacity justify-center">
            <svg width={isCollapsed ? "20" : "100"} height="18" viewBox={isCollapsed ? "0 0 20 18" : "0 0 100 18"} fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0" y="3" width="8" height="2" rx="1" fill="#3B82F6" />
              <rect x="0" y="7" width="12" height="2" rx="1" fill="#3B82F6" />
              <rect x="0" y="11" width="8" height="2" rx="1" fill="#3B82F6" />
              {!isCollapsed && (
                <>
                  <text x="16" y="14" fill="#3B82F6" style={{ font: '900 13px Outfit, sans-serif' }}>GO</text>
                  <text x="36" y="14" fill="#E2E8F0" style={{ font: '900 13px Outfit, sans-serif' }}>COMET</text>
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
