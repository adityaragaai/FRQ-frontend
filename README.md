
# RFQBid - British Auction RFQ System 🚀

RFQBid is a premium, real-time British Auction system designed for efficient Request for Quote (RFQ) management. It provides a seamless interface for buyers to monitor live auctions and for suppliers to place competitive bids in a dynamic environment.

## 🔗 Live Demo
Check out the live application here: **[https://frq-frontend.vercel.app/](https://frq-frontend.vercel.app/)**

---

## 📸 Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/e43f61f3-80f5-4477-8483-8fb08f910fa6" />
</div>

---

## ✨ Key Features

- **Live Auction Monitoring**: Real-time updates on active auctions with countdown timers and status indicators.
- **Dynamic Bidding System**: Intuitive "Place Your Bid" interface with instant validation and submission.
- **L1 Ranking Algorithm**: Automatically calculates and highlights the lowest (L1) bidder for every RFQ.
- **Premium UI/UX**:
  - Clean, modern dashboard using the **Outfit** typography.
  - Interactive **Vertical Stats Cards** with watermark accents.
  - Smooth transitions and responsive layout (Mobile-first design).
- **Supplier Network**: Comprehensive view of supplier performance and participation.
- **Secure Access**: Integrated lock mechanisms for restricted management features.

---

## 🛠️ Technology Stack

- **Frontend**: [React.js](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: [Outfit](https://fonts.google.com/specimen/Outfit) (via Google Fonts)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adityaragaai/FRQ-frontend.git
   cd FRQ-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**:
   Create a `.env` file in the root directory and add your backend API URL:
   ```env
   VITE_API_BASE_URL=your_backend_api_url
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🏗️ Project Structure

```text
src/
├── components/     # Reusable UI components (Sidebar, Navbar, Stats, etc.)
├── services/       # API service layers
├── App.jsx         # Main application layout and routing
├── index.css       # Global styles and Tailwind configuration
└── main.jsx        # Application entry point
```

---

## 🛡️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Powered by <b>GoComet</b></p>
</div>
