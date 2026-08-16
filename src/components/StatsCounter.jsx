import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { statsData } from '../data/portfolioData';

function SingleStatItem({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = item.value;
    const duration = 1800; // 1.8 seconds
    const steps = 40;
    const increment = (end - start) / steps;
    const stepTime = duration / steps;

    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, item.value]);

  const formattedNum = item.decimals > 0 
    ? displayValue.toFixed(item.decimals) 
    : Math.floor(displayValue);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-panel p-3.5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-800 text-center flex flex-col items-center justify-center hover:border-sky-500/40 transition-colors group"
    >
      <div className="text-xl sm:text-4xl font-extrabold text-white font-heading mb-1 tracking-tight flex items-center justify-center">
        <span className="text-gradient">
          {formattedNum}
        </span>
        <span className="text-sky-400 ml-1 text-sm sm:text-3xl">{item.suffix}</span>
      </div>
      <span className="text-[10px] sm:text-sm font-medium text-slate-400 uppercase tracking-wider line-clamp-1">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function StatsCounter() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, idx) => (
          <SingleStatItem key={stat.label} item={stat} index={idx} />
        ))}
      </div>
    </div>
  );
}
