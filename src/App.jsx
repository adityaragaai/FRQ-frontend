import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardStats from './components/DashboardStats';
import LiveAuctionsTable from './components/LiveAuctionsTable';
import RightSidebar from './components/RightSidebar';
import RFQDetails from './components/RFQDetails';
import PlaceBidForm from './components/PlaceBidForm';
import AuctionConfig from './components/AuctionConfig';
import SplashScreen from './components/SplashScreen';

import { fetchRfqs, fetchRfqById, fetchBids, fetchActivityLogs } from './services/api';
import { ChevronLeft } from 'lucide-react';

function App() {
  const [rfqs, setRfqs] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [activeAuction, setActiveAuction] = useState(null);
  const [bids, setBids] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  // Track window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true); // auto-open on desktop
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Poll for all RFQs every 10 seconds
  useEffect(() => {
    const loadRfqs = async () => {
      try {
        const data = await fetchRfqs();
        setRfqs(data);
        if (data.length > 0) {
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
  }, [activeAuction]);

  // Poll for active auction details every 5 seconds
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

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} loading={loading} />}
      <div
        className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC] font-sans p-2 sm:p-4 md:p-6 gap-3 sm:gap-4 md:gap-6"
        style={{
          opacity: showSplash ? 0 : 1,
          transform: showSplash ? 'translateY(12px)' : 'translateY(0)',
          transition: 'opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s',
        }}
      >

        {/* Header */}
        <header className="bg-white rounded-2xl shadow-sm border border-slate-100 h-16 md:h-20 flex items-center px-4 md:px-10 flex-shrink-0 overflow-hidden">
          <div className="flex items-center space-x-3">
            <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-auto h-6 md:h-7">
              <rect x="0" y="4" width="12" height="3" rx="1.5" fill="#3B82F6" />
              <rect x="0" y="10" width="16" height="3" rx="1.5" fill="#3B82F6" />
              <rect x="0" y="16" width="12" height="3" rx="1.5" fill="#3B82F6" />
              <text x="20" y="19" fill="#3B82F6" style={{ font: 'bold 20px Outfit, sans-serif' }}>RFQ</text>
              <text x="65" y="19" fill="#0F172A" style={{ font: 'bold 20px Outfit, sans-serif' }}>BID</text>
            </svg>
          </div>
          <div className="h-8 w-px bg-slate-100 mx-4 md:mx-8 hidden md:block" />
          <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        </header>

        {/* Main Content Area */}
        <div className="flex flex-1 gap-3 sm:gap-4 md:gap-6 overflow-hidden relative min-h-0">

          {/* Sidebar — desktop only */}
          {!isMobile && (
            <div
              className="rounded-[32px] flex-shrink-0 flex flex-col overflow-visible transition-all duration-300 relative"
              style={{
                width: isSidebarOpen ? '256px' : '80px',
                background: 'linear-gradient(160deg, #0F172A 0%, #1E293B 60%, #0F172A 100%)',
                border: '1px solid rgba(59,130,246,0.15)',
                boxShadow: 'none',
              }}
            >
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-[60] w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
                style={{ background: '#1E293B', border: '1px solid rgba(59,130,246,0.25)', color: '#94A3B8' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#3B82F6'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(59,130,246,0.25)'; }}
              >
                {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4 rotate-180" />}
              </button>
              <Sidebar isCollapsed={!isSidebarOpen} />
            </div>
          )}

          {/* Main Scrollable Area */}
          <main className="flex-1 overflow-y-auto custom-scrollbar rounded-[28px] md:rounded-[32px] bg-white border border-slate-100 shadow-sm p-3 sm:p-5 md:p-8 min-w-0">
            <div id="dashboard-top" className="max-w-[1600px] mx-auto space-y-4 md:space-y-6">

              <DashboardStats rfqs={rfqs} loading={loading} />

              <div className="flex flex-col xl:flex-row gap-4 md:gap-6">

                <div className="flex-1 space-y-4 md:space-y-6 min-w-0">
                  <LiveAuctionsTable
                    auctions={rfqs}
                    activeId={activeAuction?._id}
                    onSelectAuction={handleSelectAuction}
                    loading={loading}
                  />

                  {activeAuction && (
                    <div className="space-y-4 md:space-y-6 pt-4 border-t border-slate-200">
                      <RFQDetails activeAuction={activeAuction} bids={bids} />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                        <PlaceBidForm activeAuction={activeAuction} onBidSuccess={handleBidSuccess} />
                        <AuctionConfig activeAuction={activeAuction} />
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
    </>
  );
}

export default App;
