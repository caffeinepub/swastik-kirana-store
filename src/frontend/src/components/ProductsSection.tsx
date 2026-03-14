import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Product } from "../backend.d";
import { useGetProducts } from "../hooks/useQueries";

const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1n,
    name: "Basmati Rice",
    price: 120,
    category: "Grains",
    unit: "1 kg",
    inStock: true,
  },
  {
    id: 2n,
    name: "Turmeric Powder",
    price: 45,
    category: "Spices",
    unit: "200 g",
    inStock: true,
  },
  {
    id: 3n,
    name: "Toor Dal",
    price: 95,
    category: "Pulses",
    unit: "500 g",
    inStock: true,
  },
  {
    id: 4n,
    name: "Amul Butter",
    price: 58,
    category: "Dairy",
    unit: "100 g",
    inStock: true,
  },
  {
    id: 5n,
    name: "Sunflower Oil",
    price: 145,
    category: "Oils",
    unit: "1 L",
    inStock: false,
  },
  {
    id: 6n,
    name: "Red Chilli Powder",
    price: 55,
    category: "Spices",
    unit: "200 g",
    inStock: true,
  },
  {
    id: 7n,
    name: "Whole Wheat Atta",
    price: 85,
    category: "Flour",
    unit: "1 kg",
    inStock: true,
  },
  {
    id: 8n,
    name: "Masala Chai",
    price: 110,
    category: "Beverages",
    unit: "250 g",
    inStock: true,
  },
  {
    id: 9n,
    name: "Moong Dal",
    price: 80,
    category: "Pulses",
    unit: "500 g",
    inStock: true,
  },
  {
    id: 10n,
    name: "Desi Ghee",
    price: 320,
    category: "Dairy",
    unit: "500 ml",
    inStock: true,
  },
  {
    id: 11n,
    name: "Poha (Flattened Rice)",
    price: 35,
    category: "Grains",
    unit: "500 g",
    inStock: true,
  },
  {
    id: 12n,
    name: "Coriander Powder",
    price: 30,
    category: "Spices",
    unit: "100 g",
    inStock: false,
  },
];

const SKELETON_IDS = ["a", "b", "c", "d", "e", "f", "g", "h"];

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.04, duration: 0.3 }}
      data-ocid={`products.item.${index + 1}`}
      className="bg-card border border-border rounded-xl p-4 shadow-xs hover:shadow-warm transition-all group"
    >
      <div className="flex items-start justify-between mb-3">
        <Badge
          variant="secondary"
          className="text-xs bg-secondary/10 text-secondary border-secondary/20"
        >
          {product.category}
        </Badge>
        <Badge
          variant={product.inStock ? "default" : "destructive"}
          className={`text-xs ${
            product.inStock
              ? "bg-green-100 text-green-700 border-green-200"
              : "bg-red-100 text-red-600 border-red-200"
          }`}
        >
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>

      <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      <p className="text-xs text-muted-foreground mb-3">{product.unit}</p>

      <div className="flex items-center justify-between">
        <span className="font-display text-xl font-bold text-primary">
          ₹{product.price}
        </span>
        <span className="text-xs text-muted-foreground">
          per {product.unit}
        </span>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const { data: products, isLoading: productsLoading } = useGetProducts();

  const displayProducts =
    !productsLoading && products && products.length > 0
      ? products
      : FALLBACK_PRODUCTS;

  const allCategories = [
    "All",
    ...Array.from(new Set(displayProducts.map((p) => p.category))),
  ];
  const [activeTab, setActiveTab] = useState("All");

  const filtered =
    activeTab === "All"
      ? displayProducts
      : displayProducts.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-20" data-ocid="products.section">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-2">
            Our Selection
          </p>
          <h2 className="font-display text-4xl font-bold text-foreground mb-3">
            Our Products
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Fresh, quality products at the best prices — straight to your
            kitchen.
          </p>
        </motion.div>

        {productsLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            data-ocid="products.loading_state"
          >
            {SKELETON_IDS.map((id) => (
              <Skeleton key={id} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList
              className="flex flex-wrap h-auto gap-1 bg-muted/60 p-1 rounded-xl"
              data-ocid="products.tab"
            >
              {allCategories.map((cat) => (
                <TabsTrigger
                  key={cat}
                  value={cat}
                  data-ocid="products.tab"
                  className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 text-muted-foreground"
                    data-ocid="products.empty_state"
                  >
                    <span className="text-5xl block mb-4">🛒</span>
                    <p>No products in this category yet.</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key={activeTab}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  >
                    {filtered.map((product, i) => (
                      <ProductCard
                        key={String(product.id)}
                        product={product}
                        index={i}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </section>
  );
}
