"use client";

import React from "react";
import { useEffect, useState } from "react";

export default function BannerUser() {
  const user = {
    name: "Rubaiya Hamid Rongkoni",
    email: "rubaiya@example.com",
    profilePic:
      "https://photodpshare.com/wp-content/uploads/2025/09/profile-picture-girls-download-free-780x1024.webp",
    totalBalance: 12500,
    recentActivities: [
      { id: 1, type: "sent", amount: 500, to: "John Doe", date: "2026-02-20" },
      { id: 2, type: "received", amount: 1500, from: "Jane Smith", date: "2026-02-19" },
      { id: 3, type: "recharge", amount: 200, date: "2026-02-18" },
      { id: 4, type: "received", amount: 800, from: "Ali Khan", date: "2026-02-17" },
      { id: 5, type: "sent", amount: 250, to: "Sara Lee", date: "2026-02-16" }
    ]
  };

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[60%] overflow-hidden transition-colors bg-gradient-to-r from-teal-600 to-green-500 dark:from-[#1B2A34] dark:via-[#0F172A] dark:to-[#1D4E48]">

      {/* Full background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cms.star.global/wp-content/uploads/2022/08/From-digital-wallet-to-super-app.jpg"
          alt="Banner background"
          className="w-full h-full object-cover"
        />
        {/* Overlay for gradient effect on top of image */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-500 dark:from-[#1B2A34] dark:to-[#1D4E48] opacity-70"></div>
      </div>

      {/* Container */}
      <section className="relative w-11/12 mx-auto rounded-b-3xl overflow-hidden flex flex-col md:flex-row items-start md:items-center gap-6  py-8 md:py-12 z-10 text-gray-100 dark:text-gray-50">

        {/* Left: User info & total balance */}
        <div className="flex-1 flex flex-col gap-5">
          <div className="flex items-center gap-4">
            <img
              src={user.profilePic}
              alt="User profile"
              className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-300"
            />
            <div>
              <h2 className="text-xl md:text-2xl font-bold">{user.name}</h2>
              <p className="text-sm opacity-80">{user.email}</p>
            </div>
          </div>

          <div>
            <p className="text-sm opacity-80">Total Balance</p>
            <h1 className="text-3xl md:text-4xl font-extrabold">${user.totalBalance.toLocaleString()}</h1>

            {/* Animated Go to Dashboard button */}
            <button
              className={`mt-4 w-full md:w-1/2 bg-[#1D4E48] dark:bg-[#BDDD7E] font-semibold py-2 dark:text-black rounded-lg transition-all duration-700 
              ${animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"} hover:scale-105`}
            >
              Go to Your Dashboard
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex gap-3 mt-4 flex-wrap">
            <button className="bg-white text-teal-600 dark:bg-gray-700 dark:text-teal-400 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Send
            </button>
            <button className="bg-white text-teal-600 dark:bg-gray-700 dark:text-teal-400 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Add Money
            </button>
            <button className="bg-white text-teal-600 dark:bg-gray-700 dark:text-teal-400 px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
              Recharge
            </button>
          </div>

          
        </div>

        {/* Right: Recent activities */}
        <div className="flex-1 md:flex-[0.4] bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg max-h-[60vh] overflow-y-auto w-full flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="font-bold mb-3 text-gray-800 dark:text-gray-100 text-lg">Recent Activities</h3>
            <ul className="flex flex-col gap-2">
              {user.recentActivities.map(activity => (
                <li
                  key={activity.id}
                  className="flex justify-between items-center p-3 text-black dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="capitalize font-medium">{activity.type} {activity.to || activity.from || ""}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-300">{activity.date}</span>
                  </div>
                  <span className={`font-semibold ${activity.type === "sent" ? "text-red-500" : "text-green-500"}`}>
                    {activity.type === "sent" ? "-" : "+"}${activity.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </section>
    </div>
  );
}