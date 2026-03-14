import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "motion/react";
import { useGetCategories } from "../hooks/useQueries";

const CATEGORY_ICONS: Record<string, string> = {
  Grains: "🌾",
  Spices: "🌶️",
  Dairy: "🥛",
  Vegetables: "🥦",
  Fruits: "🍎",
  Pulses: "🫘",
  Beverages: "☕",
  Snacks: "🍿",
  Oils: "🫙",
  Cleaning: "🧹",
  Personal: "🧴",
  Sweets: "🍬",
  Flour: "🍞",
  Rice: "🍚",
  Default: "🛒",
};

const FALLBACK_CATEGORIES = [
  "Grains",
  "Spices",
  "Dairy",
  "Vegetables",
  "Pulses",
  "Beverages",
  "Snacks",
  "Oils",
];

const SKELETON_IDS = ["a", "b", "c", "d", "e", "f", "g", "h"];

function getCategoryIcon(name: string): string {
  return CATEGORY_ICONS[name] || CATEGORY_ICONS.Default;
}

export default function CategoriesSection() {
  const { data: categories, isLoading } = useGetCategories();

  const displayCategories =
    !isLoading && categories && categories.length > 0
      ? categories
      : isLoading
        ? null
        : FALLBACK_CATEGORIES;

  return (
    <section
      id="categories"
      className="py-20 bg-muted/40"
      data-ocid="categories.section"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
            What We Offer
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            From fresh spices to daily essentials — everything you need under
            one roof.
          </p>
        </motion.div>

        {isLoading ? (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            data-ocid="categories.loading_state"
          >
            {SKELETON_IDS.map((id) => (
              <Skeleton key={id} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {(displayCategories || []).map((cat, i) => (
              <motion.div
                key={cat}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                data-ocid={`categories.item.${i + 1}`}
              >
                <a
                  href="#products"
                  className="category-card flex flex-col items-center justify-center gap-3 bg-card border border-border rounded-xl p-6 shadow-xs hover:shadow-warm cursor-pointer group transition-all"
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-200">
                    {getCategoryIcon(cat)}
                  </span>
                  <span className="font-semibold text-sm text-foreground text-center">
                    {cat}
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
