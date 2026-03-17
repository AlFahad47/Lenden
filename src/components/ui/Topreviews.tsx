"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaLock } from "react-icons/fa";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { TestimonialsSection } from "@/components/blocks/testimonials-with-marquee";
import { Button } from "@/components/ui/button";

type ReviewType = {
  _id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  email: string;
};

export default function TopReviews() {
  const { data: session } = useSession();
  const [topReviews, setTopReviews] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const testimonials = useMemo(
    () =>
      topReviews
        .filter((review) => Boolean(review.comment?.trim()))
        .map((review) => {
          const emailPrefix = review.email?.split("@")[0] || "novapay-user";
          const handle = `@${emailPrefix.replace(/[^a-zA-Z0-9._-]/g, "").slice(0, 16) || "novapay-user"}`;
          const plainComment = (review.comment || "").trim();
          const shortenedComment =
            plainComment.length > 120
              ? `${plainComment.slice(0, 120)}...`
              : plainComment;

          return {
            author: {
              name: review.name || "NovaPay User",
              handle,
              avatar: review.avatar || "/user.jfif",
            },
            text: shortenedComment,
          };
        }),
    [topReviews],
  );

  useEffect(() => {
    const fetchTopReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data: unknown = await res.json();
        // Use all review records from the database and guard unexpected payloads
        setTopReviews(Array.isArray(data) ? (data as ReviewType[]) : []);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopReviews();
  }, []);

  return (
    <section className="py-20 bg-[#F0F7FF] dark:bg-[#040911] overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="mb-16 flex flex-col justify-between gap-6 text-left md:flex-row md:items-end">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-2xl font-extrabold text-gray-800 dark:text-white md:text-4xl"
            >
              What Our Users{" "}
              <span className="bg-linear-to-r from-[#4DA1FF] to-[#1E50FF] bg-clip-text text-transparent">
                Say
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.10 }}
              className="mt-3 max-w-2xl text-sm text-gray-600 dark:text-gray-300 md:text-base"
            >
              Real feedback from NovaPay users worldwide, sharing how faster
              payments and smarter money tools improved their daily lives.
            </motion.p>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
            {session ? (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="group rounded-2xl border-gray-200 px-6 font-bold dark:border-white/10"
              >
                <Link href="/review">
                  Share Your Experience
                  <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            ) : (
              <Button
                onClick={() => signIn("google")}
                variant="novapay"
                size="lg"
                className="rounded-2xl px-6 font-bold"
                aria-label="Login to Review"
              >
                <FaLock size={14} />
                Login to Review
              </Button>
            )}
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-64 rounded-3xl bg-gray-200 animate-pulse dark:bg-white/5"
              />
            ))}
          </div>
        ) : testimonials.length > 0 ? (
          <div className="p-2">
            <TestimonialsSection
              testimonials={testimonials}
              className="bg-transparent py-0"
            />
          </div>
        ) : (
          <div className="rounded-3xl border border-gray-200 bg-white/70 px-6 py-16 text-center text-gray-500 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">
            No reviews yet. Be the first to share your experience.
          </div>
        )}

        {/* View All Button */}
        <div className="mt-16 text-center">
          <Link
            href="/review"
            className="text-gray-500 hover:text-[#1E50FF] font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            See all community feedback <FaArrowRight size={12} />
          </Link>
        </div>
      </div>
    </section>
  );
}
