import React from 'react';
import { Download, ExternalLink } from 'lucide-react';

const RFQDetails = ({ activeAuction, bids = [] }) => {
  if (!activeAuction) return null;

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{activeAuction.name}</h2>
          <div className="flex items-center space-x-4 mt-1">
            <p className="text-sm text-slate-500">ID: {activeAuction.rfqId}</p>
            {activeAuction.pickupDate && (
              <p className="text-sm text-slate-500 border-l border-slate-300 pl-4">
                Pickup Date: <span className="font-semibold text-slate-700">{new Date(activeAuction.pickupDate).toLocaleDateString('en-GB')}</span>
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary hidden sm:inline-flex">
            <Download className="w-4 h-4 mr-2" />
            Download RFQ
          </button>
          <button className="btn-secondary">
            <ExternalLink className="w-4 h-4 mr-2" />
            Full Details
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Current Bids Ranking</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-600 font-semibold">
                <th className="p-4 pl-5">Rank</th>
                <th className="p-4">Supplier Name</th>
                <th className="p-4">Total Price</th>
                <th className="p-4 pr-5">Time Placed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {bids.map((bid) => (
                <tr 
                  key={bid._id} 
                  className={`hover:bg-slate-50/80 transition-colors ${bid.rank === 'L1' ? 'bg-emerald-50/50' : ''}`}
                >
                  <td className="p-4 pl-5">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                      bid.rank === 'L1' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {bid.rank}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-800">
                    {bid.supplierName}
                    {bid.rank === 'L1' && (
                      <span className="ml-2 text-[10px] uppercase font-bold tracking-wider text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">
                        Lowest
                      </span>
                    )}
                  </td>
                  <td className={`p-4 font-semibold ${bid.rank === 'L1' ? 'text-emerald-700' : 'text-slate-800'}`}>
                    ₹ {bid.totalPrice.toLocaleString('en-IN')}
                  </td>
                  <td className="p-4 pr-5 text-slate-500">
                    {new Date(bid.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </td>
                </tr>
              ))}

              {bids.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">
                    No bids have been placed yet for this auction.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RFQDetails;
