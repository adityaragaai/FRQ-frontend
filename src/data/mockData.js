export const activeAuctions = [
  {
    id: 'RFQ-2024-0012',
    name: 'Logistics Service - Delhi',
    lowestBid: 12450,
    timeLeft: 765, // in seconds (12m 45s)
    forcedCloseTime: '2024-05-16T14:30:00Z',
    status: 'Active',
    bids: 18,
    suppliers: 5
  },
  {
    id: 'RFQ-2024-0011',
    name: 'Transport Service - Mumbai',
    lowestBid: 18900,
    timeLeft: 1930, // 32m 10s
    forcedCloseTime: '2024-05-16T15:00:00Z',
    status: 'Active',
    bids: 12,
    suppliers: 4
  },
  {
    id: 'RFQ-2024-0010',
    name: 'Freight - Bangalore',
    lowestBid: 15750,
    timeLeft: 3930, // 1h 05m 30s
    forcedCloseTime: '2024-05-16T16:30:00Z',
    status: 'Active',
    bids: 8,
    suppliers: 3
  },
  {
    id: 'RFQ-2024-0009',
    name: 'Supply Chain - Hyderabad',
    lowestBid: 21300,
    timeLeft: 6322, // 1h 45m 22s
    forcedCloseTime: '2024-05-16T18:00:00Z',
    status: 'Active',
    bids: 24,
    suppliers: 7
  },
  {
    id: 'RFQ-2024-0008',
    name: 'Warehouse Service - Pune',
    lowestBid: 17600,
    timeLeft: 8140, // 2h 15m 40s
    forcedCloseTime: '2024-05-16T19:30:00Z',
    status: 'Active',
    bids: 5,
    suppliers: 2
  }
];

export const summaryStats = {
  activeAuctions: 12,
  closedAuctions: 8,
  totalSuppliers: 24,
  totalSavings: '₹ 2.45 Cr'
};

export const recentActivity = [
  {
    id: 1,
    type: 'bid',
    text: 'New bid placed on RFQ-2024-0012',
    subtext: 'by Supplier - SwiftLog',
    time: '2m ago'
  },
  {
    id: 2,
    type: 'extension',
    text: 'Auction RFQ-2024-0011 time extended',
    subtext: 'by 5 minutes',
    time: '5m ago'
  },
  {
    id: 3,
    type: 'bid',
    text: 'New bid placed on RFQ-2024-0010',
    subtext: 'by Supplier - FastMove',
    time: '8m ago'
  },
  {
    id: 4,
    type: 'extension',
    text: 'Auction RFQ-2024-0009 time extended',
    subtext: 'by 5 minutes',
    time: '12m ago'
  }
];

export const bidsData = [
  { rank: 'L1', supplier: 'SwiftLog Logistics', price: 12450, time: '10:42 AM' },
  { rank: 'L2', supplier: 'Delhivery Prime', price: 12600, time: '10:40 AM' },
  { rank: 'L3', supplier: 'BlueDart Express', price: 12850, time: '10:35 AM' },
  { rank: 'L4', supplier: 'Gati KWE', price: 13100, time: '10:28 AM' },
  { rank: 'L5', supplier: 'SafeExpress', price: 13500, time: '10:15 AM' }
];
