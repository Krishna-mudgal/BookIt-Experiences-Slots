import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();

  const booking = {
    experience: "Kayaking",
    date: "2025-10-22",
    time: "09:00 am",
    qty: 1,
    price: 999,
    taxes: 59,
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    promo: "",
    agree: false,
  });

  const subtotal = booking.price * booking.qty;
  const total = subtotal + booking.taxes;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar goes here */}
      <div className="flex flex-col pt-8 mx-auto max-w-7xl">
        {/* Main content: center everything */}
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col gap-4 w-full max-w-5xl">
            {/* Combined flex column with form and summary */}
            <div className="flex flex-row gap-8 w-full">
              {/* Left: Form */}
              <div>
                <div className="w-full flex justify-start pl-[8px]">
                    <button
                        className="flex items-center text-sm text-gray-600 mb-4"
                        onClick={() => navigate(-1)}
                    >
                        &larr; Checkout
                    </button>
                </div>
                <div className="bg-gray-100 rounded-xl shadow-sm p-8 flex-1 max-w-2xl">
                <div className="flex gap-5 mb-5">
                  <div className="flex-1">
                    <div className="text-sm mb-1 text-gray-600">Full name</div>
                    <input
                      type="text"
                      className="w-full bg-gray-300 rounded px-4 py-2 mb-0 outline-none"
                      placeholder="Your name"
                      value={form.name}
                      onChange={e =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm mb-1 text-gray-600">Email</div>
                    <input
                      type="email"
                      className="w-full bg-gray-300 rounded px-4 py-2 mb-0 outline-none"
                      placeholder="Your email"
                      value={form.email}
                      onChange={e =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-3 mb-5 items-end">
                  <div className="flex-1">
                    <input
                      type="text"
                      className="w-full bg-gray-300 rounded px-4 py-2 mb-0 outline-none"
                      placeholder="Promo code"
                      value={form.promo}
                      onChange={e =>
                        setForm({ ...form, promo: e.target.value })
                      }
                    />
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded font-semibold text-sm">
                    Apply
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={form.agree}
                    onChange={e => setForm({ ...form, agree: e.target.checked })}
                  />
                  <span className="text-xs text-gray-600">
                    I agree to the terms and safety policy
                  </span>
                </div>
              </div>
              </div>
              {/* Right: Summary */}
              <div className="bg-gray-100 rounded-xl shadow-sm p-8 w-96 min-w-[320px] flex flex-col items-stretch">
                <div className="mb-2 flex justify-between text-gray-600">
                  <span>Experience</span>
                  <span className="text-black">{booking.experience}</span>
                </div>
                <div className="mb-2 flex justify-between text-gray-600">
                  <span>Date</span>
                  <span className="text-black">{booking.date}</span>
                </div>
                <div className="mb-2 flex justify-between text-gray-600">
                  <span>Time</span>
                  <span className="text-black">{booking.time}</span>
                </div>
                <div className="mb-2 flex justify-between text-gray-600">
                  <span>Qty</span>
                  <span className="text-black">{booking.qty}</span>
                </div>
                <div className="mb-2 flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="text-black">₹{subtotal}</span>
                </div>
                <div className="mb-4 flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span className="text-black">₹{booking.taxes}</span>
                </div>
                <div className="border-t border-gray-300 mt-2 mb-4"/>
                <div className="mb-4 flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base rounded-lg py-3 shadow transition"
                  disabled={!form.name || !form.email || !form.agree}
                >
                  Pay and Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
    