import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AboutSection from "./components/AboutSection";
import CategoriesSection from "./components/CategoriesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProductsSection from "./components/ProductsSection";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <CategoriesSection />
          <ProductsSection />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
