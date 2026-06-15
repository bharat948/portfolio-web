import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { personalInfo, socialLinks } from "../config/portfolio";
import SectionHeading from "../components/SectionHeading";

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Github,
  Linkedin,
  Twitter,
  Mail,
};

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // No backend required — compose a pre-filled email the visitor can send.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || "someone"}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name}${form.email ? ` (${form.email})` : ""}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
  };

  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-white/60 px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-brand-400 focus:ring-2 focus:ring-brand-400/30 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder-slate-500";

  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading eyebrow="Contact" title="Let's work together" align="center" />
        <motion.p
          className="mx-auto mt-3 max-w-xl text-center text-slate-600 dark:text-slate-400"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          Have a project in mind or just want to say hi? My inbox is always open.
        </motion.p>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Contact info */}
          <motion.div
            className="space-y-4 lg:col-span-2"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={`mailto:${personalInfo.email}`}
              className="card-surface flex items-center gap-4 p-5 transition-colors hover:border-brand-300 dark:hover:border-brand-400/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <Mail size={20} />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email
                </span>
                <span className="block truncate font-medium">{personalInfo.email}</span>
              </span>
            </a>

            <div className="card-surface flex items-center gap-4 p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <MapPin size={20} />
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Location
                </span>
                <span className="block font-medium">{personalInfo.location}</span>
              </span>
            </div>

            <div className="flex gap-3 pt-1">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="card-surface p-3 text-slate-500 transition-colors hover:text-brand-500"
                  >
                    {Icon && <Icon size={20} />}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="card-surface space-y-4 p-6 lg:col-span-3"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={inputClasses}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className={inputClasses}
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project..."
                className={`${inputClasses} resize-none`}
              />
            </div>
            <button
              type="submit"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-white dark:text-slate-900"
            >
              Send message
              <Send size={18} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
