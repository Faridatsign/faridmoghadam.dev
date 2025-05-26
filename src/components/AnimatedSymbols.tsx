import React from 'react';
import { motion } from 'framer-motion';

const symbols = [
  { char: '#', color: 'text-blue-500' },
  { char: '@', color: 'text-purple-500' },
  { char: '^', color: 'text-green-500' },
  { char: '%', color: 'text-red-500' },
  { char: '[', color: 'text-yellow-500' },
  { char: ']', color: 'text-pink-500' },
  { char: '!', color: 'text-orange-500' },
  { char: '(', color: 'text-indigo-500' },
  { char: ')', color: 'text-indigo-500' },
  { char: '+', color: 'text-emerald-500' },
  { char: '-', color: 'text-rose-500' },
  { char: '{', color: 'text-cyan-500' },
  { char: '}', color: 'text-cyan-500' },
  { char: '×', color: 'text-violet-500' },
  { char: '=', color: 'text-amber-500' },
  { char: '<', color: 'text-teal-500' },
  { char: '>', color: 'text-teal-500' },
  { char: '&', color: 'text-fuchsia-500' },
  { char: '|', color: 'text-sky-500' },
  { char: '~', color: 'text-lime-500' },
  { char: '∑', color: 'text-blue-500' },
  { char: '√', color: 'text-green-500' },
  { char: 'π', color: 'text-purple-500' },
  { char: '∞', color: 'text-violet-500' },
  { char: '≈', color: 'text-amber-500' },
  { char: '≠', color: 'text-red-500' },
  { char: '≤', color: 'text-indigo-500' },
  { char: '≥', color: 'text-indigo-500' },
  { char: '∫', color: 'text-teal-500' },
  { char: '∆', color: 'text-orange-500' },
  { char: '∂', color: 'text-cyan-500' },
  { char: '∇', color: 'text-lime-500' },
  { char: '×', color: 'text-pink-500' },
  { char: '÷', color: 'text-sky-500' },
  { char: '=', color: 'text-fuchsia-500' },
  { char: '+', color: 'text-emerald-500' },
  { char: '-', color: 'text-rose-500' },
  { char: '%', color: 'text-yellow-500' },
  { char: '∝', color: 'text-blue-500' },
  { char: '⊕', color: 'text-purple-500' },
  ];
  

const AnimatedSymbols: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbols.map((symbol, index) => {
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = index * 0.5;
        
        return (
          <motion.div
            key={index}
            className={`absolute text-4xl font-mono ${symbol.color} opacity-50`}
            style={{
              left: `${randomX}%`,
              top: `${randomY}%`,
            }}
            initial={{ 
              opacity: 0,
              scale: 0,
              rotate: -180
            }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 360],
              y: [0, -200, 0],
              x: [0, Math.random() * 200 - 100, 0]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay,
              times: [0, 0.5, 1]
            }}
          >
            {symbol.char}
          </motion.div>
        );
      })}
    </div>
  );
};

export default AnimatedSymbols; 