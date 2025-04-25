import { useEffect, useRef } from 'react';

export default function MatrixRain({ opacity = 0.2, speed = 50, className = "" }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

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

      const fontSize = window.innerWidth < 768 ? 10 : 14;
      const cols = Math.floor(canvas.width / fontSize);
      const drops = Array(cols).fill(0);

      const draw = () => {
        ctx.fillStyle = `rgba(0, 0, 0, ${opacity / 3})`;
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

      return { draw, fontSize };
    };

    const { draw } = initMatrix();
    animationRef.current = setInterval(draw, speed);

    const handleResize = () => {
      clearInterval(animationRef.current);
      const { draw } = initMatrix();
      animationRef.current = setInterval(draw, speed);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [opacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity }}
    />
  );
}