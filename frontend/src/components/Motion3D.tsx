"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Global top scroll progress bar with electric blue laser gradient
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-light via-blue to-blue-electric origin-left z-50 shadow-[0_0_12px_#3877F6]"
    />
  );
}

// 3D Parallax Background image with high clarity and depth
interface ParallaxBackgroundProps {
  imageUrl: string;
  alt?: string;
  opacity?: number;
  speed?: number;
  className?: string;
  overlayGradient?: string;
}

export function ParallaxBackground({
  imageUrl,
  opacity = 0.65,
  speed = 0.25,
  className = "",
  overlayGradient = "from-black/90 via-black/60 to-black/90",
}: ParallaxBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const travel = `${Math.round(speed * 60)}%`;
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}`, travel]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.05, 1.12]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden pointer-events-none z-0 ${className}`}>
      {/* Background Image with 3D Parallax Drift */}
      <motion.div
        style={{ y, scale, backgroundImage: `url('${imageUrl}')` }}
        className="absolute -inset-10 bg-cover bg-center transition-all duration-300"
      >
        {/* Crisp Image layer with high visibility */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${imageUrl}')`,
            opacity: opacity,
          }}
        />
      </motion.div>

      {/* Subtle modern dark vignette that preserves photo clarity while keeping text legible */}
      <div className={`absolute inset-0 bg-gradient-to-b ${overlayGradient}`} />
      <div className="absolute inset-0 bg-radial-highlight opacity-40" />
    </div>
  );
}

// Interactive Pop-Up / Zooming Card Component (No Rotation)
interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  glare?: boolean;
  zoomScale?: number;
  popY?: number;
}

export function Card3D({
  children,
  className = "",
  glowColor = "rgba(56, 119, 246, 0.45)",
  intensity = 15,
  glare = true,
  zoomScale = 1.04,
  popY = -8,
  ...props
}: Card3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlarePos({ x, y });
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={{
        scale: isHovered ? zoomScale : 1,
        y: isHovered ? popY : 0,
        zIndex: isHovered ? 25 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 380,
        damping: 24,
        mass: 0.6,
      }}
      className={`relative rounded-sm cursor-pointer will-change-transform ${className}`}
      style={{
        boxShadow: isHovered
          ? "0 22px 45px -12px rgba(0, 0, 0, 0.95), 0 0 30px -4px rgba(56, 119, 246, 0.45)"
          : "0 4px 15px -3px rgba(0, 0, 0, 0.7)",
      }}
      {...(props as any)}
    >
      {/* Dynamic Glare Specular Light on Zoom */}
      {glare && (
        <div
          className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.18) 0%, transparent 65%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Electric Blue Pop-Up Ambient Glow */}
      <div
        className="absolute -inset-0.5 rounded-sm blur-md -z-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: glowColor,
          opacity: isHovered ? 0.9 : 0,
        }}
      />

      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
