import React from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, socialLinks } from "../config/portfolio";
import { Mail, Calendar, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const Contact: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 bg-[#1A1A2E] text-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.div
            className="h-1 w-20 bg-yellow-400 mx-auto mb-6"
            variants={itemVariants}
          />
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Let's work together to bring your ideas to life
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left Column - Contact Form */}
            <motion.div
              className="flex-1 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white placeholder-gray-400 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    Send Message
                  </button>
                </motion.div>
              </form>
            </motion.div>

            {/* Right Column - Contact Info */}
            <motion.div
              className="flex-1 space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">
                  Let's Connect
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Mail className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-gray-300">{personalInfo.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <MapPin className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Location</p>
                    <p className="text-gray-300">{personalInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Calendar className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-white">Availability</p>
                    <p className="text-gray-300">Open to new opportunities</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h4 className="text-lg font-semibold mb-4 text-white">Follow Me</h4>
                <div className="flex gap-4">
                  {socialLinks.map((social) => {
                    let IconComponent;
                    switch (social.icon) {
                      case "Github":
                        IconComponent = Github;
                        break;
                      case "Linkedin":
                        IconComponent = Linkedin;
                        break;
                      case "Twitter":
                        IconComponent = Twitter;
                        break;
                      default:
                        IconComponent = null;
                    }

                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white/10 hover:bg-yellow-400/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/20 hover:border-yellow-400/30"
                      >
                        {IconComponent && <IconComponent className="text-white hover:text-yellow-400" size={20} />}
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
