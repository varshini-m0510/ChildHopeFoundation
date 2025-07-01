import { Card, CardContent } from "@/components/ui/card";
import { TEAM_MEMBERS } from "@/lib/constants";

const About = () => {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 text-pink-500">About Parikrama Foundation</h1>
          <p className="text-xl opacity-90 text-pink-400">
            Empowering underprivileged children through education, healthcare, and community support since 2016.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Our Programs</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
              Comprehensive initiatives designed to address the multifaceted needs of children and their communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Our Mission</h3>
              <p className="text-gray-800 leading-relaxed">
                To provide quality education, healthcare, and life skills to underprivileged children, 
                empowering them to become self-reliant and contributing members of society. We believe 
                that every child deserves access to opportunities that can transform their lives and 
                the lives of their families.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-2xl">👁️</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-4">Our Vision</h3>
              <p className="text-gray-800 leading-relaxed">
                A world where every child, regardless of their background, has access to quality education 
                and the opportunity to reach their full potential. We envision communities where children 
                are healthy, educated, and empowered to break the cycle of poverty.
              </p>
            </div>
          </div>

          {/* Our Story */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-black text-center mb-12">Our Story</h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                Parikrama Foundation was born from a simple yet powerful belief: every child deserves a chance to dream 
                and achieve. Founded in 2016 by Dr. Priya Sharma, our organization began as a small initiative to 
                provide educational support to children in Mumbai's underserved communities.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed mb-6">
                What started as weekend tutoring sessions for 20 children has grown into a comprehensive program 
                serving over 5,200 children across 12 cities in India. Our holistic approach addresses not just 
                education, but also healthcare, nutrition, and life skills development.
              </p>
              <p className="text-lg text-gray-800 leading-relaxed">
                Today, we continue to expand our reach while maintaining our core commitment to quality, sustainability, 
                and community empowerment. Every program we implement is designed with the active participation of 
                the communities we serve, ensuring lasting impact and local ownership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-trust-blue to-blue-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
                alt="Dr. Priya Sharma"
                className="w-32 h-32 rounded-full object-cover border-4 border-white flex-shrink-0"
              />
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2 text-pink-400">Dr. Priya Sharma</h3>
                <p className="text-lg font-semibold text-pink-400 mb-2">Founder & Director</p>
                <blockquote className="text-lg leading-relaxed italic text-pink-300">
                  "Every child deserves a chance to dream and achieve. Through Parikrama Foundation, we're not just providing education – we're nurturing hope, building confidence, and creating pathways to brighter futures. When I see the spark in a child's eyes as they learn to read or the pride in a parent's voice when their child graduates, I'm reminded why this work is so important. Together, we can break the cycle of poverty, one child at a time."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-black mb-6">Our Team</h3>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Dedicated professionals working together to make a lasting impact in children's lives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {TEAM_MEMBERS.map((member, index) => (
              <div key={index} className="text-center group">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover group-hover:scale-105 transition-transform"
                />
                <h4 className="text-xl font-semibold text-black">{member.name}</h4>
                <p className="text-gray-800 text-sm mt-2">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-black mb-6">Our Values</h3>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              The principles that guide our work and define our approach to creating lasting change.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🤝</span>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">Integrity</h4>
                <p className="text-gray-800">
                  We operate with transparency, honesty, and accountability in all our interactions with 
                  children, families, and stakeholders.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-success-green rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🌱</span>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">Empowerment</h4>
                <p className="text-gray-800">
                  We believe in building the capacity of individuals and communities to create sustainable 
                  change from within.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-hope-orange rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">❤️</span>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">Compassion</h4>
                <p className="text-gray-800">
                  We approach our work with empathy, understanding, and genuine care for the well-being 
                  of every child we serve.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🎯</span>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">Excellence</h4>
                <p className="text-gray-800">
                  We strive for the highest quality in our programs and continuously improve our 
                  methods and outcomes.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-success-green rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🤗</span>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">Inclusion</h4>
                <p className="text-gray-800">
                  We ensure that all children, regardless of their background, have equal access to 
                  our programs and opportunities.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="w-12 h-12 bg-hope-orange rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-xl">🔗</span>
                </div>
                <h4 className="text-xl font-bold text-black mb-4">Collaboration</h4>
                <p className="text-gray-800">
                  We work in partnership with communities, organizations, and individuals to maximize 
                  our collective impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partner Organizations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-black text-center mb-8">Our Partners</h3>
            <p className="text-center text-gray-800 mb-8">
              We work with leading organizations to amplify our impact and reach more children in need.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
              {["UNICEF India", "Save The Children", "Teach For India", "Akshaya Patra"].map((partner) => (
                <div key={partner} className="text-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm h-20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-gray-900">{partner}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
