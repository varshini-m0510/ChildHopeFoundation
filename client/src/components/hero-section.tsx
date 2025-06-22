import { Button } from "@/components/ui/button";
import { Heart, HandHeart } from "lucide-react";
import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        }}
      />
      <div className="absolute inset-0 hero-gradient" />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Empowering Children,
          <br />
          <span className="text-hope-orange">Building Futures</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed">
          Together, we're creating opportunities for underprivileged children across India through education,
          healthcare, and community support programs.
        </p>

        {/* Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/donate">
            <Button className="bg-hope-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105">
              <Heart className="mr-2 h-5 w-5 fill-current" />
              Support a Child
            </Button>
          </Link>
          <Link href="/volunteer">
            <Button
              variant="outline"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-trust-blue text-white px-8 py-4 rounded-full font-semibold text-lg transition-all"
            >
              <HandHeart className="mr-2 h-5 w-5" />
              Join Us Today
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
