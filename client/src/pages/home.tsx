import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import StatsSection from "@/components/stats-section";
import ProgramCard from "@/components/program-card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TEAM_MEMBERS } from "@/lib/constants";

const Home = () => {
  const { data: programs, isLoading: programsLoading } = useQuery({
    queryKey: ["/api/programs"],
  });

  const { data: upcomingEvents, isLoading: eventsLoading } = useQuery({
    queryKey: ["/api/events", "upcoming"],
    queryFn: () => fetch("/api/events?type=upcoming").then(res => res.json()),
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Stats Section */}
      <section className="py-12 bg-trust-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StatsSection />
        </div>
      </section>

      {/* About Us Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">About Parikrama Foundation</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Founded with a vision to break the cycle of poverty through education and community empowerment, 
              Parikrama Foundation has been transforming lives across India since 2016.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide quality education, healthcare, and life skills to underprivileged children, 
                empowering them to become self-reliant and contributing members of society.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                A world where every child, regardless of their background, has access to quality education 
                and the opportunity to reach their full potential.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/about">
              <Button className="bg-trust-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive initiatives designed to address the multifaceted needs of children and their communities.
            </p>
          </div>

          {programsLoading ? (
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6" />
                  <div className="w-12 h-12 bg-gray-200 rounded-full mb-4" />
                  <div className="h-6 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded mb-6" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {programs?.slice(0, 3).map((program: any) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link href="/programs">
              <Button className="bg-charcoal hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold">
                View All Programs & Initiatives
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-charcoal mb-6">Meet Our Team</h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals working together to make a lasting impact in children's lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="text-center group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                />
                <h4 className="text-xl font-semibold text-charcoal">{member.name}</h4>
                <p className="text-trust-blue font-medium">{member.role}</p>
                <p className="text-gray-600 text-sm mt-2">{member.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/about">
              <Button variant="outline" className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white px-8 py-3 rounded-lg">
                Meet the Full Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of supporters who are helping us create brighter futures for underprivileged children.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/donate">
              <Button className="bg-hope-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
                Donate Now
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-trust-blue px-8 py-4 rounded-full font-semibold text-lg">
                Become a Volunteer
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
