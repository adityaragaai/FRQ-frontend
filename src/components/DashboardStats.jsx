import React from 'react';
import { Gavel, CheckCircle2, Users, IndianRupee } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, bgColorClass, trend }) => (
  <div className="card flex items-center p-5">
    <div className={`p-4 rounded-xl ${bgColorClass} ${colorClass} mr-5`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      <p className="text-sm font-medium text-slate-500 mt-1">{title}</p>
      {trend && (
        <p className="text-xs text-blue-600 font-medium mt-1 flex items-center cursor-pointer hover:underline">
          View all →
        </p>
      )}
    </div>
  </div>
);

const DashboardStats = ({ rfqs }) => {
  const activeAuctions = rfqs.filter(r => r.status === 'ACTIVE').length;
  const closedAuctions = rfqs.filter(r => r.status === 'CLOSED' || r.status === 'FORCE_CLOSED').length;
  
  // Example dummy logic for total suppliers and savings based on rfqs array size
  const totalSuppliers = rfqs.length * 4 + 10; 
  const totalSavings = '₹ ' + ((rfqs.length * 1.5) || 0) + ' Cr';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Active Auctions" 
        value={activeAuctions} 
        icon={Gavel} 
        colorClass="text-blue-600"
        bgColorClass="bg-blue-100"
        trend={true}
      />
      <StatCard 
        title="Closed Auctions" 
        value={closedAuctions} 
        icon={CheckCircle2} 
        colorClass="text-emerald-600"
        bgColorClass="bg-emerald-100"
        trend={true}
      />
      <StatCard 
        title="Total Suppliers" 
        value={totalSuppliers} 
        icon={Users} 
        colorClass="text-purple-600"
        bgColorClass="bg-purple-100"
        trend={true}
      />
      <StatCard 
        title="Total Savings" 
        value={totalSavings} 
        icon={IndianRupee} 
        colorClass="text-amber-600"
        bgColorClass="bg-amber-100"
        trend={true}
      />
    </div>
  );
};

export default DashboardStats;
