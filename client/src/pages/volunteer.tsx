import VolunteerForm from "@/components/volunteer-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Clock, Award, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const Volunteer = () => {
  const volunteerBenefits = [
    {
      icon: Heart,
      title: "Make a Real Impact",
      description: "Directly contribute to improving children's lives and see the difference you make."
    },
    {
      icon: Users,
      title: "Join a Community",
      description: "Connect with like-minded individuals who share your passion for social change."
    },
    {
      icon: Clock,
      title: "Flexible Commitment",
      description: "Choose volunteer opportunities that fit your schedule and availability."
    },
    {
      icon: Award,
      title: "Gain Experience",
      description: "Develop new skills and gain valuable experience in social work and community development."
    }
  ];

  const volunteerRoles = [
    {
      title: "Education Mentor",
      description: "Help children with homework, reading, and basic computer skills",
      timeCommitment: "4-6 hours/week",
      location: "Learning Centers",
      skills: ["Teaching", "Patience", "Communication"],
      impact: "Directly improve literacy rates"
    },
    {
      title: "Healthcare Assistant",
      description: "Support health camps and awareness programs in communities",
      timeCommitment: "1-2 days/month",
      location: "Community Centers",
      skills: ["Healthcare background", "Empathy", "Local language"],
      impact: "Improve health outcomes"
    },
    {
      title: "Event Coordinator",
      description: "Organize fundraising events and community outreach programs",
      timeCommitment: "5-8 hours/month",
      location: "Various venues",
      skills: ["Event management", "Networking", "Creativity"],
      impact: "Increase program visibility"
    },
    {
      title: "Digital Marketing",
      description: "Create content and manage social media to spread awareness",
      timeCommitment: "3-5 hours/week",
      location: "Remote/Office",
      skills: ["Social media", "Content creation", "Design"],
      impact: "Expand reach and donations"
    },
    {
      title: "Data & Research",
      description: "Help with program evaluation and impact measurement",
      timeCommitment: "2-4 hours/week",
      location: "Remote/Office",
      skills: ["Data analysis", "Research", "Excel/SPSS"],
      impact: "Improve program effectiveness"
    },
    {
      title: "Administrative Support",
      description: "Assist with office tasks, documentation, and coordination",
      timeCommitment: "4-6 hours/week",
      location: "Office",
      skills: ["Organization", "MS Office", "Communication"],
      impact: "Support all programs"
    }
  ];

  const testimonials = [
    {
      name: "Priya Mehta",
      role: "Education Volunteer",
      duration: "2 years",
      quote: "Volunteering with Parikrama has been the most rewarding experience of my life. Seeing children light up when they finally understand a concept is priceless.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Rahul Singh",
      role: "Healthcare Volunteer",
      duration: "1.5 years",
      quote: "Being part of the healthcare team has taught me so much about community health. Every vaccination drive feels like we're saving futures.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    },
    {
      name: "Anjali Sharma",
      role: "Event Coordinator",
      duration: "3 years",
      quote: "Organizing events for Parikrama combines my passion for planning with my desire to make a difference. It's incredibly fulfilling work.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Volunteer With Us</h1>
          <p className="text-xl opacity-90">
            Join our mission to transform lives. Share your skills, time, and passion to create lasting change in children's lives.
          </p>
        </div>
      </section>

      {/* Why Volunteer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Why Volunteer with Parikrama?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Volunteering is more than giving back—it's about growing, learning, and being part of something bigger than yourself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {volunteerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="border-none shadow-lg text-center card-hover">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-charcoal mb-4">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Volunteer Opportunities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the perfect way to contribute based on your skills, interests, and availability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerRoles.map((role, index) => (
              <Card key={index} className="border-none shadow-lg card-hover h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-charcoal mb-4">{role.title}</h3>
                    <p className="text-gray-600 mb-6">{role.description}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-trust-blue mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{role.timeCommitment}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Users className="h-4 w-4 text-trust-blue mr-2 flex-shrink-0" />
                        <span className="text-gray-600">{role.location}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-semibold text-charcoal mb-2">Skills Needed:</div>
                      <div className="flex flex-wrap gap-2">
                        {role.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-sm">
                      <div className="font-semibold text-charcoal mb-1">Impact:</div>
                      <div className="text-success-green">{role.impact}</div>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-6 bg-trust-blue hover:bg-blue-700 text-white">
                    Apply for This Role
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">How to Get Started</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 4-step process gets you from application to making an impact.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white text-2xl font-bold">1</span>
                <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Apply</h3>
              <p className="text-gray-600">
                Fill out our volunteer application form with your interests and availability.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white text-2xl font-bold">2</span>
                <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Interview</h3>
              <p className="text-gray-600">
                Have a conversation with our team to match you with the right opportunity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white text-2xl font-bold">3</span>
                <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Training</h3>
              <p className="text-gray-600">
                Receive orientation and training to prepare you for your volunteer role.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Start Impact</h3>
              <p className="text-gray-600">
                Begin your volunteer journey and start making a difference in children's lives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h2 className="text-3xl font-bold text-charcoal mb-6">Ready to Join Us?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Fill out the application form and take the first step towards making a meaningful impact.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-trust-blue rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600">Quick 5-minute application</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-trust-blue rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600">No previous experience required</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-trust-blue rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600">Flexible commitment options</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-trust-blue rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-600">Full training and support provided</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <VolunteerForm />
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">What Our Volunteers Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from some of our amazing volunteers about their experience making a difference.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-charcoal">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                      <div className="text-xs text-trust-blue">{testimonial.duration}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic leading-relaxed">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Volunteer Journey Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of volunteers who are already making a difference in children's lives across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-hope-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
              <Heart className="mr-2 h-5 w-5 fill-current" />
              Apply to Volunteer
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-trust-blue px-8 py-4 rounded-full font-semibold text-lg">
                Have Questions? Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Volunteer;
