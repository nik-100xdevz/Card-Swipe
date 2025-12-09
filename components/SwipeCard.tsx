"use client"
import { motion, useMotionValue, useTransform } from "framer-motion";
import ProfileCard from "./ProfileCard"
import { useRef } from "react";

type CardData = {id:string; imgSrc:string; name:string; bio:string;};

export default function SwipeCard({card , onSwipeComplete}: { card:CardData; onSwipeComplete:(id:string,dir:"left" | "right")=> void}){
    const x = useMotionValue(0);
    const rotate = useTransform(x,[-300,300],[-15,15]);
    const likeOpacity = useTransform(x,[20,120],[0,1]);
    const nopeOpacity = useTransform(x, [-20, -120],[0,1]);
    const ref =useRef<HTMLDivElement | null>(null);

    return (
        <motion.div
        ref={ref}
        style={{x, rotate}}
        drag="x"
        dragConstraints={{left:0,right:0}}
        dragElastic={0.2}
        onDragEnd={(_, info)=>{
            const velocity= info.velocity.x;
            const offset = info.offset.x;
            const threshold = 120;
            const vthreshold =800;
            if (offset > threshold || velocity > vthreshold) {
                //swipe right
                const width =ref.current?.offsetWidth ?? 800;
                const flyTo = width * 1.5;
                //animate off screen than callback
                x.set(flyTo);
                setTimeout(() => onSwipeComplete(card.id ,"right"),250);
            } else if (offset < -threshold || velocity < -vthreshold) {
                //swipe left
                const width = ref.current?.offsetWidth??800;
                const flyTo = -width * 1.5;
                x.set(flyTo);
                setTimeout(()=> onSwipeComplete(card.id,"left"),250);
            } else{
                // snap back
                x.set(0);
            }
        
        }}
        whileTap={{scale:1.01}}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
            {/* like nope badge */}
        <motion.div style={{opacity:likeOpacity}} className="absolute left-6 top-6 z-20 rounded-md px-3 py-1 bg-emerald-500/90 text-white font-semibold">
            LIKE
        </motion.div>
        <motion.div style={{ opacity: nopeOpacity }} className="absolute right-6 top-6 z-20 rounded-md px-3 py-1 bg-red-500/90 text-white font-semibold">
            NOPE
        </motion.div>

        <ProfileCard imgSrc={card.imgSrc} name={card.name} bio={card.bio} />
    </motion.div>
  );
}