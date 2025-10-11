"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HandIcon } from "@radix-ui/react-icons";
import { incrementClaps } from "@/lib/utils";

interface ClapParticle {
  id: number;
  x: number;
  y: number;
}

export default function ClapAnimation({
  postId,
  collectionName,
  setClaps,
  claps,
}: {
  postId: string;
  collectionName: string;
  setClaps: (type: number) => void;
  claps: number;
}) {
  const [particles, setParticles] = useState<ClapParticle[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClap = async () => {
    setIsAnimating(true);
    setClaps(claps + 1);
    await incrementClaps(postId, collectionName);

    // Create particles
    const newParticles = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 50,
      y: (Math.random() - 0.8) * 50,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticles[0].id));
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      <button
        onClick={handleClap}
        className="relative focus:outline-none"
        aria-label="Clap"
      >
        <motion.div
          animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 0.3 }}
          className="relative z-10"
        >
          <HandIcon
            className={`w-6 h-6 ${
              isAnimating ? "text-primary" : "text-gray-600"
            }`}
          />
        </motion.div>

        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
              animate={{
                opacity: 0,
                scale: 1.5,
                x: particle.x,
                y: particle.y,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-full h-full bg-primary rounded-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </button>

      <motion.span
        key={claps}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-md text-gray-600 min-w-[20px] font-bold flex items-center"
      >
        {claps}
      </motion.span>
    </div>
  );
}
