import { motion } from 'framer-motion';

export default function TestComponent() {
  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <motion.h1 
        className="text-3xl font-bold text-orange-500 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Slush
      </motion.h1>
      <p className="text-gray-700 mb-4">
        Split bills effortlessly with friends and family.
      </p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  );
}