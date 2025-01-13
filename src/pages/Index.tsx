import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Index = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <motion.main 
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-grow container mx-auto px-4 py-12"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to iGoda Incubator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Empowering the next generation of innovators
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/apply">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition-all duration-300">
                Apply Now
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Innovative Programs</h2>
            <p className="text-gray-600">Explore our range of programs designed to foster innovation and creativity.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Expert Mentorship</h2>
            <p className="text-gray-600">Get guidance from industry experts to help you navigate your journey.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Networking Opportunities</h2>
            <p className="text-gray-600">Connect with like-minded individuals and expand your professional network.</p>
          </div>
        </motion.div>
      </motion.main>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white shadow-lg mt-auto"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <a 
              href="https://mediaowl.co.za" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
              >
                <span>Powered by Media Owl Digital Innovations</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </a>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Index;
