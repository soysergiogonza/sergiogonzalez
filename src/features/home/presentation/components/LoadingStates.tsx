import { motion, AnimatePresence } from 'framer-motion';

const loadingVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  }
};

export const SkillsLoading = () => (
  <motion.div
    className="space-y-4"
    initial="hidden"
    animate="visible"
    variants={loadingVariants}
  >
    <motion.div 
      className="h-8 w-32 bg-background-elevated/50 rounded-lg"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    <div className="flex flex-wrap gap-4">
      {[1,2,3,4,5].map((i) => (
        <motion.div
          key={i}
          className="h-12 w-32 bg-background-elevated/50 rounded-full"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            delay: i * 0.2 
          }}
        />
      ))}
    </div>
  </motion.div>
);

export const ExperienceLoading = () => (
  <div className="space-y-6">
    <motion.div 
      className="h-8 w-48 bg-background-elevated/50 rounded-lg"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
    {[1,2,3].map((i) => (
      <motion.div
        key={i}
        className="space-y-4"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          delay: i * 0.2 
        }}
      >
        <div className="h-24 bg-background-elevated/50 rounded-xl" />
      </motion.div>
    ))}
  </div>
); 