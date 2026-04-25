import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import LiveAuctionsTable from './components/LiveAuctionsTable';
import RightSidebar from './components/RightSidebar';
import RFQDetails from './components/RFQDetails';
import PlaceBidForm from './components/PlaceBidForm';
import AuctionConfig from './components/AuctionConfig';

import { fetchRfqs, fetchRfqById, fetchBids, fetchActivityLogs } from './services/api';

function App() {
  const [rfqs, setRfqs] = useState([]);
  const [activeAuction, setActiveAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Poll for all RFQs every 10 seconds to keep the table and stats fresh
  useEffect(() => {
    const loadRfqs = async () => {
      try {
        const data = await fetchRfqs();
        setRfqs(data);
        
        // Auto-select logic
        if (data.length > 0) {
          // If no active auction, or if the current active auction no longer exists in the list
          const currentExists = activeAuction && data.some(r => r._id === activeAuction._id);
          if (!activeAuction || !currentExists) {
            handleSelectAuction(data[0]._id);
          }
        } else {
          setActiveAuction(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to load RFQs:', error);
        setLoading(false);
      }
    };

    loadRfqs();
    const interval = setInterval(loadRfqs, 10000);
    return () => clearInterval(interval);
  }, [activeAuction]); // Dependency on activeAuction to avoid overriding selection logic

  // Poll for specific active auction details (bids, activity, countdown changes) every 5 seconds
  useEffect(() => {
    if (!activeAuction) return;
    
    const loadAuctionDetails = async () => {
      try {
        const [auctionData, bidsData, activityData] = await Promise.all([
          fetchRfqById(activeAuction._id),
          fetchBids(activeAuction._id),
          fetchActivityLogs(activeAuction._id)
        ]);
        
        setActiveAuction(auctionData);
        setBids(bidsData);
        setActivities(activityData);
      } catch (error) {
        console.error('Failed to load active auction details:', error);
      }
    };

    loadAuctionDetails();
    const interval = setInterval(loadAuctionDetails, 5000);
    return () => clearInterval(interval);
  }, [activeAuction?._id]);

  const handleSelectAuction = async (rfqId) => {
    try {
      const data = await fetchRfqById(rfqId);
      setActiveAuction(data);
    } catch (error) {
      console.error('Failed to select auction:', error);
    }
  };

  const handleBidSuccess = async () => {
    // Force a fast refresh of the active auction details
    if (activeAuction) {
      const [auctionData, bidsData, activityData] = await Promise.all([
        fetchRfqById(activeAuction._id),
        fetchBids(activeAuction._id),
        fetchActivityLogs(activeAuction._id)
      ]);
      setActiveAuction(auctionData);
      setBids(bidsData);
      setActivities(activityData);
    }
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-brand-light text-slate-500 font-medium">Loading Dashboard...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-brand-light">
      <div className="flex-shrink-0 hidden md:block">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 w-full overflow-hidden relative">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <div className="max-w-[1600px] mx-auto space-y-6">
            
            <DashboardStats rfqs={rfqs} />

            <div className="flex flex-col xl:flex-row gap-6">
              
              <div className="flex-1 space-y-6 min-w-0">
                <LiveAuctionsTable 
                  auctions={rfqs} 
                  activeId={activeAuction?._id}
                  onSelectAuction={handleSelectAuction} 
                />
                
                {activeAuction && (
                  <div className="grid grid-cols-1 gap-6">
                    <div className="pt-4 border-t border-slate-200">
                      <h2 className="text-xl font-bold text-slate-800 mb-6">Auction Management</h2>
                      <div className="space-y-6">
                        <RFQDetails activeAuction={activeAuction} bids={bids} />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <PlaceBidForm activeAuction={activeAuction} onBidSuccess={handleBidSuccess} />
                          <AuctionConfig activeAuction={activeAuction} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <RightSidebar activeAuction={activeAuction} activities={activities} />

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
