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
      { name: "Nusrat Jahan", email: "nusrat@example.com", rating: 5, comment: "Best wallet I've used — fast and simple.", avatar: "/avatars/user3.png" },
      { name: "Sadia Islam", email: "sadia@example.com", rating: 2, comment: "UI needs improvement and slow at times.", avatar: "/avatars/user4.png" },
    ])

    const [name, setName] = useState("")
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState<number>(0)
    const formRef = useRef<HTMLDivElement>(null)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)

    const submitReview = () => {
      if (!session) {
        Swal.fire({ icon: "info", title: "Login Required", text: "Please sign in to submit a review." })
        signIn("google")
        return
      }
      if (!name.trim() || !comment.trim() || rating === 0) {
        Swal.fire({ icon: "warning", title: "Incomplete Form", text: "Please fill all fields and select a rating." })
        return
      }
      const newReview: ReviewType = {
        name: session.user?.name || name,
        email: session.user?.email || "",
        rating,
        comment,
        avatar: session.user?.image || "/avatars/default.png",
      }
      if (editingIndex !== null) {
        const updated = [...reviews]
        updated[editingIndex] = newReview
        setReviews(updated)
        setEditingIndex(null)
      } else {
        if (reviews.find(r => r.email === session.user?.email)) {
          Swal.fire({ icon: "warning", title: "Already Reviewed", text: "You already submitted a review. You can update it." })
          return
        }
        setReviews([newReview, ...reviews])
      }
      setName("")
      setComment("")
      setRating(0)
      Swal.fire({ icon: "success", title: editingIndex !== null ? "Review Updated!" : "Review Submitted!" })
    }

    const deleteReview = (index: number) => {
      Swal.fire({
        title: "Delete this review?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E50FF",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(result => {
        if (result.isConfirmed) {
          const updated = [...reviews]
          updated.splice(index, 1)
          setReviews(updated)
          Swal.fire("Deleted!", "Your review has been removed.", "success")
        }
      })
    }

    const editReview = (index: number) => {
      const r = reviews[index]
      setName(r.name)
      setComment(r.comment)
      setRating(r.rating)
      setEditingIndex(index)
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const Stars = ({ count }: { count: number }) => (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} size={14} className={i < count ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"} />
        ))}
      </div>
    )

    return (
      <div className="relative min-h-screen bg-[#F0F7FF] dark:bg-[#040911] transition-colors overflow-hidden">

        {/* Blob animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-20px,20px) scale(0.95)} }
          @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,40px) scale(1.05)} 66%{transform:translate(20px,-20px) scale(0.97)} }
          .blob1 { animation: blob1 12s ease-in-out infinite; }
          .blob2 { animation: blob2 15s ease-in-out infinite; }
        `}} />

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob1 absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#4DA1FF]/10 dark:bg-[#4DA1FF]/5 blur-3xl" />
          <div className="blob2 absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#1E50FF]/10 dark:bg-[#1E50FF]/5 blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{ backgroundImage: "linear-gradient(#4DA1FF 1px,transparent 1px),linear-gradient(90deg,#4DA1FF 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Header */}
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-14 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4DA1FF]/30 bg-[#4DA1FF]/10 text-[#4DA1FF] text-sm font-medium mb-6"
          >
            <FaStar size={11} />
            NovaPay Reviews
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#4DA1FF] via-[#1E50FF] to-[#4DA1FF] bg-clip-text text-transparent leading-tight"
          >
            What Our Users<br />Are Saying
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto"
          >
            Real feedback from real NovaPay users — honest, unfiltered experiences.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] text-white font-semibold text-base shadow-lg shadow-[#1E50FF]/30
   hover:shadow-[#1E50FF]/50 transition-shadow"
          >
            <FaStar size={13} />
            Write a Review
          </motion.button>
        </div>

        {/* Reviews Grid */}
        <div className="relative w-11/12 max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-16 z-10">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <img src={review.avatar || "/avatars/default.png"} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{review.name}</p>
                  <p className="text-xs text-gray-400">{review.email}</p>
                </div>
              </div>
              <Stars count={review.rating} />
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">{review.comment}</p>
              {review.email === currentUserEmail && (
                <div className="flex gap-2 mt-3">
                  <button onClick={() => editReview(i)} className="px-3 py-1 text-xs bg-[#4DA1FF] text-white rounded-lg hover:bg-[#1E50FF] transition">Update</button>
                  <button onClick={() => deleteReview(i)} className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Review Form */}
        <div ref={formRef} className="max-w-xl mx-auto px-6 pb-24 z-10 relative">
          <div className="bg-white/60 dark:bg-white/5 border border-white/30 dark:border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Leave a Review</h2>
            <input type="text" placeholder="Your Name" value={session?.user?.name || name} onChange={e => setName(e.target.value)} readOnly={!!session}
              className="w-full mb-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2
  focus:ring-[#4DA1FF]/50" />
            <input type="email" value={session?.user?.email || ""} readOnly placeholder="your@email.com"
              className="w-full mb-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 focus:outline-none" />
            <textarea placeholder="Share your experience..." value={comment} onChange={e => setComment(e.target.value)} rows={4}
              className="w-full mb-3 p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2
  focus:ring-[#4DA1FF]/50 resize-none" />
            <div className="flex justify-center gap-3 mb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  size={28}
                  className={`cursor-pointer transition-transform hover:scale-125 ${
                    i < rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                  }`}
                  onClick={() => setRating(i + 1)}
                />
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={submitReview}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] text-white font-semibold shadow-lg shadow-[#1E50FF]/30">
              {editingIndex !== null ? "Update Review" : "Submit Review"}
            </motion.button>
          </div>
        </div>

      </div>
    )
  }
