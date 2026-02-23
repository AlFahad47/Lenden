"use client";

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BannerUser() {
  const user = {
    name: "Rubaiya Hamid Rongkoni",
    email: "rubaiya@example.com",
    profilePic:
      "https://photodpshare.com/wp-content/uploads/2025/09/profile-picture-girls-download-free-780x1024.webp",
    totalBalance: 12500,
    recentActivities: [
      { id: 1, type: "sent", amount: 500, to: "John Doe", date: "2026-02-20", category: "Shopping" },
      { id: 2, type: "received", amount: 1500, from: "Jane Smith", date: "2026-02-19" },
      { id: 3, type: "recharge", amount: 200, date: "2026-02-18" },
      { id: 4, type: "received", amount: 800, from: "Ali Khan", date: "2026-02-17" },
      { id: 5, type: "sent", amount: 250, to: "Sara Lee", date: "2026-02-16", category: "Food" },
      { id: 6, type: "sent", amount: 100, to: "Book Store", date: "2026-02-15", category: "Education" },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  // Slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % user.recentActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [user.recentActivities.length]);

  // Pie chart data
  const expenseActivities = user.recentActivities.filter(a => a.type === "sent" && a.category);
  const categories = [...new Set(expenseActivities.map(a => a.category))];

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses",
        data: categories.map(cat =>
          expenseActivities
            .filter(a => a.category === cat)
            .reduce((sum, a) => sum + a.amount, 0)
        ),
        backgroundColor: [
          "#34D399", // teal
          "#60A5FA", // blue
          "#FBBF24", // yellow
          "#F87171", // red
          "#A78BFA", // purple
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  const handleIndexChange = (idx) => setCurrentIndex(idx);

  return (
    <div className="relative h-[60vh] mt-1 overflow-hidden transition-colors bg-gradient-to-r from-teal-600 to-green-500 dark:from-[#1B2A34] dark:via-[#0F172A] dark:to-[#1D4E48]">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cms.star.global/wp-content/uploads/2022/08/From-digital-wallet-to-super-app.jpg"
          alt="Banner background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-green-500 dark:from-[#1B2A34] dark:to-[#1D4E48] opacity-70"></div>
      </div>

      <section className="relative w-11/12 h-[50vh] mx-auto rounded-b-3xl overflow-hidden grid grid-cols-3 gap-3  py-8 md:py-12 z-10 text-gray-100 dark:text-gray-50">

        {/* Left: User info */}
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

        
        {/* Pie Chart for Expenses */}
{categories.length > 0 && (
  <div className="rounded-xl p-4  border border-gray-700/50 shadow-xl dark:bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 flex flex-col items-center justify-center">
    <h4 className="text-white font-semibold mb-2 text-center">Expenses Distribution</h4>
    <div className="w-40  h-40 md:w-48 md:h-48">
      <Pie data={pieData} options={pieOptions} />
    </div>
  </div>
)}

        {/* Right: Recent activities carousel */}
        <div className="flex-1 md:flex-[0.4] relative min-h-40 overflow-hidden dark:bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent dark:from-gray-50 dark:to-gray-400">
              Recent Activities
            </h3>
            <span className="text-xs text-black dark:text-gray-500 p-2 bg-gray-300 dark:bg-gray-800/50 rounded-xl border border-gray-700/50">
              Live Updates
            </span>
          </div>
          
          <div className="relative">
            {/* Carousel navigation dots */}
            <div className="absolute -top-8 right-0 flex gap-1.5">
              {user.recentActivities.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? 'w-6 bg-green-400' 
                      : 'bg-gray-800 dark:bg-gray-200 hover:bg-gray-500'
                  }`}
                  onClick={() => handleIndexChange(idx)}
                />
              ))}
            </div>

            {/* Activities carousel */}
            <div 
              className="flex transition-transform duration-700 ease-out" 
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {user.recentActivities.map((activity, idx) => (
                <div 
                  key={activity.id} 
                  className="flex-none w-1/3 px-2 group"
                >
                  <div className="bg-gray-300 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 hover:border-green-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'sent' ? 'bg-red-400' : 'bg-green-400'
                      } animate-pulse`} />
                      <p className="text-black dark:text-gray-300 font-medium text-xs uppercase tracking-wider">
                        {activity.type}
                      </p>
                    </div>
                    
                    <p className="text-white dark:text-gray-50 font-semibold text-sm md:text-base">
                      <span className="text-black dark:text-gray-300">
                        {activity.to || activity.from || "N/A"}
                      </span>
                    </p>
                    
                    <p className={`font-bold text-lg mt-2 ${
                      activity.type === "sent" 
                        ? 'text-red-400 group-hover:text-red-300' 
                        : 'text-green-400 group-hover:text-green-300'
                    } transition-colors duration-300`}>
                      {activity.type === "sent" ? "-" : "+"}${activity.amount}
                    </p>
                    
                    {activity.time && (
                      <p className="text-xs text-gray-500 mt-2">
                        {activity.time}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>  

      </section>
    </div>
  );
}