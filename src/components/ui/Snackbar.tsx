"use client";
import { useEffect, useRef, useState } from "react";
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
  const [render, setRender] = useState(isOpen);
  const [closing, setClosing] = useState(false);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (isOpen) {
      setRender(true);
      setClosing(false);
      const timer = setTimeout(() => onCloseRef.current(), duration);
      return () => clearTimeout(timer);
    }
    if (render) {
      setClosing(true);
      const t = setTimeout(() => setRender(false), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen, duration, render]);

  if (!render) return null;

  const bgColor = type === "success" ? "bg-success" : "bg-error";
  const icon = type === "success" ? <FaCheckCircle /> : <FaExclamationCircle />;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-md ${
        closing ? "snackbar-out" : "snackbar-in"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className={`${bgColor} text-white rounded-lg shadow-2xl overflow-hidden`}>
        <div className="flex items-center gap-3 p-4">
          <div className="text-2xl flex-shrink-0">{icon}</div>
          <p className="flex-1 text-sm font-medium">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Close notification"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </div>
        <div
          className="h-1 bg-white/30 origin-left"
          style={{
            animation: `snackbar-progress ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}
