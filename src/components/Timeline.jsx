import { motion } from 'framer-motion';
import { FaGraduationCap, FaShieldAlt, FaLaptopCode, FaRocket, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

const timelineData = [
  {
    year: '2022',
    title: 'Started Learning Python',
    icon: <FaGraduationCap className="text-green-400" />,
    details: 'In 2022, I started learning Python, mastering both basic and advanced programming concepts, including working with data structures, algorithms, and adding elements to enhance functionality. This knowledge has been instrumental in advancing my career goals, as Python\'s versatility allows me to develop efficient solutions, automate tasks, and build innovative projects. My passion for coding drives me to continuously explore new ideas and create impactful applications, strengthening my problem-solving skills and keeping me engaged in the ever-evolving tech world. I love experimenting with new projects, which not only sharpens my expertise but also fuels my creativity and enthusiasm for programming.'
  },
  {
    year: '2023',
    title: 'Explored Cybersecurity',
    icon: <FaShieldAlt className="text-green-400" />,
    details: '**2023 – The Year of Cybersecurity Foundations**\n\nIn 2023, I immersed myself in **cybersecurity**, earning my **CCNA and Network Security Expert certifications** to build a rock-solid understanding of network defense and vulnerability management. While I didn\'t participate in platforms like TryHackMe or Hack The Box, I actively **studied real-world attack techniques** by analyzing CTF competitions, ethical hacking tournaments, and breach simulations—sharpening my ability to think like both an attacker and a defender. I also attended **hackathons**, collaborating with security enthusiasts and gaining exposure to live problem-solving under pressure. This year wasn\'t just about theory; it was about **training my mind for cybersecurity\'s challenges**. Now, armed with certifications and insights, I\'m transitioning from observation to **hands-on execution**, preparing to outsmart threats and innovate defenses. *Because in cybersecurity, knowledge is power—but action is everything.*'
  },
  {
    year: '2024',
    title: 'Built My Portfolio Website',
    icon: <FaLaptopCode className="text-green-400" />,
    details: '**2024 – Developing My Portfolio Website with Core Web Technologies**\n\nThis year, I built my professional portfolio website from scratch using **HTML, CSS, and JavaScript (without frameworks like React)** to strengthen my fundamental web development skills. The clean, responsive design effectively showcases my Python programming projects and cybersecurity achievements, including my CCNA and Network Security Expert certifications. Through this hands-on project, I deepened my understanding of **semantic HTML structure, CSS Flexbox/Grid layouts, and vanilla JavaScript DOM manipulation**, while implementing best practices in **cross-browser compatibility and mobile-first design**. The website serves as both a demonstration of my technical abilities and a growing archive of my professional journey in tech.'
  },
  {
    year: '2025',
    title: 'Working on Tools & Automation',
    icon: <FaRocket className="text-green-400" />,
    details: '**2025 – Building Security Tools & Automation**\n\nThis year, I\'m focused on developing **custom security tools and automation scripts** to streamline cybersecurity workflows. Leveraging my Python expertise, I\'m building practical utilities for **vulnerability scanning, log analysis, and defensive monitoring** – all designed to help security teams work more efficiently. These projects combine my networking knowledge from CCNA with hands-on coding skills to create solutions that bridge the gap between theory and real-world application. Each tool is being documented in my portfolio with **clear use cases and technical breakdowns**, demonstrating my growing ability to solve security challenges through code. This initiative represents my transition from learning fundamentals to creating **tangible security assets** – the next step in becoming the proactive white-hat hacker I aspire to be.'
  },
];

export default function Timeline() {
  const canvasRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const formatDetails = (text) => {
    return text.split('\n').map((paragraph, i) => (
      <p key={i} className="mb-3">
        {paragraph.split('**').map((segment, j) => 
          j % 2 === 1 ? (
            <strong key={j} className="text-green-400">{segment}</strong>
          ) : (
            segment.split('*').map((subSegment, k) =>
              k % 2 === 1 ? (
                <em key={k} className="italic">{subSegment}</em>
              ) : (
                subSegment
              )
            )
          )
        )}
      </p>
    ));
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * pixelRatio;
    canvas.height = canvas.offsetHeight * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);

    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = windowSize.width < 768 ? 10 : 14;
    const columns = Math.floor(canvas.width / (fontSize * pixelRatio));
    const drops = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix.charAt(Math.floor(Math.random() * matrix.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, windowSize.width < 768 ? 70 : 50);
    return () => clearInterval(interval);
  }, [windowSize]);

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-black relative overflow-hidden px-4">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
      />
      
      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Centered Heading with Border */}
        <motion.div
          className="flex justify-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 hacker-glow border-2 border-green-400 px-6 py-3 rounded-lg inline-block">
            Learning & Growth Journey
          </h2>
        </motion.div>

        {/* Left-Aligned Timeline Items */}
        <div className="space-y-8">
          {timelineData.map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.1,
                type: 'spring',
                stiffness: windowSize.width < 768 ? 150 : 100
              }}
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-400">
                    {item.title}
                  </h3>
                  {item.details && (
                    <button 
                      onClick={() => toggleExpand(i)}
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      {expandedIndex === i ? (
                        <FaChevronUp className="w-4 h-4" />
                      ) : (
                        <FaChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                <p className="text-sm text-green-300 mt-1">
                  {item.year}
                </p>
                
                {item.details && expandedIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-3 text-sm text-green-300 overflow-hidden"
                  >
                    {formatDetails(item.details)}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}