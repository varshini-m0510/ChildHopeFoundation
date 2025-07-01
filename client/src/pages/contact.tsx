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
import { Checkbox } from "@/components/ui/checkbox";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertContactSchema } from "@shared/schema";
import { INQUIRY_TYPES, CONTACT_INFO } from "@/lib/constants";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  MessageSquare,
  Heart
} from "lucide-react";
import { Link } from "wouter";

const Contact = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertContactSchema.extend({
      subscribeNewsletter: insertContactSchema.shape.subscribeNewsletter.optional(),
    })),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      inquiryType: "",
      message: "",
      subscribeNewsletter: false,
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/contacts", data),
    onSuccess: () => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again or contact us directly via phone.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    contactMutation.mutate(data);
  };

  const socialLinks = [
    { icon: Facebook, url: "#", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Twitter, url: "#", label: "Twitter", color: "hover:bg-blue-400" },
    { icon: Instagram, url: "#", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Linkedin, url: "#", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: Youtube, url: "#", label: "YouTube", color: "hover:bg-red-600" }
  ];

  const contactMethods = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      content: CONTACT_INFO.address,
      color: "bg-trust-blue"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: `${CONTACT_INFO.phone}\n${CONTACT_INFO.hours}`,
      color: "bg-success-green"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: `${CONTACT_INFO.email}\n${CONTACT_INFO.volunteerEmail}\n${CONTACT_INFO.partnershipEmail}`,
      color: "bg-hope-orange"
    }
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6 text-pink-500">Get in Touch</h1>
          <p className="text-xl opacity-90 text-pink-400">
            Have questions about our programs or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-black mb-6">Contact Information</h2>
                <p className="text-xl text-gray-800">
                  Reach out to us through any of the following channels. We're here to help!
                </p>
              </div>

              <div className="space-y-8">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${method.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black mb-2">{method.title}</h3>
                        <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                          {method.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Media Links */}
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-charcoal mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white transition-colors ${social.color}`}
                        aria-label={social.label}
                      >
                        <IconComponent className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-12">
                <Card className="border-none shadow-lg bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Clock className="h-6 w-6 text-trust-blue mr-3" />
                      <h3 className="text-lg font-semibold text-charcoal">Office Hours</h3>
                    </div>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday:</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday:</span>
                        <span className="font-medium">9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span className="font-medium text-red-600">Closed</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-black mb-4">Send Us a Message</h3>
                <p className="text-gray-800">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="inquiryType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inquiry Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select inquiry type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {INQUIRY_TYPES.map((type) => (
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please share your questions, feedback, or how you'd like to get involved..."
                            rows={5}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subscribeNewsletter"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            Subscribe to our newsletter to receive updates about our programs and impact stories.
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full bg-trust-blue hover:bg-blue-700 text-white py-4 rounded-lg font-semibold"
                  >
                    {contactMutation.isPending ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Find Us</h2>
            <p className="text-xl text-gray-800">
              Visit our office or attend one of our community programs to see our work in action.
            </p>
          </div>

          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center text-gray-700">
              <MapPin className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Interactive Map</h3>
              <p className="text-sm mb-4">
                Parikrama Foundation Office<br />
                123 Social Impact Hub, Bandra Kurla Complex<br />
                Mumbai, Maharashtra 400051
              </p>
              <Button variant="outline" className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white">
                Open in Google Maps
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-800">
              Quick answers to common questions about our programs and how to get involved.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-3">
                  How can I volunteer with Parikrama Foundation?
                </h3>
                <p className="text-gray-800 mb-4">
                  Visit our volunteer page to see current opportunities and fill out an application. 
                  We offer both regular and one-time volunteer opportunities.
                </p>
                <Link href="/volunteer">
                  <Button variant="outline" size="sm" className="text-trust-blue hover:bg-trust-blue hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-3">
                  Are donations tax-deductible?
                </h3>
                <p className="text-gray-800 mb-4">
                  Yes, we are registered under Section 80G, making all donations tax-deductible. 
                  You'll receive a digital receipt for tax purposes.
                </p>
                <Link href="/donate">
                  <Button variant="outline" size="sm" className="text-trust-blue hover:bg-trust-blue hover:text-white">
                    Donate Now
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-3">
                  How can my company partner with you?
                </h3>
                <p className="text-gray-800 mb-4">
                  We offer various corporate partnership models including CSR programs, 
                  employee volunteering, and skill-based partnerships.
                </p>
                <Link href="/collaborations">
                  <Button variant="outline" size="sm" className="text-trust-blue hover:bg-trust-blue hover:text-white">
                    Partnership Options
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-black mb-3">
                  Can I visit your programs in action?
                </h3>
                <p className="text-gray-800 mb-4">
                  Absolutely! We welcome visitors to see our programs firsthand. 
                  Contact us to schedule a visit to our learning centers.
                </p>
                <Button variant="outline" size="sm" className="text-trust-blue hover:bg-trust-blue hover:text-white">
                  Schedule Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you want to volunteer, donate, or partner with us, every action creates impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-hope-orange hover:bg-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg">
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Donate Now
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button variant="outline" className="border-hope-orange text-hope-orange hover:bg-hope-orange hover:text-white px-8 py-4 rounded-full font-semibold text-lg">
                Start Volunteering
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
