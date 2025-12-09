"use client";
import SwipeCard from "./SwipeCard";
import { useState, useCallback, useEffect } from "react";

const initial = [
  {
    id: "1",
    imgSrc: "/img-1.jpg",
    name: "Sophie Bennett",
    bio: "Product Designer who focuses on simplicity & usability.",
  },
  {
    id: "2",
    imgSrc: "/img-2.jpg",
    name: "Liam Carter",
    bio: "Frontend engineer who loves clean animations and micro-interactions.",
  },
  {
    id: "3",
    imgSrc: "/img-3.jpg",
    name: "Maya Lee",
    bio: "Photographer & visual storyteller capturing moments.",
  },
  {
    id: "4",
    imgSrc: "/img-4.jpg",
    name: "Ethan Hunt",
    bio: "Adventure seeker and travel vlogger.",
  },
  {
    id: "5",
    imgSrc: "/img-5.jpg",
    name: "Olivia Chen",
    bio: "Digital artist exploring the boundaries of AI and creativity.",
  },
  {
    id: "6",
    imgSrc: "/img-6.jpg",
    name: "Noah Wilson",
    bio: "Musician and sound designer for indie games.",
  },
  {
    id: "7",
    imgSrc: "/img-7.jpg",
    name: "Ava Davis",
    bio: "Fashion stylist with a passion for sustainable trends.",
  },
  {
    id: "8",
    imgSrc: "/img-8.jpg",
    name: "Lucas Martinez",
    bio: "Chef experimenting with fusion cuisine.",
  },
  {
    id: "9",
    imgSrc: "/img-9.jpg",
    name: "Isabella Taylor",
    bio: "Architect designing eco-friendly urban spaces.",
  },
  {
    id: "10",
    imgSrc: "/img-10.jpg",
    name: "Mason Anderson",
    bio: "Tech reviewer and gadget enthusiast.",
  },
  {
    id: "11",
    imgSrc: "/img-11.jpg",
    name: "Charlotte Thomas",
    bio: "Yoga instructor promoting mindfulness and wellness.",
  },
  {
    id: "12",
    imgSrc: "/img-12.jpg",
    name: "Elijah Jackson",
    bio: "Street photographer capturing the soul of the city.",
  },
  {
    id: "13",
    imgSrc: "/img-13.jpg",
    name: "Amelia White",
    bio: "Botanist and plant mom sharing care tips.",
  },
  {
    id: "14",
    imgSrc: "/img-14.jpg",
    name: "James Harris",
    bio: "Fitness coach helping people reach their peak performance.",
  },
  {
    id: "15",
    imgSrc: "/img-15.jpg",
    name: "Harper Martin",
    bio: "Interior designer creating cozy and functional homes.",
  },
  {
    id: "16",
    imgSrc: "/img-16.jpg",
    name: "Benjamin Thompson",
    bio: "Software developer building open source tools.",
  },
  {
    id: "17",
    imgSrc: "/img-17.jpg",
    name: "Evelyn Garcia",
    bio: "Makeup artist specializing in special effects.",
  },
  {
    id: "18",
    imgSrc: "/img-18.jpg",
    name: "Alexander Robinson",
    bio: "History buff and museum curator.",
  },
  {
    id: "19",
    imgSrc: "/img-19.jpg",
    name: "Abigail Clark",
    bio: "Writer and poet finding beauty in words.",
  },
  {
    id: "20",
    imgSrc: "/img-20.jpg",
    name: "Henry Lewis",
    bio: "Graphic designer with a love for typography.",
  },
];

export default function CardDeck() {
  const [cards, setCards] = useState(initial);

  const handleSwipe = useCallback((id: string, dir: "left" | "right") => {
    // remove the card
    setCards((prev) => prev.filter((c) => c.id !== id));
    // you can handle like/dislike here (send API, store, show toast)
    console.log("swiped", id, dir);
  }, []);

  // keyboard controls (left/right)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (cards.length === 0) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        // programmatic swipe: simply remove top card and log
        const top = cards[0];
        handleSwipe(top.id, e.key === "ArrowRight" ? "right" : "left");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cards, handleSwipe]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] p-8">
      <div className="relative w-[360px] aspect-[9/16]">
        {cards.length === 0 && (
          <div className="absolute inset-0 rounded-[36px] bg-white/10 backdrop-blur-md flex items-center justify-center text-slate-700">
            No more cards
          </div>
        )}

        {cards.map((c, idx) => {
          // slight scale/offset for stacked effect
          const scale = 1 - idx * 0.03;
          const topOffset = idx * 12;
          return (
            <div
              key={c.id}
              style={{ zIndex: 100 - idx }}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            >
              <div
                style={{ transform: `translateY(${topOffset}px)`, scale }}
                className="w-full max-w-[360px]"
              >
                <SwipeCard card={c} onSwipeComplete={handleSwipe} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
