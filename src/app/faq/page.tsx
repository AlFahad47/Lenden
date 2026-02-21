"use client";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi2";


export default function page() {
  const faqs = [
    {
      question: "What is Lenden?",
      answer: "Lenden is a smart digital wallet that allows you to easily store money, send/receive funds, automate your savings, split bills with friends, and track your expenses using AI.",
    },
    {
      question: "How does the Split-Bill Calculator work?",
      answer: "When dining out or sharing expenses, simply enter the total amount and select the contacts you're splitting it with. Lenden calculates everyone's exact share and instantly sends them a payment request.",
    },
    {
      question: "How does Smart Fraud Checking keep me safe?",
      answer: "We use advanced AI to monitor your account 24/7. If our system detects an unusual login location or an uncharacteristic transaction pattern, it will temporarily pause the transaction and alert you immediately.",
    },
    {
      question: "What is KYC and why do I need it?",
      answer: "KYC (Know Your Customer) is a standard identity verification process. We require you to upload a valid ID to ensure the safety of our platform and to unlock higher daily transaction limits for your account.",
    },
    {
      question: "How does the AI-Powered Expense Analytics work?",
      answer: "Lenden automatically categorizes your transactions (e.g., Groceries, Transport, Entertainment). Our AI then analyzes these patterns to give you insights into your spending habits and helps you stay within your budget.",
    },
    {
      question: "Are there any fees for sending money?",
      answer: "Sending money to other Lenden users is completely free. Small standard fees may apply when transferring money back to your traditional bank account or during mobile recharges.",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-16 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-extrabold  text-[#1D4E48] dark:text-gray-50  mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-50">
            Everything you need to know about the Lenden digital wallet. Can't find the answer you're looking for?{" "}
            <Link href="/support" className="text-[#1D4E48] dark:text-gray-300 font-semibold underline hover:text-opacity-80 transition-colors">
              Chat to our friendly team.
            </Link>
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-1.5 text-gray-900">
                <h2 className="text-lg font-semibold text-[#1D4E48]">
                  {faq.question}
                </h2>

                <span className="relative size-6 shrink-0 bg-[#BDDD7E] rounded-full flex items-center justify-center transition duration-300 group-open:-rotate-180">
                  <HiChevronDown className="size-4 text-[#1D4E48] stroke-3" />
                </span>
              </summary>

              <p className="mt-4 leading-relaxed text-gray-600 border-l-4 border-[#BDDD7E] pl-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center bg-[#1D4E48] rounded-2xl p-8 shadow-md">
          <h3 className="text-2xl font-bold text-[#BDDD7E] mb-2">Still have questions?</h3>
          <p className="text-white mb-6 opacity-90">Our customer support is available 24/7 to assist you.</p>
          <Link 
            href="/support" 
            className="inline-block rounded-full bg-[#BDDD7E] px-8 py-3 text-base font-semibold text-[#1D4E48] hover:bg-opacity-90 transition-all shadow-sm"
          >
            Open Live Chat
          </Link>
        </div>

      </div>
    </div>
  );
}