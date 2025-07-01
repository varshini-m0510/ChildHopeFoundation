import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertPartnershipSchema } from "@shared/schema";
import { PARTNERSHIP_TYPES } from "@/lib/constants";
import { 
  Handshake, 
  Users, 
  TrendingUp, 
  Award, 
  Building, 
  Target, 
  PieChart, 
  CheckCircle,
  ArrowRight,
  Star
} from "lucide-react";

const Collaborations = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertPartnershipSchema),
    defaultValues: {
      companyName: "",
      contactPerson: "",
      email: "",
      partnershipType: "",
      description: "",
    },
  });

  const partnershipMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/partnerships", data),
    onSuccess: () => {
      toast({
        title: "Partnership Inquiry Submitted!",
        description: "Thank you for your interest in partnering with us. Our team will review your inquiry and get back to you within 48 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/partnerships"] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit partnership inquiry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    partnershipMutation.mutate(data);
  };

  const partnershipTypes = [
    {
      title: "CSR Program Development",
      description: "Custom Corporate Social Responsibility solutions aligned with your company values and our mission.",
      icon: Target,
      features: [
        "Tailored CSR program design",
        "Employee engagement activities",
        "Impact measurement and reporting",
        "Quarterly review meetings",
        "Tax exemption documentation"
      ],
      benefits: [
        "Enhanced brand reputation",
        "Employee satisfaction boost",
        "Measurable social impact",
        "80G tax benefits",
        "Stakeholder recognition"
      ],
      commitment: "Long-term partnership",
      investment: "₹5L+ annually"
    },
    {
      title: "Employee Volunteering",
      description: "Engage your workforce in meaningful volunteer activities that build team spirit while creating social impact.",
      icon: Users,
      features: [
        "Structured volunteer programs",
        "Team building activities",
        "Skills-based volunteering",
        "Flexible scheduling",
        "Impact tracking"
      ],
      benefits: [
        "Improved team bonding",
        "Enhanced employee morale",
        "Professional skill development",
        "Leadership opportunities",
        "Purpose-driven culture"
      ],
      commitment: "Quarterly engagements",
      investment: "Time & logistics support"
    },
    {
      title: "Funding Partnership",
      description: "Direct financial support for our programs with transparent reporting and measurable outcomes.",
      icon: TrendingUp,
      features: [
        "Program-specific funding",
        "Regular impact reports",
        "Site visit opportunities",
        "Beneficiary interactions",
        "Recognition opportunities"
      ],
      benefits: [
        "Direct program impact",
        "Transparent fund utilization",
        "Regular progress updates",
        "Community recognition",
        "Social impact measurement"
      ],
      commitment: "1-3 year cycles",
      investment: "₹2L+ per program"
    },
    {
      title: "Skill-based Volunteering",
      description: "Leverage your team's professional expertise to support our organizational capacity and program delivery.",
      icon: Award,
      features: [
        "Pro-bono consulting",
        "Technology solutions",
        "Training and workshops",
        "Strategy development",
        "Process optimization"
      ],
      benefits: [
        "Knowledge sharing",
        "Business skill application",
        "Innovation opportunities",
        "Network expansion",
        "Social impact creation"
      ],
      commitment: "Project-based",
      investment: "Professional time & expertise"
    }
  ];

  const corporatePartners = [
    {
      name: "TechCorp Solutions",
      logo: "🏢",
      partnership: "Technology & Education",
      impact: "Provided digital learning tools to 500+ children",
      duration: "3 years"
    },
    {
      name: "HealthFirst Pharmaceuticals",
      logo: "⚕️",
      partnership: "Healthcare Access",
      impact: "Sponsored mobile health clinics reaching 2,000+ families",
      duration: "2 years"
    },
    {
      name: "GreenEnergy Corp",
      logo: "🌱",
      partnership: "Sustainable Development",
      impact: "Installed solar panels in 10 learning centers",
      duration: "1 year"
    },
    {
      name: "FinanceFirst Bank",
      logo: "🏦",
      partnership: "Financial Literacy",
      impact: "Trained 300+ families in financial planning",
      duration: "2 years"
    }
  ];

  const caseStudies = [
    {
      company: "TechCorp Solutions",
      challenge: "Wanted to engage 200+ employees in meaningful CSR while developing digital literacy among underprivileged children.",
      solution: "Designed a 6-month program where employees mentored children in basic computer skills and digital literacy.",
      results: [
        "95% employee participation rate",
        "400 children gained digital skills",
        "85% improvement in employee satisfaction scores",
        "Featured in company's annual sustainability report"
      ],
      testimonial: "Our partnership with Parikrama transformed how our employees think about social impact. The program exceeded all our expectations.",
      executive: "Rajesh Kumar, VP Corporate Affairs"
    },
    {
      company: "HealthFirst Pharmaceuticals",
      challenge: "Sought to improve healthcare access in rural areas while fulfilling CSR mandates effectively.",
      solution: "Sponsored mobile health clinics and funded preventive healthcare programs in 5 underserved communities.",
      results: [
        "2,000+ people received health checkups",
        "40% reduction in child mortality rates",
        "500+ vaccinations administered",
        "Enhanced brand reputation in healthcare sector"
      ],
      testimonial: "The transparency and impact measurement provided by Parikrama gave us confidence in our investment. Real change happened.",
      executive: "Dr. Priya Patel, Head of CSR"
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Corporate Partnerships</h1>
          <p className="text-xl opacity-90 text-white">
            Partner with us for CSR initiatives, employee engagement programs, and collaborative social impact projects that create lasting change.
          </p>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Why Partner with Parikrama?</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Create meaningful impact while achieving your CSR goals through our proven partnership model.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Proven Impact</h3>
                <p className="text-gray-800">8 years of successful program delivery with measurable outcomes and transparent reporting.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6">
                  <PieChart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Custom Solutions</h3>
                <p className="text-gray-800">Tailored partnerships that align with your company values and CSR objectives.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Recognition</h3>
                <p className="text-gray-800">Enhanced brand reputation and stakeholder recognition for your social impact initiatives.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg text-center card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Compliance</h3>
                <p className="text-gray-800">Meet CSR mandates with proper documentation and 80G tax exemption benefits.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Partnership Models</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Choose from our flexible partnership models designed to maximize impact and employee engagement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => {
              const IconComponent = type.icon;
              return (
                <Card key={index} className="border-none shadow-lg card-hover h-full">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-black">{type.title}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">{type.commitment}</Badge>
                          <Badge variant="outline" className="text-xs">{type.investment}</Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-800 mb-6 flex-grow">{type.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-black mb-3">What We Provide:</h4>
                        <ul className="space-y-2">
                          {type.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-gray-800 flex items-start">
                              <span className="text-trust-blue mr-2 mt-1 flex-shrink-0">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-black mb-3">Your Benefits:</h4>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-sm text-success-green flex items-start">
                              <span className="text-success-green mr-2 mt-1 flex-shrink-0">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-trust-blue hover:bg-blue-700 text-white">
                      Learn More About {type.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Success Stories</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              See how our corporate partners have achieved their CSR goals while creating meaningful impact.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-black mb-4">{study.company}</h3>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-trust-blue mb-2">Challenge:</h4>
                          <p className="text-gray-800 text-sm">{study.challenge}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-success-green mb-2">Solution:</h4>
                          <p className="text-gray-800 text-sm">{study.solution}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-black mb-4">Results Achieved:</h4>
                      <ul className="space-y-3">
                        {study.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-start">
                            <Star className="h-4 w-4 text-hope-orange mr-2 mt-1 flex-shrink-0" />
                            <span className="text-gray-800 text-sm">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-trust-blue mb-4">Client Testimonial:</h4>
                        <p className="text-gray-900 italic text-sm mb-4">"{study.testimonial}"</p>
                        <p className="text-xs text-gray-800">- {study.executive}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Current Partners */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-6">Our Corporate Partners</h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Join these forward-thinking companies in creating positive social impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {corporatePartners.map((partner, index) => (
              <Card key={index} className="border-none shadow-lg text-center card-hover">
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{partner.logo}</div>
                  <h3 className="text-lg font-bold text-black mb-2">{partner.name}</h3>
                  <Badge variant="secondary" className="mb-4 text-xs">
                    {partner.partnership}
                  </Badge>
                  <p className="text-sm text-gray-800 mb-3">{partner.impact}</p>
                  <div className="text-xs text-trust-blue font-medium">
                    Partnership: {partner.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-6">Start Your Partnership Journey</h2>
            <p className="text-xl text-gray-800">
              Ready to create meaningful impact? Share your partnership goals with us.
            </p>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                  alt="Corporate partnership"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">Partnership Inquiry</h3>
                <p className="text-gray-600">
                  Let's discuss how we can work together to create lasting social impact.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPerson"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter contact person name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Enter your email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="partnershipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partnership Interest *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select partnership type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PARTNERSHIP_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partnership Goals & Expectations</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your company's CSR goals, expected partnership outcomes, and any specific requirements..."
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-success-green mr-3 mt-1">✓</span>
                      <div>
                        <h4 className="font-semibold text-success-green">What Happens Next?</h4>
                        <p className="text-sm text-gray-700">
                          Our partnerships team will review your inquiry and schedule a consultation call within 48 hours. 
                          We'll discuss your goals, our programs, and design a custom partnership proposal.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={partnershipMutation.isPending}
                    className="w-full bg-success-green hover:bg-green-700 text-white py-3 font-semibold"
                  >
                    {partnershipMutation.isPending ? "Submitting..." : "Request Partnership Meeting"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference Together?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in creating sustainable change that benefits your business, employees, and the communities we serve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-hope-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
              <Handshake className="mr-2 h-5 w-5" />
              Schedule a Partnership Call
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-trust-blue px-8 py-4 rounded-full font-semibold text-lg">
              Download Partnership Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collaborations;
