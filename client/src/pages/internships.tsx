import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertInternshipSchema } from "@shared/schema";
import { INTERNSHIP_TYPES } from "@/lib/constants";
import { Calendar, Clock, MapPin, Users, Award, BookOpen, ArrowRight, Upload } from "lucide-react";

const Internships = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertInternshipSchema),
    defaultValues: {
      fullName: "",
      email: "",
      university: "",
      internshipType: "",
    },
  });

  const internshipMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/internships", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in our internship program. We'll review your application and get back to you soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/internships"] });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    internshipMutation.mutate(data);
  };

  const internshipPrograms = [
    {
      title: "Summer Internship Program",
      duration: "2-3 months",
      type: "Field Work",
      location: "Mumbai & Pune",
      description: "Immersive field experience working directly with communities and children in our education and healthcare programs.",
      requirements: [
        "Currently enrolled in undergraduate/graduate program",
        "Interest in social work or development",
        "Willingness to work in field conditions",
        "Basic Hindi/Marathi communication skills"
      ],
      benefits: [
        "Hands-on experience in social sector",
        "Mentorship from experienced professionals",
        "Certificate of completion",
        "Travel allowance for field visits",
        "Networking opportunities"
      ],
      timeline: "Applications: March-April | Program: May-July",
      icon: "🌞"
    },
    {
      title: "Research Internship",
      duration: "3-6 months",
      type: "Research & Analysis",
      location: "Mumbai Office + Remote",
      description: "Support program evaluation, impact assessment, and policy research to improve our program effectiveness.",
      requirements: [
        "Background in social sciences/public policy",
        "Research methodology knowledge",
        "Data analysis skills (Excel, SPSS, R)",
        "Strong written communication skills"
      ],
      benefits: [
        "Research publication opportunities",
        "Training in impact measurement",
        "Academic supervisor collaboration",
        "Conference presentation chances",
        "Research stipend"
      ],
      timeline: "Rolling applications | Flexible start dates",
      icon: "📊"
    },
    {
      title: "Digital Marketing Internship",
      duration: "3-4 months",
      type: "Marketing & Communications",
      location: "Remote/Office",
      description: "Create engaging content, manage social media, and develop digital campaigns to increase awareness and fundraising.",
      requirements: [
        "Marketing/communications background",
        "Social media management experience",
        "Content creation skills",
        "Basic design knowledge (Canva/Photoshop)"
      ],
      benefits: [
        "Portfolio development opportunities",
        "Training in nonprofit marketing",
        "Campaign management experience",
        "Industry mentor guidance",
        "Performance-based stipend"
      ],
      timeline: "Applications: Ongoing | 3-month cycles",
      icon: "📱"
    },
    {
      title: "Program Management Internship",
      duration: "4-6 months",
      type: "Operations & Management",
      location: "Field Centers",
      description: "Assist in planning, implementing, and monitoring education and healthcare programs across multiple locations.",
      requirements: [
        "Management/administration background",
        "Project coordination experience",
        "Strong organizational skills",
        "Ability to work independently"
      ],
      benefits: [
        "Leadership development training",
        "Program management certification",
        "Cross-functional exposure",
        "Full-time job consideration",
        "Management stipend"
      ],
      timeline: "Applications: Biannual | 6-month programs",
      icon: "⚙️"
    }
  ];

  const internshipBenefits = [
    {
      icon: BookOpen,
      title: "Learning & Development",
      description: "Gain practical experience in social sector work while developing professional skills."
    },
    {
      icon: Users,
      title: "Mentorship",
      description: "Work closely with experienced professionals who guide your learning journey."
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Receive certificates, recommendations, and opportunities for full-time positions."
    },
    {
      icon: MapPin,
      title: "Impact Experience",
      description: "See firsthand how your work contributes to improving children's lives and communities."
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 text-pink-500">Volunteer With Us</h1>
          <p className="text-xl opacity-90 text-pink-400">
            Join our mission to transform lives. Share your skills, time, and passion to create lasting change in children's lives.
          </p>
        </div>
      </section>

      {/* Why Intern */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Why Intern with Parikrama?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our internship programs offer meaningful work experience in the social sector while contributing to real impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {internshipBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="border-none shadow-lg text-center card-hover">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-6">
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

      {/* Internship Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Available Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our diverse internship opportunities designed to match different interests and career goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {internshipPrograms.map((program, index) => (
              <Card key={index} className="border-none shadow-lg card-hover h-full">
                <CardContent className="p-8 h-full flex flex-col">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{program.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-charcoal mb-2">{program.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {program.duration}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          <MapPin className="h-3 w-3 mr-1" />
                          {program.location}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6 flex-grow">{program.description}</p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Requirements:</h4>
                      <ul className="space-y-2">
                        {program.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="text-trust-blue mr-2 mt-1 flex-shrink-0">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-charcoal mb-3">Benefits:</h4>
                      <ul className="space-y-2">
                        {program.benefits.map((benefit, benefitIndex) => (
                          <li key={benefitIndex} className="text-sm text-success-green flex items-start">
                            <span className="text-success-green mr-2 mt-1 flex-shrink-0">✓</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex items-center text-sm text-gray-600 mb-4">
                        <Calendar className="h-4 w-4 mr-2 text-trust-blue" />
                        {program.timeline}
                      </div>
                      <Button className="w-full bg-trust-blue hover:bg-blue-700 text-white">
                        Apply for This Program
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Application Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our streamlined process ensures we match you with the right internship opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white text-2xl font-bold">1</span>
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2">Apply Online</h3>
              <p className="text-sm text-gray-600">
                Submit application form with your preferences and resume.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white text-2xl font-bold">2</span>
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2">Initial Review</h3>
              <p className="text-sm text-gray-600">
                We review applications and shortlist candidates.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white text-2xl font-bold">3</span>
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2">Interview</h3>
              <p className="text-sm text-gray-600">
                Video/phone interview to understand your goals and fit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white text-2xl font-bold">4</span>
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <ArrowRight className="h-6 w-6 text-gray-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2">Selection</h3>
              <p className="text-sm text-gray-600">
                Final selection and internship offer communication.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">5</span>
              </div>
              <h3 className="text-lg font-bold text-charcoal mb-2">Onboarding</h3>
              <p className="text-sm text-gray-600">
                Orientation and training before starting your internship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Apply for Internship</h2>
            <p className="text-xl text-gray-600">
              Ready to start your journey? Fill out the application form below.
            </p>
          </div>

          <Card className="border-none shadow-lg">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
                  alt="Internship program"
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-4">Internship Application</h3>
                <p className="text-gray-600">
                  Join our team and gain valuable experience while making a difference in children's lives.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="university"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>University/College *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your university or college name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="internshipType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Internship Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select internship type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INTERNSHIP_TYPES.map((type) => (
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

                  <div>
                    <FormLabel className="text-sm font-medium">Resume Upload</FormLabel>
                    <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-trust-blue transition-colors">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-trust-blue hover:text-blue-700 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" accept=".pdf,.doc,.docx" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <span className="text-trust-blue mr-3 mt-1">ℹ️</span>
                      <div>
                        <h4 className="font-semibold text-trust-blue">Next Steps</h4>
                        <p className="text-sm text-gray-700">
                          After submitting your application, you'll receive a confirmation email. Our team will review your application and contact you within 5-7 business days.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={internshipMutation.isPending}
                    className="w-full bg-trust-blue hover:bg-blue-700 text-white py-3 font-semibold"
                  >
                    {internshipMutation.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">Intern Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from our former interns about their experience and how it shaped their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                    alt="Intern"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-charcoal">Sneha Patel</div>
                    <div className="text-sm text-gray-600">Summer Intern 2023</div>
                    <div className="text-xs text-trust-blue">Now: Program Officer at UNICEF</div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "My internship at Parikrama was transformative. The hands-on experience and mentorship I received prepared me for a career in international development."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                    alt="Intern"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-charcoal">Arjun Kumar</div>
                    <div className="text-sm text-gray-600">Research Intern 2023</div>
                    <div className="text-xs text-trust-blue">Now: PhD Student at JNU</div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "The research skills I developed during my internship directly contributed to my PhD acceptance. The work was meaningful and impactful."
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
                    alt="Intern"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-charcoal">Priya Singh</div>
                    <div className="text-sm text-gray-600">Marketing Intern 2022</div>
                    <div className="text-xs text-trust-blue">Now: Marketing Manager at Parikrama</div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "I started as an intern and now lead the marketing team. Parikrama invested in my growth and gave me opportunities to make real impact."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Internships;
