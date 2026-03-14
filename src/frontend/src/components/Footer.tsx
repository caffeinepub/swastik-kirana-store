import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`;

  return (
    <footer className="bg-foreground text-background py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/assets/generated/swastik-logo-transparent.dim_200x200.png"
              alt="Swastik Kirana Store"
              className="h-10 w-10 object-contain opacity-90"
            />
            <div>
              <div className="font-display text-lg font-bold text-primary leading-tight">
                Swastik Kirana Store
              </div>
              <div className="text-xs text-background/60 leading-tight">
                Fresh • Affordable • Trusted
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex gap-6 text-sm text-background/70">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                data-ocid="footer.link"
                className="hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="pattern-divider my-6 opacity-30" />

        <div className="text-center text-sm text-background/50">
          © {year} Swastik Kirana Store. Built with{" "}
          <Heart className="inline h-3.5 w-3.5 text-primary" /> using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
