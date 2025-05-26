import React from 'react'
import { motion } from 'framer-motion'

// AnimatedBackground component that creates a dynamic background effect
const AnimatedBackground: React.FC = () => {
  // Generate random lines for animation
  const lines = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    length: Math.random() * 150 + 100,
    angle: Math.random() * 360,
    duration: Math.random() * 15 + 8,
    delay: Math.random() * 3,
    opacity: Math.random() * 0.3 + 0.7,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary animated lines */}
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            width: `${line.length}px`,
            height: '3px',
            background: 'linear-gradient(90deg, rgba(59, 130, 246, 0) 0%, rgba(59, 130, 246, 0.8) 50%, rgba(59, 130, 246, 0) 100%)',
            transform: `rotate(${line.angle}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.3)',
          }}
          animate={{
            opacity: [0, line.opacity, 0],
            scale: [0.8, 1.2, 0.8],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Secondary animated lines */}
      {lines.map((line) => (
        <motion.div
          key={`secondary-${line.id}`}
          className="absolute"
          style={{
            left: `${(line.x + 30) % 100}%`,
            top: `${(line.y + 20) % 100}%`,
            width: `${line.length * 0.7}px`,
            height: '2px',
            background: 'linear-gradient(90deg, rgba(37, 99, 235, 0) 0%, rgba(37, 99, 235, 0.6) 50%, rgba(37, 99, 235, 0) 100%)',
            transform: `rotate(${line.angle + 45}deg)`,
            transformOrigin: 'left center',
            boxShadow: '0 0 6px rgba(37, 99, 235, 0.2)',
          }}
          animate={{
            opacity: [0, line.opacity * 0.7, 0],
            scale: [0.8, 1.1, 0.8],
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: line.duration * 1.2,
            delay: line.delay + 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground; 