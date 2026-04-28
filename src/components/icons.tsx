"use client";
// Thin client-boundary wrapper for react-icons (which relies on React.createContext
// and cannot run inside a server component). Importing icons from here lets server
// pages stay server-rendered while icons hydrate as client components.

export {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaExternalLinkAlt,
  FaArrowRight,
  FaHeart,
  FaComment,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";

export { FiSun, FiMoon, FiChevronDown } from "react-icons/fi";

export { SiDevdotto } from "react-icons/si";
