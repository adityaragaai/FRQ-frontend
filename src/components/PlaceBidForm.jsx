import React, { useState } from 'react';
import { Send, IndianRupee, Loader2, Gavel } from 'lucide-react';
import { placeBid } from '../services/api';

const PlaceBidForm = ({ activeAuction, onBidSuccess }) => {
  const [formData, setFormData] = useState({
    supplierName: '',
    freightCharges: '',
    originCharges: '',
    destinationCharges: '',
    transitTime: '',
    validity: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeAuction) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = {
        rfqId: activeAuction._id,
        supplierName: formData.supplierName,
        freightCharges: Number(formData.freightCharges),
        originCharges: Number(formData.originCharges),
        destinationCharges: Number(formData.destinationCharges),
        transitTime: Number(formData.transitTime),
        validity: formData.validity
      };

      await placeBid(payload);
      setSuccess(true);
      setFormData({
        supplierName: '', freightCharges: '', originCharges: '', 
        destinationCharges: '', transitTime: '', validity: ''
      });
      if (onBidSuccess) onBidSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isClosed = activeAuction?.status !== 'ACTIVE';

  return (
    <div id="place-your-bid" className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-md border-l-4 border-l-blue-600">
      <div className="p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Gavel className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Place Your Bid</h3>
        </div>
      
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 font-semibold">{error}</div>}
      {success && <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg border border-emerald-100 font-semibold">Bid successfully placed!</div>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Supplier Name</label>
          <input
            type="text"
            name="supplierName"
            required
            value={formData.supplierName}
            onChange={handleChange}
            placeholder="e.g. SwiftLog Express"
            className="input-field font-semibold"
            disabled={isClosed || loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Freight</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-4 w-4 text-slate-400" />
              </div>
              <input type="number" name="freightCharges" required min="0" value={formData.freightCharges} onChange={handleChange} placeholder="0" className="input-field pl-9 font-semibold" disabled={isClosed || loading}/>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Origin</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-4 w-4 text-slate-400" />
              </div>
              <input type="number" name="originCharges" required min="0" value={formData.originCharges} onChange={handleChange} placeholder="0" className="input-field pl-9 font-semibold" disabled={isClosed || loading}/>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Destination</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="h-4 w-4 text-slate-400" />
              </div>
              <input type="number" name="destinationCharges" required min="0" value={formData.destinationCharges} onChange={handleChange} placeholder="0" className="input-field pl-9 font-semibold" disabled={isClosed || loading}/>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Transit Time (Days)</label>
            <input type="number" name="transitTime" required min="1" value={formData.transitTime} onChange={handleChange} placeholder="e.g. 3" className="input-field font-semibold" disabled={isClosed || loading}/>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Validity Date</label>
            <input type="date" name="validity" required value={formData.validity} onChange={handleChange} className="input-field w-full font-semibold" disabled={isClosed || loading}/>
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" className={`btn-primary w-full font-bold uppercase tracking-widest ${isClosed ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={isClosed || loading}>
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            {isClosed ? 'Auction Closed' : 'Submit Bid'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default PlaceBidForm;
