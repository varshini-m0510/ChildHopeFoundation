import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const newsletterMutation = useMutation({
    mutationFn: (email: string) =>
      apiRequest("POST", "/api/newsletter", { email }),
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      queryClient.invalidateQueries({ queryKey: ["/api/newsletter"] });
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      newsletterMutation.mutate(email.trim());
    }
  };

  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Foundation Info */}
          <div>
            <div className="flex items-center mb-6">
              <Heart className="h-8 w-8 text-hope-orange fill-current mr-3" />
              <span className="text-xl font-bold">Parikrama Foundation</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Empowering underprivileged children through education, healthcare, and community support since 2016.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-trust-blue transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-trust-blue transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-trust-blue transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-trust-blue transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors">About Us</a>
                </Link>
              </li>
              <li>
                <Link href="/programs">
                  <a className="text-gray-300 hover:text-white transition-colors">Our Programs</a>
                </Link>
              </li>
              <li>
                <Link href="/volunteer">
                  <a className="text-gray-300 hover:text-white transition-colors">Get Involved</a>
                </Link>
              </li>
              <li>
                <Link href="/media-events">
                  <a className="text-gray-300 hover:text-white transition-colors">Media & Events</a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white transition-colors">Contact Us</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs">
                  <a className="text-gray-300 hover:text-white transition-colors">Quality Education</a>
                </Link>
              </li>
              <li>
                <Link href="/programs">
                  <a className="text-gray-300 hover:text-white transition-colors">Healthcare Access</a>
                </Link>
              </li>
              <li>
                <Link href="/programs">
                  <a className="text-gray-300 hover:text-white transition-colors">Nutrition Support</a>
                </Link>
              </li>
              <li>
                <Link href="/programs">
                  <a className="text-gray-300 hover:text-white transition-colors">Emergency Relief</a>
                </Link>
              </li>
              <li>
                <Link href="/programs">
                  <a className="text-gray-300 hover:text-white transition-colors">Skill Development</a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Stay Updated</h3>
            <p className="text-gray-300 mb-4">Subscribe to receive our latest news and impact stories.</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-trust-blue focus:border-trust-blue"
              />
              <Button
                type="submit"
                disabled={newsletterMutation.isPending}
                className="w-full bg-trust-blue hover:bg-blue-700 text-white"
              >
                {newsletterMutation.isPending ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
              © 2024 Parikrama Foundation. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Terms of Use
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                80G Certificate
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                Annual Reports
              </a>
            </div>
          </div>

          {/* Registration Info */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Registered under Section 8 of Companies Act 2013 | 80G Registration: AABCP1234F2024 | FCRA
            Registration: 083781234
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
