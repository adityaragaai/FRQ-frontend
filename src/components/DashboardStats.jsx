import React from 'react';
import { Gavel, CheckCircle2, Users, IndianRupee } from 'lucide-react';
import Skeleton from './Skeleton';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle, loading }) => (
  <div className="bg-white rounded-[24px] md:rounded-[32px] shadow-sm border border-slate-100 p-4 md:p-5 relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-default min-h-[140px]">
    {/* Top Accent Line */}
    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/20 via-blue-500 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    
    <div className="relative z-10 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center space-x-2 mb-3">
          {loading ? (
            <Skeleton variant="circle" className="w-4 h-4" />
          ) : (
            <Icon className={`w-4 h-4 ${colorClass} opacity-80`} />
          )}
          {loading ? (
            <Skeleton variant="text" className="w-20 h-3" />
          ) : (
            <span className={`text-[12px] font-semibold uppercase tracking-[0.1em] ${colorClass}`}>{title}</span>
          )}
        </div>

        <div className="mb-1">
          {loading ? (
            <Skeleton variant="text" className="w-16 h-8 mb-2" />
          ) : (
            <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h3>
          )}
        </div>

        {loading ? (
          <Skeleton variant="text" className="w-32 h-3" />
        ) : (
          <p className="text-[11px] font-semibold text-slate-400 mb-4">{subtitle}</p>
        )}
      </div>

      {/* Bottom Segmented Bar */}
      <div className="flex space-x-1 mt-auto">
        <div className="h-1 flex-1 rounded-full bg-blue-500/20"></div>
        <div className="h-1 flex-1 rounded-full bg-blue-500/20"></div>
        <div className="h-1 flex-1 rounded-full bg-blue-500/20"></div>
        <div className="h-1 flex-1 rounded-full bg-blue-500/10"></div>
      </div>
    </div>

    {/* Background Watermark Icon */}
    {!loading && (
      <div className="absolute -right-4 -bottom-4 opacity-[0.02] group-hover:opacity-[0.04] transition-opacity transform rotate-12 group-hover:rotate-6 duration-700">
        <Icon size={110} strokeWidth={1} />
      </div>
    )}
  </div>
);

const DashboardStats = ({ rfqs, loading }) => {
  const activeAuctions = rfqs?.filter(r => r.status === 'ACTIVE').length || 0;
  const closedAuctions = rfqs?.filter(r => r.status === 'CLOSED' || r.status === 'FORCE_CLOSED').length || 0;
  
  const totalSuppliers = 24; 
  const totalSavings = '₹ 12.5 Cr';

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      <StatCard 
        title="Active Auctions" 
        value={activeAuctions} 
        icon={Gavel} 
        colorClass="text-blue-600"
        subtitle={`${activeAuctions} auctions currently live`}
        loading={loading}
      />
      <StatCard 
        title="Closed Auctions" 
        value={closedAuctions} 
        icon={CheckCircle2} 
        colorClass="text-emerald-600"
        subtitle={`${closedAuctions} auctions finalized`}
        loading={loading}
      />
      <StatCard 
        title="Total Suppliers" 
        value={totalSuppliers} 
        icon={Users} 
        colorClass="text-indigo-600"
        subtitle="Verified vendors in network"
        loading={loading}
      />
      <StatCard 
        title="Total Savings" 
        value={totalSavings} 
        icon={IndianRupee} 
        colorClass="text-amber-600"
        subtitle="Cumulative platform savings"
        loading={loading}
      />
    </div>
  );
};

export default DashboardStats;
