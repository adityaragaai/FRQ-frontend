import React from 'react';
import { Clock, TrendingDown } from 'lucide-react';

const ActivityLog = ({ activities = [] }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
          View all →
        </a>
      </div>
      
      <div className="space-y-6">
        {activities.slice(0, 5).map((activity, index) => (
          <div key={activity._id} className="relative flex gap-4">
            {/* Timeline line */}
            {index !== Math.min(activities.length, 5) - 1 && (
              <div className="absolute left-[19px] top-[36px] bottom-[-24px] w-[2px] bg-slate-100"></div>
            )}
            
            {/* Icon */}
            <div className="relative z-10 shrink-0">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm ${
                activity.eventType === 'BID_PLACED' ? 'bg-emerald-100 text-emerald-600' : 
                activity.eventType === 'AUCTION_EXTENDED' ? 'bg-blue-100 text-blue-600' : 
                'bg-purple-100 text-purple-600'
              }`}>
                {activity.eventType === 'BID_PLACED' ? <TrendingDown className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1.5 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{activity.description}</p>
                </div>
                <span className="text-xs font-medium text-slate-400 whitespace-nowrap ml-4">
                  {new Date(activity.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                </span>
              </div>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <p className="text-sm text-slate-500 text-center">No recent activity.</p>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
