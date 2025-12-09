'use client';
import { motion } from "framer-motion";
import { User, BadgeCheck, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  imgSrc: string;
  name: string;
  bio: string;
  stats?: { followers: number; posts: number };
  onSwipe?: (dir: "left" | "right") => void;
};

export default function ProfileCard({
  imgSrc,
  name,
  bio,
  stats = { followers: 312, posts: 48 },
  onSwipe,
}: Props) {
  const [following, setFollowing] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -6 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative w-[360px] aspect-[9/16] rounded-[36px] overflow-hidden shadow-[0_8px_40px_-4px_rgba(0,0,0,0.3)] bg-white select-none cursor-pointer"
    >
      {/* IMAGE BACKGROUND */}
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
      >
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover"
          priority
        />

        {/* Top-to-bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-white/5" />
      </motion.div>

      {/* BOTTOM GLASS SECTION */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] p-6
          bg-white/20 backdrop-blur-2xl border-t border-white/30
          flex flex-col justify-between rounded-t-[32px]">

        {/* NAME + BADGE */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-white text-[28px] font-bold tracking-tight drop-shadow-md">
              {name}
            </h3>
            <BadgeCheck className="w-6 h-6 text-white drop-shadow-lg" />
          </div>

          {/* BIO */}
          <p className="text-white/90 text-[15px] leading-relaxed font-medium line-clamp-2 drop-shadow-md">
            {bio}
          </p>
        </div>

        {/* STATS + FOLLOW BUTTON */}
        <div className="flex items-center justify-between mt-3">

          {/* STATS */}
          <div className="flex items-center gap-6 text-white font-semibold">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 opacity-80" />
              <span>{stats.followers}</span>
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 opacity-80" />
              <span>{stats.posts}</span>
            </div>
          </div>

          {/* FOLLOW BUTTON */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            animate={{ scale: following ? 1.07 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 12 }}
            onClick={(e) => {
              e.stopPropagation();
              setFollowing((v) => !v);
            }}
            className={`flex items-center gap-1 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg 
              ${following
                ? "bg-emerald-600 text-white shadow-emerald-300/40"
                : "bg-white/90 text-slate-900 backdrop-blur-md hover:bg-white"
              }`}
          >
            {following ? "Following" : <>Follow <Plus className="w-4 h-4" /></>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
