import React, { useState, useEffect } from 'react';
import { BellRing } from 'lucide-react';
import ActivityLog from './ActivityLog';

const formatTime = (totalSeconds) => {
  if (totalSeconds <= 0) return '00:00:00';
  
  const d = Math.floor(totalSeconds / (3600 * 24));
  const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.floor(totalSeconds % 60);

  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');

  if (d > 0) {
    const dd = d.toString().padStart(2, '0');
    return `${dd}:${hh}:${mm}:${ss}`;
  }
  
  return `${hh}:${mm}:${ss}`;
};

const RightSidebar = ({ activeAuction, activities }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!activeAuction) return <div className="w-full xl:w-96 flex-shrink-0 space-y-4 md:space-y-6"></div>;

  const closeTime = new Date(activeAuction.bidCloseTime);
  const timeLeftSecs = Math.max(0, Math.floor((closeTime - now) / 1000));
  
  // Calculate SVG circle properties
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  // Assume a 2-hour max for percentage calculation (7200 seconds)
  const strokeDashoffset = Math.max(0, circumference - (timeLeftSecs / 7200) * circumference);

  const isEndingSoon = timeLeftSecs > 0 && timeLeftSecs < 1800; // < 30 mins
  const isClosed = activeAuction.status !== 'ACTIVE';

  return (
    <div className="w-full xl:w-96 flex-shrink-0 space-y-4 md:space-y-6">
      
      {/* Ending Soon / Active Card */}
      <div className={`rounded-2xl p-4 text-white shadow-lg relative overflow-hidden ${isClosed ? 'bg-slate-800' : 'bg-[#0f172a]'}`}>
        {!isClosed && <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full translate-x-10 -translate-y-10"></div>}
        
        <div className="flex items-center justify-between mb-3 relative z-10">
          <h2 className="text-sm font-semibold text-slate-300">
            {isClosed ? 'Auction Closed' : 'Auction Status'}
          </h2>
          {/* LIVE indicator */}
          {!isClosed && (
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-400">Live</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mb-3 relative z-10">
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/50 flex-1 mr-4">
            {!isClosed && isEndingSoon && (
              <div className="flex items-center text-red-400 text-xs font-bold mb-2">
                <BellRing className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
                Ending Soon
              </div>
            )}
            <p className="font-bold text-lg">{activeAuction.rfqId}</p>
            <p className="text-xs text-slate-400 mt-1 line-clamp-1">{activeAuction.name}</p>
          </div>
          
          {/* Circular Timer */}
          <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              <circle 
                cx="80" cy="80" r={radius} 
                stroke="currentColor" 
                strokeWidth="8" 
                fill="transparent" 
                className="text-slate-800" 
              />
              {!isClosed && (
                <circle 
                  cx="80" cy="80" r={radius} 
                  stroke="currentColor" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className={`${isEndingSoon ? 'text-red-500' : 'text-blue-500'} transition-all duration-1000 ease-linear`} 
                  strokeLinecap="round"
                />
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`font-mono font-bold tracking-tighter ${isClosed ? 'text-slate-400 text-2xl' : (formatTime(timeLeftSecs).length > 8 ? 'text-lg' : 'text-2xl')}`}>
                {isClosed ? '00:00:00' : formatTime(timeLeftSecs)}
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                {isClosed ? 'Closed' : 'Time Left'}
              </span>
              {!isClosed && (
                <span className="text-[8px] text-slate-500 font-medium tracking-widest uppercase -mt-0.5 opacity-80">
                  (DD:HH:MM:SS)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 border-t border-slate-700/50 pt-3 mt-1 relative z-10">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Lowest Bid</p>
            <p className="font-semibold text-sm">
              {activeAuction.currentLowestBid ? `₹ ${activeAuction.currentLowestBid.totalPrice.toLocaleString('en-IN')}` : 'No Bids'}
            </p>
          </div>
          <div className="border-l border-slate-700/50 pl-4">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">Status</p>
            <p className={`font-semibold text-sm ${activeAuction.status === 'ACTIVE' ? 'text-emerald-400' : 'text-slate-400'}`}>
              {activeAuction.status}
            </p>
          </div>
        </div>
      </div>

      <ActivityLog activities={activities} />
      
    </div>
  );
};

export default RightSidebar;
