import { Skeleton } from "@/components/ui/skeleton";
import { Clock, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useGetStoreInfo } from "../hooks/useQueries";

const FALLBACK_STORE_INFO = {
  name: "Swastik Kirana Store",
  address: "12, Laxmi Nagar Market, New Delhi - 110092",
  phone: "+91 98765 43210",
  hours: "Mon–Sat: 7:00 AM – 9:00 PM | Sun: 8:00 AM – 2:00 PM",
};

export default function AboutSection() {
  const { data: storeInfo, isLoading } = useGetStoreInfo();
  const info = storeInfo?.name ? storeInfo : FALLBACK_STORE_INFO;

  return (
    <section id="about" className="py-20 bg-muted/40" data-ocid="about.section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
            Our Story
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-3">
            About Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-transparent rounded-full" />
              <div className="pl-6">
                <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                  {isLoading ? <Skeleton className="h-8 w-48" /> : info.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Welcome to {info.name} — your trusted neighborhood grocery
                  store serving the community with love and dedication. We
                  believe that quality groceries should be accessible to
                  everyone, which is why we source the freshest produce and the
                  finest spices at prices that won't break the bank.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  From fragrant basmati rice to freshly ground spices, from
                  farm-fresh vegetables to everyday household essentials — we
                  have it all. Come in, feel at home, and let us take care of
                  your grocery needs the way your family has trusted us for
                  generations.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {isLoading ? (
              <>
                <Skeleton
                  className="h-20 rounded-xl"
                  data-ocid="about.loading_state"
                />
                <Skeleton className="h-20 rounded-xl" />
                <Skeleton className="h-20 rounded-xl" />
              </>
            ) : (
              [
                {
                  icon: MapPin,
                  label: "Address",
                  value: info.address,
                  color: "text-primary",
                  bg: "bg-primary/10",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: info.phone,
                  color: "text-secondary",
                  bg: "bg-secondary/10",
                },
                {
                  icon: Clock,
                  label: "Store Hours",
                  value: info.hours,
                  color: "text-accent-foreground",
                  bg: "bg-accent/20",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 bg-card border border-border rounded-xl p-4 shadow-xs"
                >
                  <div className={`p-2 rounded-lg ${item.bg} shrink-0`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
