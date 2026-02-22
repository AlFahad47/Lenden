"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { FaStar, FaWallet, FaMoneyBillWave, FaCoins, FaChartLine } from "react-icons/fa"
import "sweetalert2/dist/sweetalert2.min.css"

type ReviewType = {
  name: string
  email: string
  rating: number
  comment: string
  avatar?: string
}

export default function Page() {
  const currentUserEmail = "ayesha@example.com" // Logged-in user email

  const [reviews, setReviews] = useState<ReviewType[]>([
    { name: "Ayesha Rahman", email: "ayesha@example.com", rating: 5, comment: "Transfers are instant and the UI feels premium. Love it!", avatar: "/avatars/user1.png" },
    { name: "Tanvir Ahmed", email: "tanvir@example.com", rating: 4, comment: "Very smooth experience. Security feels strong.", avatar: "/avatars/user2.png" },
    { name: "Nusrat Jahan", email: "nusrat@example.com", rating: 5, comment: "Best wallet I’ve used — fast and simple.", avatar: "/avatars/user3.png" },
    { name: "Sadia Islam", email: "sadia@example.com", rating: 2, comment: "UI needs improvement and slow at times.", avatar: "/avatars/user4.png" }
  ])

  const [name, setName] = useState("")
  const [email, setEmail] = useState(currentUserEmail)
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState<number>(0)
  const formRef = useRef<HTMLDivElement>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const submitReview = () => {
    if (!name.trim() || !email.trim() || !comment.trim() || rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill in all fields and select a rating before submitting.",
      })
      return
    }

    const newReview: ReviewType = { name, email, comment, rating, avatar: "/avatars/default.png" }

    if (editingIndex !== null) {
      // Update existing review
      const updatedReviews = [...reviews]
      updatedReviews[editingIndex] = newReview
      setReviews(updatedReviews)
      setEditingIndex(null)
    } else {
      // Add new review
      setReviews([newReview, ...reviews])
    }

    setName(""); setComment(""); setRating(0)

    Swal.fire({
      icon: "success",
      title: "Thank you!",
      text: editingIndex !== null ? "Your review has been updated." : "Your review has been submitted successfully.",
    })
  }

  const deleteReview = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1D4E48",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedReviews = [...reviews]
        updatedReviews.splice(index, 1)
        setReviews(updatedReviews)
        Swal.fire("Deleted!", "Your review has been deleted.", "success")
      }
    })
  }

  const editReview = (index: number) => {
    const review = reviews[index]
    setName(review.name)
    setComment(review.comment)
    setRating(review.rating)
    setEditingIndex(index)
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const Stars = ({ count }: { count: number }) => (
    <div className="flex gap-1 text-yellow-400 text-lg">
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} className={i < count ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"} />
      ))}
    </div>
  )

  // Summary
  const totalReviews = reviews.length
  const high = reviews.filter(r => r.rating >= 4.5).length
  const medium = reviews.filter(r => r.rating >= 3 && r.rating < 4.5).length
  const low = reviews.filter(r => r.rating < 3).length

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F0F7ED] via-[#FFFFFF] to-[#E6F2D9] dark:from-[#1B2A34] dark:via-[#0F172A] dark:to-[#1D4E48] transition-colors overflow-hidden">

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-3 left-5 text-[#BDDD7E] text-4xl" animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><FaWallet /></motion.div>
        <motion.div className="absolute top-32 right-10 text-[#FACC15] text-5xl" animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><FaMoneyBillWave /></motion.div>
        <motion.div className="absolute bottom-20 left-20 text-[#BDDD7E] text-4xl" animate={{ y: [0, 10, 0], x: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><FaCoins /></motion.div>
        <motion.div className="absolute bottom-10 right-5 text-[#FACC15] text-3xl" animate={{ y: [0, -8, 0], x: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><FaChartLine /></motion.div>
      </div>

      {/* Header */}
<div className="relative max-w-6xl mx-auto px-6 py-14 text-center z-10">
  <h1 className="text-4xl md:text-5xl font-bold text-[#1D4E48] dark:text-[#BDDD7E]">User Reviews</h1>
  <p className="mt-3 text-gray-600 dark:text-gray-300">Summary & feedback from our users</p>
  
  {/* Scroll to form button */}
  <button
    onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
    className="mt-6 bg-[#1D4E48] dark:bg-[#BDDD7E] text-white dark:text-[#111827] px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
  >
    Submit a Review
  </button>
</div>

      {/* Summary Bars */}
      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6 mb-16 z-10">
        <div className="bg-white/70 dark:bg-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-[#1D4E48] dark:text-white mb-3">High (4.5+)</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div className="bg-[#BDDD7E] h-4 rounded-full" style={{ width: `${(high/totalReviews)*100}%` }} />
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">{high} / {totalReviews} ({((high/totalReviews)*100).toFixed(0)}%)</p>
        </div>
        <div className="bg-white/70 dark:bg-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-[#1D4E48] dark:text-white mb-3">Medium (3-4.5)</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div className="bg-[#FACC15] h-4 rounded-full" style={{ width: `${(medium/totalReviews)*100}%` }} />
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">{medium} / {totalReviews} ({((medium/totalReviews)*100).toFixed(0)}%)</p>
        </div>
        <div className="bg-white/70 dark:bg-white/5 rounded-2xl p-6 shadow-lg backdrop-blur-xl">
          <h3 className="text-xl font-semibold text-[#1D4E48] dark:text-white mb-3">Low (&lt;3)</h3>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div className="bg-red-500 h-4 rounded-full" style={{ width: `${(low/totalReviews)*100}%` }} />
          </div>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">{low} / {totalReviews} ({((low/totalReviews)*100).toFixed(0)}%)</p>
        </div>
      </div>

      {/* Reviews Grid */}

      
      <div className="relative w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16 z-10">
        {reviews.map((review, i) => (
          <motion.div key={i} initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} whileHover={{ scale:1.05 }} transition={{ delay:i*0.1, type:"spring", stiffness:200 }}
            className="relative group backdrop-blur-xl bg-[#f4ffdf] dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-lg flex flex-col justify-between min-h-[240px] overflow-hidden"
          >
            <div className="flex flex-col gap-3 z-10 relative">
              <div className="flex items-center gap-4">
                <img src={review.avatar || "/avatars/default.png"} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#BDDD7E]" />
                <div>
                  <h3 className="font-semibold text-lg text-[#1D4E48] dark:text-white">{review.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{review.email}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-200">{review.comment}</p>
              <Stars count={review.rating} />

              {/* Update/Delete buttons for current user only */}
              {review.email === currentUserEmail && (
                <div className="flex gap-2 mt-3 justify-center">
                  <button onClick={() => editReview(i)} className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Update</button>
                  <button onClick={() => deleteReview(i)} className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

                        {/* Review Form */}



      <div ref={formRef} className="max-w-xl  mx-auto px-6 pb-20 z-10 relative">
        <motion.div className="bg-[#f4ffdf] dark:bg-[#1D4E48] border-2 border-gray-400 dark:border-gray-600 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-xl font-semibold text-[#1D4E48] mb-4">Submit Your Review</h2>
          <input type="text" placeholder="Your Name" value={name} onChange={e => setName(e.target.value)}
            className="w-full mb-3 p-3 rounded-lg border border-gray-800 dark:border-gray-300 text-gray-700 dark:text-gray-200 focus:outline-none"
          />
          <input type="email" placeholder="Email" value={email} readOnly
            className="w-full mb-3 p-3 rounded-lg border border-gray-800 dark:border-gray-300 text-gray-700 dark:text-gray-200 focus:outline-none bg-gray-100 dark:bg-gray-800 cursor-not-allowed"
          />
          <textarea placeholder="Your Feedback..." value={comment} onChange={e => setComment(e.target.value)} rows={4}
            className="w-full mb-3 p-3 rounded-lg border border-gray-800 dark:border-gray-300 text-gray-700 dark:text-gray-200 focus:outline-none"
          />
          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className={`text-3xl cursor-pointer hover:scale-125 transition ${i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"}`} onClick={() => setRating(i+1)} />
            ))}
          </div>
          <button onClick={submitReview} className="mt-2 bg-[#1D4E48] dark:bg-[#BDDD7E] text-white dark:text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
            {editingIndex !== null ? "Update Review" : "Submit Review"}
          </button>
        </motion.div>
      </div>

    </div>
  )
}