import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';
import Skeleton from './Skeleton';

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

const LiveAuctionsTable = ({ auctions, activeId, onSelectAuction, loading }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="card p-0 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
        <h2 className="text-lg font-bold text-slate-800 flex items-center">
          Live Auctions 
          {!loading && (
            <span className="ml-2 bg-blue-100 text-blue-700 text-xs py-0.5 px-2 rounded-full font-bold">
              {auctions.length}
            </span>
          )}
          {loading && <Skeleton variant="circle" className="ml-2 w-6 h-4 rounded-full" />}
        </h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
          View all auctions →
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase tracking-[0.15em] text-slate-500 font-bold">
              <th className="p-4 pl-5">RFQ ID</th>
              <th className="p-4">RFQ Name</th>
              <th className="p-4">
                <div className="flex items-center">
                  Close Time <Info className="w-3.5 h-3.5 ml-1 text-slate-400 cursor-help" title="Format: DD:HH:MM:SS" />
                </div>
              </th>
              <th className="p-4 pr-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {loading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <tr key={`skeleton-${i}`}>
                  <td className="p-4 pl-5"><Skeleton variant="text" className="w-20 h-4" /></td>
                  <td className="p-4"><Skeleton variant="text" className="w-40 h-4" /></td>
                  <td className="p-4"><Skeleton variant="text" className="w-24 h-4" /></td>
                  <td className="p-4 pr-5"><Skeleton variant="text" className="w-16 h-4 rounded-full" /></td>
                </tr>
              ))
            ) : (
              <>
                {auctions.map((auction) => {
                  const closeTime = new Date(auction.bidCloseTime);
                  const timeLeftSecs = Math.max(0, Math.floor((closeTime - now) / 1000));
                  const isEndingSoon = timeLeftSecs > 0 && timeLeftSecs < 1800; // less than 30 mins
                  const isClosed = auction.status !== 'ACTIVE';
                  const isActiveRow = activeId === auction._id;

                  return (
                    <tr 
                      key={auction._id} 
                      onClick={() => onSelectAuction(auction._id)}
                      className={`transition-colors group cursor-pointer ${isActiveRow ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'}`}
                    >
                      <td className="p-4 pl-5 font-medium text-blue-600 group-hover:underline">
                        {auction.rfqId}
                        {isActiveRow && <span className="ml-2 w-2 h-2 rounded-full bg-blue-500 inline-block"></span>}
                      </td>
                      <td className="p-4 text-slate-800 font-medium">
                        {auction.name}
                      </td>
                      <td className={`p-4 font-mono font-semibold ${isClosed ? 'text-slate-400' : isEndingSoon ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                        {isClosed ? 'CLOSED' : formatTime(timeLeftSecs)}
                      </td>
                      <td className="p-4 pr-5">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${
                          auction.status === 'ACTIVE' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-slate-50 text-slate-600 border-slate-100'
                        }`}>
                          {auction.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                
                {auctions.length === 0 && (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">
                      No active auctions found. Please create one!
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveAuctionsTable;
