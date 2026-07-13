import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApp } from "../context/AppContext";
import { Mail, Send, CheckCircle2, AlertCircle, Phone } from "lucide-react";
import { motion } from "motion/react";

// Create contact form schema with localized errors or fallback
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { t } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="px-6 sm:px-8 py-20 max-w-7xl mx-auto" id="contact-section">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
        <div>
          <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-2">[ {t("nav.contact")} ]</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight font-sans text-text-light dark:text-text-dark">
            {t("contact.heading")}
          </h2>
        </div>
        <p className="text-text-light/70 dark:text-text-dark/70 max-w-md text-sm sm:text-base leading-relaxed">
          {t("contact.sub_heading")}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Side: Contact details / socials */}
        <div className="lg:col-span-5 space-y-8 font-sans">
          <div className="p-6 rounded-3xl border border-border-light dark:border-border-dark bg-black/5 dark:bg-white/5 space-y-6">
            <h3 className="text-xl font-bold font-serif mb-2">{t("hero.contact_cta")}</h3>
            
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-text-light/40 dark:text-text-dark/40 block">Email</span>
                <a href="mailto:muhammadmustafo0404@gmail.com" className="text-sm font-semibold hover:text-accent transition-colors">
                  muhammadmustafo0404@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-accent/10 text-accent">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-text-light/40 dark:text-text-dark/40 block">Social Telegram</span>
                <a href="https://t.me/mrtazo7" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold hover:text-accent transition-colors">
                  @mrtazo7
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form panel */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" id="portfolio-contact-form">
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name-input" className="font-mono text-xs text-text-light/70 dark:text-text-dark/70">
                {t("contact.name")} <span className="text-accent">*</span>
              </label>
              <input
                id="name-input"
                type="text"
                placeholder={t("contact.placeholder_name")}
                {...register("name")}
                className={`px-4 py-3 rounded-xl border bg-black/5 dark:bg-white/5 text-sm outline-none transition-all duration-300 ${
                  errors.name
                    ? "border-rose-500 focus:border-rose-500 ring-rose-500"
                    : "border-border-light dark:border-border-dark focus:border-accent focus:ring-1 focus:ring-accent"
                }`}
              />
              {errors.name && (
                <span className="text-rose-500 text-xs font-mono flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email-input" className="font-mono text-xs text-text-light/70 dark:text-text-dark/70">
                {t("contact.email")} <span className="text-accent">*</span>
              </label>
              <input
                id="email-input"
                type="email"
                placeholder={t("contact.placeholder_email")}
                {...register("email")}
                className={`px-4 py-3 rounded-xl border bg-black/5 dark:bg-white/5 text-sm outline-none transition-all duration-300 ${
                  errors.email
                    ? "border-rose-500 focus:border-rose-500 ring-rose-500"
                    : "border-border-light dark:border-border-dark focus:border-accent focus:ring-1 focus:ring-accent"
                }`}
              />
              {errors.email && (
                <span className="text-rose-500 text-xs font-mono flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message-input" className="font-mono text-xs text-text-light/70 dark:text-text-dark/70">
                {t("contact.message")} <span className="text-accent">*</span>
              </label>
              <textarea
                id="message-input"
                rows={5}
                placeholder={t("contact.placeholder_message")}
                {...register("message")}
                className={`px-4 py-3 rounded-xl border bg-black/5 dark:bg-white/5 text-sm outline-none transition-all duration-300 resize-none ${
                  errors.message
                    ? "border-rose-500 focus:border-rose-500 ring-rose-500"
                    : "border-border-light dark:border-border-dark focus:border-accent focus:ring-1 focus:ring-accent"
                }`}
              />
              {errors.message && (
                <span className="text-rose-500 text-xs font-mono flex items-center gap-1.5 mt-1">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.message.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-accent hover:opacity-90 disabled:opacity-50 text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-accent/20"
              id="submit-contact-button"
            >
              <span>{isSubmitting ? t("contact.sending") : t("contact.submit")}</span>
              <Send className="h-4 w-4" />
            </button>

            {/* Feedback Banners */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-sm flex items-center gap-3"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>{t("contact.success")}</span>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 text-sm flex items-center gap-3"
              >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{t("contact.error")}</span>
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
