import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';

export default function Card({ title, children }) {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#ffffff"
      glarePosition="all"
      glareBorderRadius="1rem"
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      scale={1.03}
      transitionSpeed={1500}
      perspective={1000}
      className="w-full h-full"
    >
      <motion.div
        className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-md hover:shadow-xl hover:scale-[1.02] bg-white dark:bg-gray-800 transition-all"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {title && <h3 className="text-xl font-semibold mb-4">{title}</h3>}
        {children}
      </motion.div>
    </Tilt>
  );
}