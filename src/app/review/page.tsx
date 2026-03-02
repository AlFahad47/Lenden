 "use client"

  import React, { useState, useRef } from "react"
  import { motion } from "framer-motion"
  import Swal from "sweetalert2"
  import { useSession, signIn } from "next-auth/react"
  import {
    FaStar, FaQuoteLeft, FaUser, FaEnvelope,
    FaPen, FaLock, FaWallet, FaCoins, FaChartLine, FaShieldAlt, FaCheckCircle,
  } from "react-icons/fa"
  import "sweetalert2/dist/sweetalert2.min.css"

  type ReviewType = {
    name: string
    email: string
    rating: number
    comment: string
    avatar?: string
  }

  const STAR_LABELS = ["Terrible", "Bad", "Okay", "Good", "Excellent"]

  const FLOATING = [
    { icon: <FaWallet />,    top: "8%",  left: "2%",  size: 26, dur: 7,  delay: 0   },
    { icon: <FaCoins />,     top: "20%", right: "2%", size: 30, dur: 9,  delay: 1.5 },
    { icon: <FaChartLine />, top: "55%", left: "1%",  size: 22, dur: 8,  delay: 0.8 },
    { icon: <FaShieldAlt />, top: "70%", right: "2%", size: 24, dur: 6,  delay: 2   },
  ]

  export default function Page() {
    const { data: session } = useSession()
    const currentUserEmail = session?.user?.email

    const [reviews, setReviews] = useState<ReviewType[]>([
      { name: "Ayesha Rahman", email: "ayesha@example.com", rating: 5, comment: "Transfers are instant and the UI feels premium. Love it!", avatar: "/avatars/user1.png" },
      { name: "Tanvir Ahmed",  email: "tanvir@example.com", rating: 4, comment: "Very smooth experience. Security feels strong.",           avatar: "/avatars/user2.png" },
      { name: "Nusrat Jahan",  email: "nusrat@example.com", rating: 5, comment: "Best wallet I've used — fast and simple.",               avatar: "/avatars/user3.png" },
      { name: "Sadia Islam",   email: "sadia@example.com",  rating: 2, comment: "UI needs improvement and slow at times.",                avatar: "/avatars/user4.png" },
    ])

    const [name, setName]                 = useState("")
    const [comment, setComment]           = useState("")
    const [rating, setRating]             = useState<number>(0)
    const [hoverRating, setHoverRating]   = useState<number>(0)
    const formRef                         = useRef<HTMLDivElement>(null)
    const [editingIndex, setEditingIndex] = useState<number | null>(null)

    const submitReview = () => {
      if (!session) {
        Swal.fire({ icon: "info", title: "Login Required", text: "Please sign in to submit a review." })
        signIn("google")
        return
      }
      const finalName = session.user?.name || name
      if (!finalName.trim() || !comment.trim() || rating === 0) {
        Swal.fire({ icon: "warning", title: "Incomplete Form", text: "Please fill all fields and select a rating." })
        return
      }
      const newReview: ReviewType = {
        name:   finalName,
        email:  session.user?.email || "",
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
      setName(""); setComment(""); setRating(0); setHoverRating(0)
      Swal.fire({ icon: "success", title: editingIndex !== null ? "Review Updated!" : "Review Submitted!" })
    }

    const deleteReview = (index: number) => {
      Swal.fire({
        title: "Delete this review?", icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#1E50FF", cancelButtonColor: "#d33",
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
      setName(r.name); setComment(r.comment); setRating(r.rating)
      setEditingIndex(index)
      formRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const total = reviews.length
    const avg   = total > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / total).toFixed(1)
      : "0.0"
    const distrib = [5, 4, 3, 2, 1].map(star => ({
      star,
      count: reviews.filter(r => r.rating === star).length,
      pct: total > 0
        ? Math.round((reviews.filter(r => r.rating === star).length / total) * 100)
        : 0,
    }))

    const activeRating = hoverRating || rating

    return (
      <div className="relative min-h-screen bg-[#F0F7FF] dark:bg-[#040911] transition-colors overflow-hidden">

        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blob1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-20px,20px) scale(0.95)} }
          @keyframes blob2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,40px) scale(1.05)} 66%{transform:translate(20px,-20px) scale(0.97)} }
          .blob1 { animation: blob1 12s ease-in-out infinite; }
          .blob2 { animation: blob2 15s ease-in-out infinite; }
          @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
          .card-shimmer::after { content:''; position:absolute; inset:0; background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.08) 50%,transparent 60%);
  transform:translateX(-100%); border-radius:inherit; }
          .card-shimmer:hover::after { animation: shimmer 0.7s ease forwards; }
        `}} />

        {/* Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="blob1 absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#4DA1FF]/10 dark:bg-[#4DA1FF]/5 blur-3xl" />
          <div className="blob2 absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#1E50FF]/10 dark:bg-[#1E50FF]/5 blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: "linear-gradient(#4DA1FF 1px,transparent 1px),linear-gradient(90deg,#4DA1FF 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Floating icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {FLOATING.map((f, i) => (
            <motion.div
              key={i}
              className="absolute text-[#4DA1FF]/10 dark:text-[#4DA1FF]/8"
              style={{ top: f.top, left: f.left, right: (f as {right?:string}).right, fontSize: f.size }}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              {f.icon}
            </motion.div>
          ))}
        </div>

        {/* ── COMPACT HEADER ── */}
        <div className="relative max-w-5xl mx-auto px-6 pt-10 pb-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4DA1FF]/30 bg-[#4DA1FF]/10 text-[#4DA1FF] text-sm font-medium mb-3"
          >
            <FaStar size={11} />
            NovaPay Reviews
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-[#4DA1FF] via-[#1E50FF] to-[#4DA1FF] bg-clip-text text-transparent leading-tight"
          >
            What Our Users Are Saying
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mt-2 text-gray-500 dark:text-gray-400 text-base max-w-lg mx-auto"
          >
            Real feedback from real NovaPay users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400"
          >
            <FaShieldAlt size={10} className="text-emerald-400" />
            <span>All reviews are from verified NovaPay users</span>
          </motion.div>
        </div>

        {/* ── MAIN 2-COLUMN LAYOUT ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
          <div className="grid lg:grid-cols-[400px_1fr] gap-6 items-start">

            {/* ── LEFT COLUMN: Stats + Form ── */}
            <div className="flex flex-col gap-5">

              {/* Stats card — compact */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-2xl p-5 shadow-lg"
              >
                <div className="flex items-center gap-5">
                  <div className="flex flex-col items-center min-w-[90px]">
                    <span className="text-5xl font-black bg-gradient-to-b from-[#4DA1FF] to-[#1E50FF] bg-clip-text text-transparent leading-none">
                      {avg}
                    </span>
                    <div className="flex gap-0.5 mt-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          size={13}
                          className={
                            i < Math.round(parseFloat(avg))
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-gray-400 mt-1">{total} reviews</p>
                  </div>
                  <div className="w-px h-16 bg-gray-200 dark:bg-white/10 shrink-0" />
                  <div className="flex-1 flex flex-col gap-1.5">
                    {distrib.map(({ star, count: cnt, pct }) => (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 w-3 text-right">{star}</span>
                        <FaStar size={9} className="text-yellow-400 shrink-0" />
                        <div className="flex-1 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.8, delay: 0.3 + (5 - star) * 0.06, ease: "easeOut" }}
                            className="h-full rounded-full bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF]"
                          />
                        </div>
                        <span className="text-[10px] text-gray-400 w-4 text-right">{cnt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── FORM ── */}
              <motion.div
                ref={formRef}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="relative rounded-2xl p-px bg-gradient-to-br from-[#4DA1FF]/50 via-[#1E50FF]/30 to-transparent shadow-xl shadow-[#1E50FF]/10"
              >
                <div className="rounded-2xl bg-white/85 dark:bg-[#070F1E]/90 backdrop-blur-2xl p-6">

                  {/* Profile image section */}
                  {session ? (
                    <div className="flex items-center gap-4 mb-5 p-3 rounded-2xl bg-[#4DA1FF]/5 border border-[#4DA1FF]/15">
                      {/* Avatar */}
                      <div className="p-0.5 rounded-full bg-gradient-to-br from-[#4DA1FF] to-[#1E50FF] shrink-0">
                        <img
                          src={session.user?.image || "/avatars/default.png"}
                          alt={session.user?.name || "User"}
                          className="w-14 h-14 rounded-full object-cover block"
                          onError={e => {
                            (e.target as HTMLImageElement).src =
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || "U")}&background=1E50FF&color=fff`
                          }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-[#4DA1FF] font-semibold uppercase tracking-wide">
                          Writing as
                        </p>
                        <p className="font-bold text-gray-800 dark:text-white truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 mb-5 p-3 rounded-2xl bg-[#4DA1FF]/5 border border-[#4DA1FF]/15">
                      <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center shrink-0">
                        <FaUser size={20} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Not signed in</p>
                        <button
                          onClick={() => signIn("google")}
                          className="text-xs text-[#4DA1FF] font-semibold hover:underline flex items-center gap-1 mt-0.5"
                        >
                          <FaLock size={10} />
                          Sign in to leave a review
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Form title */}
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <FaPen size={14} className="text-[#4DA1FF]" />
                    {editingIndex !== null ? "Update Your Review" : "Leave a Review"}
                  </h2>

                  {/* Name */}
                  <div className="relative mb-3">
                    <FaUser size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={session?.user?.name || name}
                      onChange={e => setName(e.target.value)}
                      readOnly={!!session}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 placeholder-gray-400
  text-sm focus:outline-none focus:ring-2 focus:ring-[#4DA1FF]/40 transition"
                    />
                  </div>

                  {/* Email */}
                  <div className="relative mb-3">
                    <FaEnvelope size={12} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={session?.user?.email || ""}
                      readOnly
                      placeholder="your@email.com"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-400 text-sm placeholder-gray-400
  focus:outline-none cursor-default"
                    />
                  </div>

                  {/* Comment */}
                  <textarea
                    placeholder="Share your experience with NovaPay..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    rows={3}
                    className="w-full mb-4 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-gray-700 dark:text-gray-200 placeholder-gray-400
  text-sm focus:outline-none focus:ring-2 focus:ring-[#4DA1FF]/40 transition resize-none"
                  />

                  {/* Star rating */}
                  <div className="flex flex-col items-center gap-1.5 mb-5">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Your Rating</p>
                    <div className="flex gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.button
                          key={i}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onMouseEnter={() => setHoverRating(i + 1)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(i + 1)}
                          className="focus:outline-none"
                        >
                          <FaStar
                            size={28}
                            className={
                              i < activeRating
                                ? "text-yellow-400 drop-shadow-sm"
                                : "text-gray-300 dark:text-gray-600"
                            }
                          />
                        </motion.button>
                      ))}
                    </div>
                    <p className="text-xs font-medium text-[#4DA1FF] h-4">
                      {activeRating > 0 ? STAR_LABELS[activeRating - 1] : ""}
                    </p>
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={submitReview}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#4DA1FF] to-[#1E50FF] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#1E50FF]/30
  hover:shadow-[#1E50FF]/50 transition-shadow"
                  >
                    {editingIndex !== null ? "Update Review" : "Submit Review"}
                  </motion.button>

                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: Review Cards ── */}
            <div>
              {/* Section label */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                  Community Reviews
                </span>
                <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
              </div>

              {/* Empty state */}
              {reviews.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-16 gap-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#4DA1FF]/10 flex items-center justify-center">
                    <FaStar size={24} className="text-[#4DA1FF]/40" />
                  </div>
                  <p className="text-gray-400 text-sm">No reviews yet. Be the first!</p>
                </motion.div>
              )}

              {/* Cards grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {reviews.map((review, i) => {
                  const isOwn = review.email === currentUserEmail
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08, ease: "easeOut" }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="card-shimmer relative overflow-hidden rounded-2xl p-5 flex flex-col gap-3 shadow-md transition-shadow hover:shadow-xl bg-gradient-to-br from-[#4DA1FF]/10 to-[#1E50FF]/5 border border-[#4DA1FF]/20 dark:from-[#4DA1FF]/8 dark:to-[#1E50FF]/5 dark:border-[#4DA1FF]/20 backdrop-blur-xl"
                    >
                      {isOwn && (
                        <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#4DA1FF]/20 text-[#4DA1FF] border border-[#4DA1FF]/30 tracking-wide">
                          YOUR REVIEW
                        </span>
                      )}

                      <FaQuoteLeft size={20} className="text-[#4DA1FF]/40" />

                      <p className="text-gray-700 dark:text-gray-200 text-sm leading-relaxed flex-1">
                        {review.comment}
                      </p>

                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <FaStar
                            key={s}
                            size={13}
                            className={s < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-500"}
                          />
                        ))}
                      </div>

                      <div className="h-px bg-[#4DA1FF]/15" />

                      <div className="flex items-center gap-3">
                        <div className="p-0.5 rounded-full shrink-0 bg-gradient-to-br from-[#4DA1FF] to-[#1E50FF]">
                          <img
                            src={review.avatar || "/avatars/default.png"}
                            alt={review.name}
                            className="w-9 h-9 rounded-full object-cover block"
                            onError={e => {
                              (e.target as HTMLImageElement).src =
                                `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=1E50FF&color=fff`
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-gray-800 dark:text-white text-sm truncate">{review.name}</p>
                            <FaCheckCircle size={11} className="text-[#4DA1FF] shrink-0" />
                          </div>
                          <p className="text-[10px] text-gray-400 truncate">{review.email}</p>
                        </div>
                      </div>

                      {isOwn && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => editReview(i)}
                            className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-[#4DA1FF]/15 text-[#4DA1FF] border border-[#4DA1FF]/30 hover:bg-[#4DA1FF]/25 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteReview(i)}
                            className="flex-1 py-1.5 text-xs font-medium rounded-lg bg-red-500/10 text-red-400 border border-red-400/30 hover:bg-red-500/20 transition"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
