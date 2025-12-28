"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

export interface SnackbarProps {
  message: string;
  type: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
  duration?: number;
}

export function Snackbar({
  message,
  type,
  isOpen,
  onClose,
  duration = 5000,
}: SnackbarProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!isOpen) {
      setProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev - (100 / (duration / 100));
        if (next <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, duration, onClose]);

  const bgColor = type === "success" ? "bg-success" : "bg-error";
  const icon = type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-6 right-6 z-50 max-w-md"
        >
          <div
            className={`${bgColor} text-white rounded-lg shadow-2xl overflow-hidden`}
          >
            <div className="flex items-center gap-3 p-4">
              <div className="text-2xl flex-shrink-0">{icon}</div>
              <p className="flex-1 text-sm font-medium">{message}</p>
              <button
                onClick={onClose}
                className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
                aria-label="Close notification"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <motion.div
              className="h-1 bg-white/30"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: progress / 100 }}
              style={{ transformOrigin: "left" }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
