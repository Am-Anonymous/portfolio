import { FaInstagram, FaTelegram, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
      <motion.a
        href="mailto:balsania663@gmail.com"
        className="bg-white text-black rounded-full p-3 shadow-md hover:scale-110 transform transition"
        title="Email"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaEnvelope size={20} />
      </motion.a>
      <motion.a
        href="https://www.instagram.com/am._.anonymous__?igsh=MXBzcHAzMzhhcDM2aQ=="
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-500 text-white rounded-full p-3 shadow-md hover:scale-110 transform transition"
        title="Instagram"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaInstagram size={20} />
      </motion.a>
      <motion.a
        href="https://t.me/NOOBDAHacKeRS"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-500 text-white rounded-full p-3 shadow-md hover:scale-110 transform transition"
        title="Telegram"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaTelegram size={20} />
      </motion.a>
    </div>
  );
}