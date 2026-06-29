'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function WhatsAppButton() {
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Only mount on client to avoid server-side hydration mismatches
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 opacity-0 pointer-events-none" />
    );
  }

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3">
      {/* Editorial Tooltip - Elegant slide and fade on hover */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block bg-obsidian-soft border border-gold/30 text-stone px-4 py-2.5 shadow-2xl relative select-none max-w-xs font-body text-[11px] tracking-wider uppercase backdrop-blur-lg"
          >
            <div className="absolute right-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-obsidian-soft border-t border-r border-gold/30 rotate-45" />
            <span className="text-white font-semibold mr-1">B2B INQUIRIES:</span>
            <span className="text-gold">Direct Desk</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Luxury Contact Button */}
      <motion.a
        href="https://wa.me/251924115178"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="group relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-obsidian-soft border border-white/10 hover:border-gold/40 transition-colors shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-gold"
      >
        {/* Subtle, luxury emerald pulsing background ring to signify active online messaging */}
        <span className="absolute inset-0 rounded-full bg-emerald-500/5 animate-ping opacity-75 pointer-events-none" />

        {/* Dynamic, responsive gold accent rotating or pulse layer */}
        <motion.span
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -inset-[3px] rounded-full border border-gold/20 group-hover:border-gold/45 transition-colors pointer-events-none"
        />

        {/* Small Active Badge Dot */}
        <span className="absolute top-1 right-1 w-3 h-3 rounded-full bg-emerald-500 border border-obsidian animate-pulse" />

        {/* Official WhatsApp Brand Mark SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 sm:w-7 sm:h-7 fill-[#25D366] group-hover:fill-gold transition-colors duration-300"
          aria-hidden="true"
        >
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </motion.a>
    </div>
  );
}
