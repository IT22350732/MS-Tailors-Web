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

// Interactive 3D Tilt Card Component
interface Card3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
  glare?: boolean;
}

export function Card3D({
  children,
  className = "",
  glowColor = "rgba(56, 119, 246, 0.3)",
  intensity = 15,
  glare = true,
  ...props
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -intensity;
    const rotY = ((x - centerX) / centerX) * intensity;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-sm transition-shadow duration-300 ${className}`}
      {...(props as any)}
    >
      {/* Dynamic 3D Glare Light */}
      {glare && (
        <div
          className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-300 z-20"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
            opacity: glarePos.opacity,
          }}
        />
      )}

      {/* 3D Ambient Glow */}
      <div
        className="absolute -inset-1 rounded-sm blur-md -z-10 transition-opacity duration-300 pointer-events-none"
        style={{
          background: glowColor,
          opacity: glarePos.opacity > 0 ? 0.8 : 0,
        }}
      />

      <div style={{ transform: "translateZ(20px)" }} className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}
