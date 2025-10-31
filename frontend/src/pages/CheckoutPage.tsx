import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state;

  const [form, setForm] = useState({
    name: "",
    email: "",
    promo: "",
    agree: false,
  });

  const subtotal = booking.price * booking.qty;
  const total = subtotal + booking.taxes;
  const [promoResult, setPromoResult] = useState({
    type: "",
    value: 0,
    discountAmount: 0,
    discountedTotal: 0,
  });

  const handleApplyPromo = async () => {
    try {
      const response = await fetch("http://localhost:3000/promos/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: form.promo,
          amount: total,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Invalid promo code");

      // Determine discount based on type
      let discountAmount = 0;
      if (data.promo.type === "percent") {
        discountAmount = (total * data.promo.value) / 100;
      } else if (data.promo.type === "flat") {
        discountAmount = data.promo.value;
      }

      const discountedTotal = Math.max(total - discountAmount, 0);

      setPromoResult({
        ...data.promo,
        discountAmount,
        discountedTotal,
      });

      alert(`Promo applied! You saved ₹${discountAmount}`);

    } catch (error) {
      console.error("Promo error:", error);
      alert(error || "Failed to apply promo code");
    }
  };

  const handlePayConfirm = async () => {
    if (!form.name || !form.email || !form.agree) {
      alert("Please fill all fields and agree to terms");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          experienceId: booking.experienceId,
          userName: form.name,
          userEmail: form.email,
          date: booking.date,
          time: booking.time,
          qty: booking.qty,
          price: booking.price,
          taxes: booking.taxes,
          promoCode: form.promo || null,
          finalAmount: promoResult.discountedTotal || total, // ✅ send discounted amount
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Booking failed");

      navigate("/booking-complete", { state: { booking: result.booking } });

    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col pt-8 mx-auto max-w-7xl">
        <div className="w-full flex justify-center items-center">
          <div className="flex flex-col gap-4 w-full max-w-5xl">
            <div className="flex flex-row gap-8 w-full">
              {/* Left: Form */}
              <div>
                <div className="w-full flex justify-start pl-2">
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
                        className="w-full bg-gray-300 rounded px-4 py-2 outline-none"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1 text-gray-600">Email</div>
                      <input
                        type="email"
                        className="w-full bg-gray-300 rounded px-4 py-2 outline-none"
                        placeholder="Your email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mb-5 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        className="w-full bg-gray-300 rounded px-4 py-2 outline-none"
                        placeholder="Promo code"
                        value={form.promo}
                        onChange={(e) =>
                          setForm({ ...form, promo: e.target.value })
                        }
                      />
                    </div>
                    <button
                      className="bg-black text-white px-4 py-2 rounded font-semibold text-sm"
                      onClick={handleApplyPromo}
                    >
                      Apply
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={form.agree}
                      onChange={(e) =>
                        setForm({ ...form, agree: e.target.checked })
                      }
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

                <div className="border-t border-gray-300 mt-2 mb-4" />

                <div className="mb-4 flex justify-between font-semibold text-lg items-center">
                  <span>Total</span>
                  {promoResult.discountedTotal ? (
                    <div className="text-right">
                      <div className="line-through text-gray-500 text-sm">
                        ₹{total}
                      </div>
                      <div className="text-green-600 text-xl font-bold">
                        ₹{promoResult.discountedTotal}
                      </div>
                    </div>
                  ) : (
                    <span>₹{total}</span>
                  )}
                </div>

                {promoResult.discountAmount && (
                  <div className="mb-4 text-right text-sm text-green-600">
                    You saved ₹{promoResult.discountAmount}!
                  </div>
                )}

                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-base rounded-lg py-3 shadow transition"
                  disabled={!form.name || !form.email || !form.agree}
                  onClick={handlePayConfirm}
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
