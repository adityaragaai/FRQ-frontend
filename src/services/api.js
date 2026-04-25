const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://frq-backend-5.onrender.com/api';

export const fetchRfqs = async () => {
  const response = await fetch(`${API_BASE_URL}/rfq`);
  if (!response.ok) throw new Error('Failed to fetch RFQs');
  return response.json();
};

export const fetchRfqById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/rfq/${id}`);
  if (!response.ok) throw new Error('Failed to fetch RFQ details');
  return response.json();
};

export const fetchBids = async (rfqId) => {
  const response = await fetch(`${API_BASE_URL}/bid/${rfqId}`);
  if (!response.ok) throw new Error('Failed to fetch bids');
  return response.json();
};

export const fetchActivityLogs = async (rfqId) => {
  const response = await fetch(`${API_BASE_URL}/activity/${rfqId}`);
  if (!response.ok) throw new Error('Failed to fetch activity logs');
  return response.json();
};

export const placeBid = async (bidData) => {
  const response = await fetch(`${API_BASE_URL}/bid`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bidData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to place bid');
  }
  
  return response.json();
};
