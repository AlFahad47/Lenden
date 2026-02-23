"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    title: "How to use AI-Powered Expense Analytics to Save More",
    excerpt: "Discover how Lenden's new AI features categorize your spending and help you identify where you can cut back this month.",
    content: "Understanding your spending habits is the first step to financial freedom. With Lenden's new AI-Powered Expense Analytics, every transaction you make is automatically categorized—whether it's groceries, entertainment, or bills. \n\nOur AI doesn't just stop at categorizing; it analyzes your historical data to predict future spending and alerts you when you're about to exceed your monthly budget. Try setting up a custom alert today and watch your savings grow!",
    category: "Product Updates",
    date: "Oct 12, 2023",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
  },
  {
    id: 2,
    title: "5 Tips for Splitting Bills Without the Awkwardness",
    excerpt: "Dining out with friends should be fun. Learn how our Split-Bill Calculator ensures everyone pays their exact share effortlessly.",
    content: "We've all been there: the check arrives at a group dinner, and suddenly everyone is doing complex math on their napkins. It's awkward and time-consuming.\n\nHere are 5 tips to handle it seamlessly:\n1. Be upfront about splitting before ordering.\n2. Use Lenden's Split-Bill Calculator to divide exactly down to the last Taka.\n3. Include the tip and tax in the final split.\n4. Send Lenden payment requests right at the table.\n5. Keep it friendly!",
    category: "Financial Tips",
    date: "Oct 05, 2023",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
  },
  {
    id: 3,
    title: "Automate Your Wealth: The Power of Micro-Savings",
    excerpt: "You don't need a lot of money to start saving. See how rounding up your everyday purchases can build your wealth over time.",
    content: "Saving money shouldn't feel like a chore. That's why Lenden introduced Automated Micro-Savings. \n\nHere is how it works: whenever you make a transaction, Lenden rounds up the amount to the nearest 10 or 50 Taka and moves the spare change into a secure savings vault. For example, if you pay 45 Taka for a coffee, we round it up to 50 Taka and stash 5 Taka away for you. It feels invisible, but over a few months, those small amounts compound into a meaningful emergency fund!",
    category: "Savings",
    date: "Sep 28, 2023",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80",
  },
  
  {
    id: 5,
    title: "Understanding KYC: Unlock Your Wallet's Full Potential",
    excerpt: "What is KYC, why do we ask for your ID, and how does verifying your identity unlock higher transaction limits?",
    content: "You might have noticed that to send larger amounts of money, Lenden asks you to complete your KYC (Know Your Customer) verification. \n\nKYC is a standard financial regulation designed to prevent money laundering and fraud. By verifying your identity with a valid NID or Passport, we ensure the Lenden community remains safe and trustworthy. The best part? Completing your KYC digitally takes less than 2 minutes using your phone's camera, and it instantly bumps up your daily and monthly transaction limits!",
    category: "Guides",
    date: "Sep 02, 2023",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
  },
  {
    id: 6,
    title: "Never Run Out of Balance: Setting Up One-Tap Mobile Recharge",
    excerpt: "Recharge your phone or send balance to family members instantly using your favorite contacts list.",
    content: "Running out of mobile data in the middle of a meeting or dropping a call because your balance hit zero is incredibly frustrating. With Lenden's Mobile Recharge feature, you can top up any local operator instantly.\n\nTo make it even faster, you can save your family and friends to your 'Favorite Contacts' list. Next time you need to send your mom mobile balance, you won't need to type out her number—just tap her profile, enter the amount, and the top-up is processed instantly.",
    category: "Features",
    date: "Aug 22, 2023",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  }
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPost]);

  const closeModal = () => setSelectedPost(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1D4E48] dark:text-white sm:text-5xl mb-4">
            The Lenden Blog
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Insights, updates, and financial tips to help you master your money. Learn how to make the most out of your digital wallet.
          </p>
        </div>

        {/* Featured Post (Clickable Div) */}
        <div className="mb-16">
          <div 
            onClick={() => setSelectedPost(blogPosts[0])}
            className="cursor-pointer group block overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md dark:hover:shadow-[#BDDD7E]/10 md:flex"
          >
            <div className="relative h-64 w-full md:h-auto md:w-1/2 overflow-hidden bg-gray-200 dark:bg-gray-800">
              <img 
                src={blogPosts[0].imageUrl} 
                alt={blogPosts[0].title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:w-1/2">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block rounded-full bg-[#BDDD7E]/30 dark:bg-[#BDDD7E]/20 px-3 py-1 text-xs font-semibold text-[#1D4E48] dark:text-[#BDDD7E]">
                  {blogPosts[0].category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{blogPosts[0].date} • {blogPosts[0].readTime}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#1D4E48] dark:text-white mb-4 group-hover:opacity-80 transition-opacity">
                {blogPosts[0].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <span className="font-semibold text-[#1D4E48] dark:text-[#BDDD7E] flex items-center gap-2 group-hover:gap-3 transition-all">
                Read Article 
                <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid (Clickable Divs) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <div 
              key={post.id} 
              onClick={() => setSelectedPost(post)}
              className="cursor-pointer group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md dark:hover:shadow-[#BDDD7E]/10"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-[#1D4E48] dark:text-[#BDDD7E] bg-[#BDDD7E]/30 dark:bg-[#BDDD7E]/20 px-2 py-1 rounded-md">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1D4E48] dark:text-white mb-3 group-hover:opacity-80 transition-opacity">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* --- ANIMATED MODAL OVERLAY --- */}
      {/* 2. Wrap with AnimatePresence so exit animations work */}
      <AnimatePresence>
        {selectedPost && (
          // Overlay motion.div - fades in/out
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* Modal Content Box motion.div - zooms and fades */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white backdrop-blur-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-200 dark:bg-gray-800">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block rounded-full bg-[#BDDD7E]/30 dark:bg-[#BDDD7E]/20 px-3 py-1 text-xs font-semibold text-[#1D4E48] dark:text-[#BDDD7E]">
                    {selectedPost.category}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{selectedPost.date} • {selectedPost.readTime}</span>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-[#1D4E48] dark:text-white mb-6 leading-tight">
                  {selectedPost.title}
                </h2>
                
                <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {selectedPost.content}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}