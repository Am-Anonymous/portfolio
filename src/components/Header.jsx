import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isGlitching, setIsGlitching] = useState(false);
  const canvasRef = useRef(null);

  // Clock update effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      if (Math.random() > 0.95) {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

      const fontSize = 14; // Slightly larger for header
      const cols = Math.floor(canvas.width / fontSize);
      const drops = Array(cols).fill(0);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
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
    const interval = setInterval(draw, 70);

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

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <header className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-green-500/30 relative overflow-hidden">
      {/* Matrix Rain Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none -z-10"
      />

      {/* Header Content */}
      <div className="relative z-10">
        <h1 className={`text-3xl font-bold hacker-glow ${isGlitching ? 'glitch-effect' : ''}`}>
          <Typewriter
            options={{
              strings: ['Mohsin Ali Balsania', 'Full-Stack Developer', 'Cyber Security Enthusiast', 'Creative Coder'],
              autoStart: true,
              loop: true,
              cursor: '_',
              delay: 50,
              deleteSpeed: 30,
            }}
          />
        </h1>
        <p className="text-green-500/80 text-sm mt-1 font-mono">
          root@portfolio:~$ <span className="animate-pulse">▋</span>
        </p>
      </div>

      {/* Digital Clock */}
      <div className="flex items-center gap-4 z-10">
        <motion.div 
          className="relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className={`
            bg-black 
            border-2 border-green-600 
            px-3 py-2 
            rounded-md
            shadow-lg
            text-green-400 
            font-mono 
            text-xl
            hacker-glow
            relative
            z-10
            ${isGlitching ? 'glitch-border' : ''}
          `}>
            {formatTime(currentTime)}
            {/* Glowing corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-green-500 rounded-tl"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-green-500 rounded-tr"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-green-500 rounded-bl"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500 rounded-br"></div>
          </div>
          {/* Glow effect background */}
          <div className="
            absolute 
            inset-0 
            bg-green-600 
            blur-md 
            opacity-20 
            rounded-md
            -z-10
          "></div>
        </motion.div>
      </div>
    </header>
  );
}