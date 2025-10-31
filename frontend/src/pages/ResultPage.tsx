import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const refId = location.state?.booking?._id || "N/A";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Green Check Icon */}
      <div className="rounded-full bg-green-500 w-16 h-16 flex items-center justify-center mb-6">
        <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
          <circle cx="19" cy="19" r="19" fill="none" />
          <path d="M13.5 19.5L18 24L25 16" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-center mb-2">Booking Confirmed</h1>
      <p className="text-gray-500 text-center mb-6">Ref ID: {refId}</p>
      <button
        className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default ResultPage;
