'use client'
import { motion } from "framer-motion";
import { Bookmark, User, CheckCircle, MapPin, BadgeCheck } from "lucide-react";
import Image from "next/image"
import { useState } from "react";

type Props = {
    imgSrc: string;
    name: string;
    bio: string;
    stats?: { followers: number; posts: number; };
    onSwipe?: (dir: "left" | "right") => void;
};

export default function ProfileCard({ imgSrc, name, bio, stats = { followers: 312, posts: 48 }, onSwipe }: Props) {
    const [following, setFollowing] = useState(false);

    return (
        <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1, opacity: 1 }}
            whileHover={{ y: -6, scale: 1.007 }}
            whileTap={{ scale: 0.995 }}
            className="relative w-[360px] aspect-[9/16] rounded-[32px] overflow-visible" // overflow-visible for outer ring shadow
        >
            {/* Outer soft rim/frame (separates card from page background) */}
            <div className="absolute -inset-1 rounded-[36px] pointer-events-none">
                <div className="absolute inset-0 rounded-[36px] border border-white/85 blur-[0.4px] opacity-95" />
                {/* subtle outer shadow to match phone mock */}
                <div className="absolute inset-0 rounded-[36px] shadow-[0_18px_40px_rgba(8,15,30,0.12)]" />
            </div>

            {/* Main card body (the visual phone-area) */}
            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-transparent">
                {/* Background image with mild desaturation and contrast to avoid harsh colors */}
                <div className="absolute inset-0">
                    <Image
                        src={imgSrc}
                        alt={name}
                        fill
                        className="object-cover object-center filter contrast-[0.98] saturate-[0.9]"
                        priority
                    />

                    {/* Two-layer overlay:
                        1) Radial vignette to darken edges so card never blends with page.
                        2) Vertical gradient so bottom has enough darkness for readable panel.
                    */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.2)_100%)]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/45" />
                    </div>
                </div>

                {/* Content area anchored to bottom */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-full">
                    {/* Glassmorphism panel */}
                    <div className="relative w-full rounded-3xl p-5
                                    bg-white/80 text-slate-900
                                    backdrop-blur-[10px] shadow-lg border border-white/40">
                        {/* small top shine/highlight */}
                        <div className="absolute -top-[40%] left-0 w-[120%] h-[60%] transform -translate-x-6 rotate-[6deg] opacity-8 pointer-events-none
                                        bg-[linear-gradient(90deg,rgba(255,255,255,0.12),rgba(255,255,255,0))]" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-slate-900 text-2xl font-extrabold tracking-tight">{name}</h3>

                                    {/* Verified Badge with white outline to remain visible on any bg */}
                                    <span className="inline-flex items-center justify-center rounded-full p-[2px] bg-white/60">
                                        <BadgeCheck className="w-5 h-5 text-emerald-600" />
                                    </span>
                                </div>
                            </div>

                            <p className="text-slate-700 text-sm leading-relaxed font-medium mb-4 line-clamp-2">
                                {bio}
                            </p>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                                <div className="flex items-center gap-4 text-sm font-medium text-slate-700">
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-emerald-600" />
                                        <span>{stats.followers}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Bookmark className="w-4 h-4 text-violet-600" />
                                        <span>{stats.posts}</span>
                                    </div>
                                </div>

                                <motion.button
                                    whileTap={{ scale: 0.96 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setFollowing(v => !v);
                                    }}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-colors shadow-md ${
                                        following
                                            ? "bg-emerald-600 text-white border border-emerald-500"
                                            : "bg-white text-slate-900 hover:bg-slate-100"
                                    }`}
                                >
                                    {following ? "Following" : "Follow"}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
