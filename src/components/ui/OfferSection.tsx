 "use client";

  const features = [
    {
      icon: "🔒",
      title: "Bank-Grade Security",
      description: "Your funds are protected with end-to-end encryption and multi-layer authentication.",
    },
    {
      icon: "⚡",
      title: "Instant Transfers",
      description: "Send and receive money in seconds — anytime, anywhere across Bangladesh.",
    },
    {
      icon: "💳",
      title: "Easy Payments",
      description: "Pay bills, recharge mobile, and shop online all from one wallet.",
    },
  ];

  export default function OfferSection() {
    return (
      <section className="w-full py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1D4E48]">
              What We Offer
            </h2>
            <p className="mt-4 text-gray-500 text-base md:text-lg max-w-xl mx-auto">
              Everything you need to manage your money — simple, fast, and secure.
            </p>
          </div>
        </div>
      </section>
    );
  }
