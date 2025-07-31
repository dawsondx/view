import React from 'react';
import { motion } from 'framer-motion';

interface ContactLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  type: 'email' | 'phone';
}

export const ContactLink: React.FC<ContactLinkProps> = ({ href, icon, label, type }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (type === 'email') {
      window.location.href = `mailto:${href}`;
    } else if (type === 'phone') {
      window.location.href = `tel:${href}`;
    }
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-primary-600 group-hover:text-primary-700 transition-colors">
        {icon}
      </span>
      <span className="text-gray-700 font-medium">{label}</span>
    </motion.a>
  );
};