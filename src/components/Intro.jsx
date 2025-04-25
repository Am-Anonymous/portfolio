import { motion } from 'framer-motion';

export default function Intro() {
  return (
    <section className="px-4 py-10 md:px-6 md:py-12">
      <motion.h2
        className="text-3xl font-semibold mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.6,
          type: 'spring',
          stiffness: 100
        }}
        viewport={{ once: true }}
      >
        Cybersecurity Enthusiast | Python Developer | Cracker & Modder
      </motion.h2>
      <motion.p
        className="max-w-xl leading-7"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        I am a passionate cybersecurity learner and Python developer focused on ethical hacking,
        cracking/modding tools, and securing digital systems.
      </motion.p>
    </section>
  );
}