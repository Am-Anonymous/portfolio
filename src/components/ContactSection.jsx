import { FaInstagram, FaTelegram, FaRegCopy } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const matrixChars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    
    const initMatrix = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * pixelRatio;
      canvas.height = canvas.offsetHeight * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);

      const fontSize = 12; // Slightly smaller for contact section
      const cols = Math.floor(canvas.width / fontSize);
      const drops = Array(cols).fill(0);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
          const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
          
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      return draw;
    };

    const draw = initMatrix();
    const interval = setInterval(draw, 80); // Slightly slower than header

    const handleResize = () => {
      clearInterval(interval);
      initMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('balsania663@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-[400px]"> {/* Ensure enough height for effect */}
      {/* Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none -z-10"
      />

      {/* Contact Content */}
      <motion.section
        className="px-4 py-10 md:px-6 md:py-12 border-t border-green-500/30 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.h3 
          className="text-2xl font-bold mb-6 hacker-glow"
          initial={{ x: -20 }}
          whileInView={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          [root@portfolio]~# Contact
        </motion.h3>

        <div className="space-y-4">
          {/* Email */}
          <motion.div 
            className="flex items-center space-x-3 bg-black/50 p-3 rounded border border-green-500/30 hover:bg-green-900/10 transition-colors"
            whileHover={{ x: 5 }}
          >
            <MdEmail className="text-green-400 text-lg" /> 
            <span className="font-mono">balsania663@gmail.com</span>
            <button
              onClick={handleCopy}
              className="ml-auto text-green-400 hover:text-green-300 transition-colors"
              title="Copy Email"
            >
              <FaRegCopy />
            </button>
            {copied && (
              <span className="ml-2 text-green-500 font-mono text-xs animate-pulse">
                [copied to clipboard]
              </span>
            )}
          </motion.div>

          {/* Instagram */}
          <motion.a
            href="https://www.instagram.com/am._.anonymous__"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-black/50 p-3 rounded border border-green-500/30 hover:bg-green-900/10 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <FaInstagram className="text-pink-500 group-hover:text-pink-400 transition-colors" />
            <span className="font-mono text-green-400 group-hover:text-green-300 transition-colors">
              instagram.com/am._.anonymous__
            </span>
          </motion.a>

          {/* Telegram Personal */}
          <motion.a
            href="https://t.me/NOOBDAHacKeRS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-black/50 p-3 rounded border border-green-500/30 hover:bg-green-900/10 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <FaTelegram className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="font-mono text-green-400 group-hover:text-green-300 transition-colors">
              t.me/NOOBDAHacKeRS
            </span>
          </motion.a>

          {/* Telegram Channel */}
          <motion.a
            href="https://t.me/DgCracks"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 bg-black/50 p-3 rounded border border-green-500/30 hover:bg-green-900/10 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <FaTelegram className="text-blue-400 group-hover:text-blue-300 transition-colors" />
            <span className="font-mono text-green-400 group-hover:text-green-300 transition-colors">
              t.me/DgCracks [Channel]
            </span>
          </motion.a>
        </div>
      </motion.section>
    </div>
  );
}