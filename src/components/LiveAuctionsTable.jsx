import React, { useState, useEffect } from 'react';
import { Info } from 'lucide-react';

const formatTime = (seconds) => {
  if (seconds <= 0) return '00:00:00';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

const LiveAuctionsTable = ({ auctions, activeId, onSelectAuction }) => {
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
          <span className="ml-2 bg-blue-100 text-blue-700 text-xs py-0.5 px-2 rounded-full font-bold">
            {auctions.length}
          </span>
        </h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
          View all auctions →
        </a>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="p-4 pl-5">RFQ ID</th>
              <th className="p-4">RFQ Name</th>
              <th className="p-4">
                <div className="flex items-center">
                  Close Time <Info className="w-3.5 h-3.5 ml-1 text-slate-400" />
                </div>
              </th>
              <th className="p-4 pr-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
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
                  <td className="p-4 text-slate-700 font-medium">
                    {auction.name}
                  </td>
                  <td className={`p-4 font-mono font-medium ${isClosed ? 'text-slate-400' : isEndingSoon ? 'text-red-500 animate-pulse' : 'text-slate-600'}`}>
                    {isClosed ? 'CLOSED' : formatTime(timeLeftSecs)}
                  </td>
                  <td className="p-4 pr-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      auction.status === 'ACTIVE' 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 border-slate-200'
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LiveAuctionsTable;
