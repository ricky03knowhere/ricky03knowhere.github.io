import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-primary"
        >
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
            className="relative mb-8"
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.3)]">
              <span className="text-3xl font-bold text-white font-heading">R</span>
            </div>
            {/* Orbiting ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute -inset-3 rounded-2xl border border-accent-cyan/20"
            />
          </motion.div>

          {/* Loading bar */}
          <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
              className="h-full bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
