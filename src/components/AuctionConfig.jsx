import React from 'react';
import { Settings2, Clock, RotateCcw } from 'lucide-react';

const AuctionConfig = ({ activeAuction }) => {
  if (!activeAuction) return null;

  return (
    <div className="card border-l-4 border-l-blue-500">
      <div className="flex items-center mb-4">
        <Settings2 className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-bold text-slate-800">Auction Configuration</h3>
      </div>
      
      <p className="text-sm text-slate-500 mb-6">
        Rules for automatic extension when bids are placed near closing time.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center text-slate-600 mb-2">
            <Clock className="w-4 h-4 mr-1.5" />
            <span className="text-sm font-semibold">Trigger Window</span>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-slate-800">{activeAuction.triggerWindow}</span>
            <span className="text-sm text-slate-500 ml-1 mb-1">mins</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center text-slate-600 mb-2">
            <RotateCcw className="w-4 h-4 mr-1.5" />
            <span className="text-sm font-semibold">Extension By</span>
          </div>
          <div className="flex items-end">
            <span className="text-2xl font-bold text-slate-800">{activeAuction.extensionDuration}</span>
            <span className="text-sm text-slate-500 ml-1 mb-1">mins</span>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="flex items-center text-slate-600 mb-2">
            <Settings2 className="w-4 h-4 mr-1.5" />
            <span className="text-sm font-semibold">Rule</span>
          </div>
          <div className="mt-1">
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-bold bg-blue-100 text-blue-700 break-words">
              {activeAuction.extensionType.replace('_', ' ')}
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuctionConfig;
