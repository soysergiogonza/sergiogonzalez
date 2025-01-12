import { motion } from 'framer-motion';

export const ProjectsLoading = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <motion.div
        key={i}
        className="rounded-xl overflow-hidden bg-background-elevated/50 border border-gray-800"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
      >
        <div className="h-48 bg-background-elevated/50" />
        <div className="p-6 space-y-4">
          <div className="h-6 w-3/4 bg-background-elevated/50 rounded" />
          <div className="h-20 bg-background-elevated/50 rounded" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map((j) => (
              <div
                key={j}
                className="h-6 w-20 bg-background-elevated/50 rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
); 