import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Heart, Menu } from "lucide-react";

const Navigation = () => {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/programs", label: "Programs" },
    { href: "/volunteer", label: "Get Involved" },
    { href: "/media-events", label: "Media & Events" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const NavLink = ({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) => (
    <Link href={href}>
      <a
        className={`transition-colors hover:text-trust-blue ${
          isActive(href) ? "text-trust-blue font-medium" : "text-charcoal"
        }`}
        onClick={onClick}
      >
        {label}
      </a>
    </Link>
  );

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="flex items-center space-x-3">
                <Heart className="h-8 w-8 text-hope-orange fill-current" />
                <span className="text-xl font-bold text-charcoal">Parikrama Foundation</span>
              </a>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
            <Link href="/donate">
              <Button className="bg-trust-blue hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
                Donate Now
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-charcoal hover:text-trust-blue">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      onClick={() => setIsOpen(false)}
                    />
                  ))}
                  <Link href="/donate">
                    <Button
                      className="w-full bg-trust-blue hover:bg-blue-700 text-white mt-4"
                      onClick={() => setIsOpen(false)}
                    >
                      Donate Now
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
