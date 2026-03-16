import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const isAdmin = window.location.pathname === "/admin";

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-xs">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center gap-3"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/swastik-logo-transparent.dim_200x200.png"
            alt="Swastik Kirana Store"
            className="h-10 w-10 object-contain"
          />
          <div>
            <div className="font-display text-lg font-bold text-primary leading-tight">
              Swastik
            </div>
            <div className="text-xs text-muted-foreground leading-tight tracking-wide">
              Kirana Store
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {!isAdmin &&
            navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="px-4 py-2 rounded-md text-sm font-medium text-foreground hover:text-primary hover:bg-accent/20 transition-colors"
              >
                {link.label}
              </a>
            ))}

          {isAdmin ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateTo("/")}
              data-ocid="navbar.admin_link"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to Store
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateTo("/admin")}
              data-ocid="navbar.admin_link"
              className="ml-2 gap-2"
            >
              <ShieldCheck className="h-4 w-4" /> Admin
            </Button>
          )}
        </nav>

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          data-ocid="nav.toggle"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden bg-card border-t border-border px-4 pb-4">
          {!isAdmin &&
            navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="block py-3 text-sm font-medium text-foreground hover:text-primary transition-colors border-b border-border last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          {isAdmin ? (
            <button
              type="button"
              className="block py-3 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => {
                navigateTo("/");
                setMenuOpen(false);
              }}
              data-ocid="navbar.admin_link"
            >
              ← Back to Store
            </button>
          ) : (
            <button
              type="button"
              className="block py-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={() => {
                navigateTo("/admin");
                setMenuOpen(false);
              }}
              data-ocid="navbar.admin_link"
            >
              🔐 Admin Panel
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
