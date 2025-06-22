import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertVolunteerSchema } from "@shared/schema";
import { VOLUNTEER_AREAS, AVAILABILITY_OPTIONS } from "@/lib/constants";

const VolunteerForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertVolunteerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      interestArea: "",
      availability: "",
      skills: "",
    },
  });

  const volunteerMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/volunteers", data),
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "Thank you for your interest in volunteering. We'll be in touch soon.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/volunteers"] });
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
    volunteerMutation.mutate(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-6">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"
          alt="Volunteers with children"
          className="w-full h-48 object-cover rounded-lg mb-6"
        />
        <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-white text-2xl">🤝</span>
        </div>
        <h3 className="text-2xl font-bold text-charcoal mb-4">Volunteer With Us</h3>
        <p className="text-gray-600 mb-6">
          Share your skills and time to directly impact children's lives. Whether it's teaching, mentoring, or
          organizing events.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number *</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestArea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Area *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your interest area" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {VOLUNTEER_AREAS.map((area) => (
                      <SelectItem key={area} value={area}>
                        {area}
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
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time Availability *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
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
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills & Experience</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your skills and why you want to volunteer"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={volunteerMutation.isPending}
            className="w-full bg-hope-orange hover:bg-orange-600 text-white font-medium"
          >
            {volunteerMutation.isPending ? "Submitting..." : "Sign Up to Volunteer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VolunteerForm;
