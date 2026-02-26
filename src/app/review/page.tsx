"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import { useSession, signIn } from "next-auth/react"
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

  const { data: session } = useSession()
  const currentUserEmail = session?.user?.email

  const [reviews, setReviews] = useState<ReviewType[]>([
    { name: "Ayesha Rahman", email: "ayesha@example.com", rating: 5, comment: "Transfers are instant and the UI feels premium. Love it!", avatar: "/avatars/user1.png" },
    { name: "Tanvir Ahmed", email: "tanvir@example.com", rating: 4, comment: "Very smooth experience. Security feels strong.", avatar: "/avatars/user2.png" },
    { name: "Nusrat Jahan", email: "nusrat@example.com", rating: 5, comment: "Best wallet I’ve used — fast and simple.", avatar: "/avatars/user3.png" },
    { name: "Sadia Islam", email: "sadia@example.com", rating: 2, comment: "UI needs improvement and slow at times.", avatar: "/avatars/user4.png" }
  ])

  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState<number>(0)
  const formRef = useRef<HTMLDivElement>(null)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const submitReview = () => {

    if (!session) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please sign in with Google first."
      })
      signIn("google")
      return
    }

    if (!name.trim() || !comment.trim() || rating === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Form",
        text: "Please fill all fields and select rating."
      })
      return
    }

    const newReview: ReviewType = {
      name: session.user?.name || name,
      email: session.user?.email || "",
      rating,
      comment,
      avatar: session.user?.image || "/avatars/default.png"
    }

    if (editingIndex !== null) {
      const updatedReviews = [...reviews]
      updatedReviews[editingIndex] = newReview
      setReviews(updatedReviews)
      setEditingIndex(null)
    } else {

      const alreadyReviewed = reviews.find(
        r => r.email === session.user?.email
      )

      if (alreadyReviewed) {
        Swal.fire({
          icon: "warning",
          title: "Already Reviewed",
          text: "You already submitted a review. You can update it."
        })
        return
      }

      setReviews([newReview, ...reviews])
    }

    setName("")
    setComment("")
    setRating(0)

    Swal.fire({
      icon: "success",
      title: editingIndex !== null
        ? "Review Updated!"
        : "Review Submitted!"
    })
  }

  const deleteReview = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
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

  const totalReviews = reviews.length
  const high = reviews.filter(r => r.rating >= 4.5).length
  const medium = reviews.filter(r => r.rating >= 3 && r.rating < 4.5).length
  const low = reviews.filter(r => r.rating < 3).length

  return (
    <div className="relative min-h-screen bg-[#F0F7FF] dark:bg-[#040911] transition-colors overflow-hidden">

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute top-3 left-5 text-[#BDDD7E] text-4xl" animate={{ y: [0, 15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}><FaWallet /></motion.div>
        <motion.div className="absolute top-32 right-10 text-[#FACC15] text-5xl" animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}><FaMoneyBillWave /></motion.div>
        <motion.div className="absolute bottom-20 left-20 text-[#BDDD7E] text-4xl" animate={{ y: [0, 10, 0], x: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}><FaCoins /></motion.div>
        <motion.div className="absolute bottom-10 right-5 text-[#FACC15] text-3xl" animate={{ y: [0, -8, 0], x: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}><FaChartLine /></motion.div>
      </div>

      {/* Header */}
      <div className="relative max-w-6xl mx-auto px-6 py-14 text-center z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold
          bg-gradient-to-r
          from-[#0061ff] via-[#0095ff] to-[#00d4ff]
          dark:from-white dark:via-[#93C5FD] dark:to-[#0061ff]
          bg-clip-text text-transparent">
          User Reviews
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Summary & feedback from our users
        </p>

        <button
          onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] m-3 p-3 rounded-3xl text-white cursor-pointer"
        >
          Submit a Review
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="relative w-11/12 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-16 z-10">
        {reviews.map((review, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: i * 0.1 }}
            className="relative group backdrop-blur-xl bg-blue-200 dark:bg-blue-950 border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-lg flex flex-col justify-between min-h-[240px]"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <img
                  src={review.avatar || "/avatars/default.png"}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#BDDD7E]"
                />
                <div>
                  <h3 className="font-semibold text-lg text-[#1D4E48] dark:text-white">
                    {review.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {review.email}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-200">
                {review.comment}
              </p>

              <Stars count={review.rating} />

              {review.email === currentUserEmail && (
                <div className="flex gap-2 mt-3 justify-center">
                  <button
                    onClick={() => editReview(i)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteReview(i)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Review Form */}
      <div ref={formRef} className="max-w-xl mx-auto px-6 pb-20 z-10 relative">
        <motion.div className=" bg-blue-200 dark:bg-blue-950 border-2 border-gray-400 dark:border-gray-600 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] m-3 p-3 rounded-3xl text-white cursor-pointer">
            Submit Your Review
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            value={session?.user?.name || name}
            onChange={e => setName(e.target.value)}
            readOnly={!!session}
            className="w-full mb-3 p-3 rounded-lg border border-gray-800 dark:border-gray-300 text-gray-700 dark:text-gray-200 focus:outline-none bg-gray-100 dark:bg-gray-800"
          />

          <input
            type="email"
            value={session?.user?.email || ""}
            readOnly
            className="w-full mb-3 p-3 rounded-lg border border-gray-800 dark:border-gray-300 text-gray-700 dark:text-gray-200 focus:outline-none bg-gray-100 dark:bg-gray-800"
          />

          <textarea
            placeholder="Your Feedback..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={4}
            className="w-full mb-3 p-3 rounded-lg border border-gray-800 dark:border-gray-300 text-gray-700 dark:text-gray-200 focus:outline-none"
          />

          <div className="flex justify-center gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-3xl cursor-pointer hover:scale-125 transition ${
                  i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"
                }`}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>

          <button
            onClick={submitReview}
            className="bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] m-3 p-3 rounded-3xl text-white cursor-pointer"
          >
            {editingIndex !== null ? "Update Review" : "Submit Review"}
          </button>
        </motion.div>
      </div>
    </div>
  )
}