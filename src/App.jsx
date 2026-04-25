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
import { ChevronLeft, Menu } from 'lucide-react';

function App() {
  const [rfqs, setRfqs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
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
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC] font-sans p-4 md:p-6 gap-6">
      
      {/* Unified Top Header - Logo & Navbar combined */}
      <header className="bg-white rounded-2xl shadow-sm border border-slate-100 h-20 flex items-center px-6 md:px-10 flex-shrink-0 overflow-hidden">
        
        {/* Mobile Menu & Logo */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-7">
            <rect x="0" y="4" width="12" height="3" rx="1.5" fill="#3B82F6" />
            <rect x="0" y="10" width="16" height="3" rx="1.5" fill="#3B82F6" />
            <rect x="0" y="16" width="12" height="3" rx="1.5" fill="#3B82F6" />
            <text x="20" y="19" fill="#3B82F6" style={{ font: 'bold 20px Outfit, sans-serif' }}>RFQ</text>
            <text x="65" y="19" fill="#0F172A" style={{ font: 'bold 20px Outfit, sans-serif' }}>BID</text>
          </svg>
        </div>

        {/* Separator */}
        <div className="h-8 w-px bg-slate-100 mx-8 hidden md:block"></div>

        {/* Navbar - Takes up remaining space */}
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-6 overflow-hidden relative">
        {/* Sidebar Overlay for mobile */}
        {isSidebarOpen && window.innerWidth < 768 && (
          <div 
            className="fixed inset-0 bg-slate-900/20 z-40 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Floating Card */}
        <div className={`
          bg-white rounded-[32px] shadow-sm border border-slate-100 relative transition-all duration-300 flex flex-col overflow-visible
          ${window.innerWidth < 768 && !isSidebarOpen ? 'fixed inset-y-4 left-4 z-50 -translate-x-full' : 'relative translate-x-0'}
        `} style={{ width: isSidebarOpen ? '256px' : '80px' }}>
          {/* Floating Edge Toggle Button */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-[60] w-9 h-9 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all duration-300 shadow-md"
          >
            {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4 rotate-180" />}
          </button>
          <Sidebar isCollapsed={!isSidebarOpen} />
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar rounded-[32px] bg-white border border-slate-100 shadow-sm p-4 md:p-8">
          <div id="dashboard-top" className="max-w-[1600px] mx-auto space-y-6">
            
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
