import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/NavBar';

const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [experience, setExperience] = useState<any>(null);
  const backend = import.meta.env.VITE_BACKEND_URL;

  const incrementQty = () => setQuantity((q) => Math.min(q + 1, 10));
  const decrementQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const handleConfirmClick = () => {
    if (!experience || !selectedDate || !selectedTime) {
      alert("Please select date and time before confirming.");
      return;
    }

    navigate(`/checkout`, {
      state: {
        experienceId: id,
        experience: experience.title,
        date: selectedDate,
        time: selectedTime,
        qty: quantity,
        price: experience.price,
        taxes: 59,
      },
    });
  };

  const getDataById = async () => {
    const result = await fetch(`${backend}/experiences/${id}`, {
      method: "GET",
    });
    const data = await result.json();
    return data;
  };

  useEffect(() => {
    (async () => {
      const exp = await getDataById();
      setExperience(exp);
      if (exp?.slots?.length) {
        setSelectedDate(exp.slots[0].date);
        setSelectedTime(exp.slots[0].times?.[0]?.time || "");
      }
    })();
  }, []);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="text-gray-600 text-lg">Loading...</span>
      </div>
    );
  }

  const availableDates = experience.slots.map((s: any) => s.date);
  const selectedSlot = experience.slots.find((slot: any) => slot.date === selectedDate);
  const availableTimes = selectedSlot ? selectedSlot.times.map((t: any) => ({
    time: t.time,
    soldOut: t.booked >= t.capacity,
    left: t.capacity - t.booked,
  })) : [];

  return (
    <>
      <Navbar onSearch={() => {}} />
      <div className="min-h-screen bg-gray-50">
        <div className="flex flex-col items-center pt-8">
          <div className="w-full max-w-6xl flex justify-start">
            <button
              className="flex items-center text-sm text-gray-600 mb-4"
              onClick={() => navigate(-1)}
            >
              &larr; Details
            </button>
          </div>
          <div className="flex flex-row gap-6 max-w-6xl w-full">
            <div className="flex-1 flex flex-col gap-6">
              <div className="w-[765px] h-[381px] mb-6 rounded-lg overflow-hidden">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="rounded-lg p-6">
                <h2 className="text-xl font-bold mb-1">{experience.title}</h2>
                <p className="mb-3 text-gray-600">{experience.description}</p>
                <div className="mb-4">
                  <div className="font-semibold mb-2">Choose date</div>
                  <div className="flex gap-2">
                    {availableDates.map((date: string) => (
                      <button
                        key={date}
                        className={`px-4 py-1 rounded bg-gray-100 text-gray-700 border transition-all ${
                          date === selectedDate
                            ? "bg-yellow-400 border-yellow-500 font-semibold"
                            : "border-gray-200"
                        }`}
                        onClick={() => {
                          setSelectedDate(date);
                          const slot = experience.slots.find((s: any) => s.date === date);
                          setSelectedTime(slot?.times?.[0]?.time || "");
                        }}
                      >
                        {date}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="font-semibold mb-2">Choose time</div>
                  <div className="flex gap-2">
                    {availableTimes.map((slot: any) => (
                      <button
                        key={slot.time}
                        disabled={slot.soldOut}
                        className={`px-4 py-1 rounded text-sm border transition-all ${
                          slot.soldOut
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-white hover:bg-yellow-50"
                        } ${
                          slot.time === selectedTime
                            ? "border-yellow-500 font-semibold bg-yellow-100"
                            : "border-gray-200"
                        }`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                        {!slot.soldOut && slot.left > 0 && (
                          <span className="ml-2 text-red-500 text-xs">{slot.left} left</span>
                        )}
                        {slot.soldOut && (
                          <span className="ml-2 text-gray-600 text-xs">Sold out</span>
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 ml-1">
                    <div className="font-semibold mb-2">About</div>
                    <div className="bg-gray-200 rounded-md p-3 text-xs text-gray-600">
                      Scenic routes, trained guides, and safety briefing. Minimum age 10.
                    </div>
                  </div>
                </div>          
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 shadow-sm w-80 h-fit">
              <div className="mb-4 flex justify-between text-gray-700 text-base">
                <span>Starts at</span>
                <span className="font-bold text-black">₹{experience.price}</span>
              </div>
              <div className="mb-4 flex items-center justify-between">
                <span>Quantity</span>
                <span className="flex items-center gap-2">
                  <button
                    className="px-2 py-1 rounded bg-gray-300"
                    onClick={decrementQty}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2">{quantity}</span>
                  <button
                    className="px-2 py-1 rounded bg-gray-300"
                    onClick={incrementQty}
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </span>
              </div>
              <div className="mb-2 flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{experience.price * quantity}</span>
              </div>
              <div className="mb-2 flex justify-between text-gray-700">
                <span>Taxes</span>
                <span>₹59</span>
              </div>
              <div className="mb-5 flex justify-between font-semibold text-gray-900">
                <span>Total</span>
                <span>₹{experience.price * quantity + 59}</span>
              </div>
              <button className="w-full bg-gray-300 text-gray-700 font-medium py-2 rounded-lg shadow-sm hover:bg-yellow-400 hover:text-black transition" onClick={handleConfirmClick}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
