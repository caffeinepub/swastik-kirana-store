import { motion } from "motion/react";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-start pt-16 overflow-hidden"
      data-ocid="hero.section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-kirana.dim_1200x600.jpg')",
        }}
      />
      {/* Overlay */}
      <div className="hero-overlay absolute inset-0" />

      {/* Decorative dots pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.97 0.01 85) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl"
        >
          {/* Decorative label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary bg-primary/10 border border-primary/30 px-3 py-1 rounded-full">
              ✦ Trusted Since Generations ✦
            </span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Swastik
            <br />
            <span className="text-primary">Kirana</span> Store
          </h1>

          <p className="text-lg text-white/85 mb-8 leading-relaxed">
            Your Neighborhood Grocery Store — Fresh, Affordable & Trusted.
            Serving the community with quality groceries and a warm smile.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              data-ocid="hero.primary_button"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="#about"
              data-ocid="hero.secondary_button"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/30 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
            >
              About Us
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { value: "500+", label: "Products" },
              { value: "20+", label: "Years of Trust" },
              { value: "1000+", label: "Happy Families" },
            ].map((stat) => (
              <div key={stat.label} className="text-white">
                <div className="font-display text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-xs text-white/70 tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom pattern divider */}
      <div className="absolute bottom-0 left-0 right-0 pattern-divider" />
    </section>
  );
}
