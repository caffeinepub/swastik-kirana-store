import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useGetStoreInfo } from "../hooks/useQueries";

const FALLBACK = {
  name: "Swastik Kirana Store",
  address: "12, Laxmi Nagar Market, New Delhi - 110092",
  phone: "+91 98765 43210",
  hours: "Mon–Sat: 7:00 AM – 9:00 PM | Sun: 8:00 AM – 2:00 PM",
};

export default function ContactSection() {
  const { data: storeInfo } = useGetStoreInfo();
  const info = storeInfo?.name ? storeInfo : FALLBACK;

  const contactItems = [
    {
      icon: MapPin,
      label: "Find Us",
      value: info.address,
      action: null as string | null,
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
    },
    {
      icon: Phone,
      label: "Call Us",
      value: info.phone,
      action: `tel:${info.phone}` as string | null,
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
    },
    {
      icon: Clock,
      label: "Open Hours",
      value: info.hours,
      action: null as string | null,
      color: "from-accent/30 to-accent/10",
      iconColor: "text-foreground",
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Chat with us on WhatsApp for quick orders",
      action: `https://wa.me/${info.phone.replace(/\D/g, "")}` as string | null,
      color: "from-green-100 to-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section id="contact" className="py-20" data-ocid="contact.section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
            Get In Touch
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-3">
            Contact Us
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            We'd love to hear from you. Visit us, call us, or drop a message
            anytime!
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {contactItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              {item.action ? (
                <a
                  href={item.action}
                  target={item.action.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-ocid={`contact.item.${i + 1}`}
                  className={`block h-full bg-gradient-to-br ${item.color} border border-border rounded-xl p-6 hover:shadow-warm transition-all group`}
                >
                  <item.icon
                    className={`h-8 w-8 ${item.iconColor} mb-4 group-hover:scale-110 transition-transform`}
                  />
                  <div className="font-semibold text-foreground mb-2">
                    {item.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.value}
                  </p>
                </a>
              ) : (
                <div
                  data-ocid={`contact.item.${i + 1}`}
                  className={`h-full bg-gradient-to-br ${item.color} border border-border rounded-xl p-6`}
                >
                  <item.icon className={`h-8 w-8 ${item.iconColor} mb-4`} />
                  <div className="font-semibold text-foreground mb-2">
                    {item.label}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.value}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 max-w-5xl mx-auto bg-muted/60 border border-border rounded-2xl overflow-hidden h-48 flex items-center justify-center"
        >
          <div className="text-center text-muted-foreground">
            <MapPin className="h-10 w-10 mx-auto mb-2 text-primary" />
            <p className="font-semibold">{info.address}</p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(info.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.link"
              className="text-sm text-primary hover:underline mt-1 inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
