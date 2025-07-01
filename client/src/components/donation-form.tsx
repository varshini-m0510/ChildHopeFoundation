import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertDonationSchema } from "@shared/schema";
import { DONATION_AMOUNTS } from "@/lib/constants";

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(insertDonationSchema.extend({
      amount: insertDonationSchema.shape.amount.refine((val) => Number(val) > 0, {
        message: "Amount must be greater than 0",
      }),
    })),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      amount: "500",
      donationType: "one-time",
      paymentMethod: "credit_card",
      programId: null,
      panNumber: "",
      message: "",
    },
  });

  const donationMutation = useMutation({
    mutationFn: (data: any) => apiRequest("POST", "/api/donations", data),
    onSuccess: () => {
      toast({
        title: "Donation Submitted Successfully!",
        description: "Thank you for your generous donation. We will contact you soon with payment details.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/donations"] });
      form.reset();
      setSelectedAmount(null);
      setCustomAmount("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit donation. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount("");
    form.setValue("amount", amount.toString());
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    form.setValue("amount", value);
  };

  const onSubmit = (data: any) => {
    donationMutation.mutate(data);
  };

  return (
    <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Donation Type */}
          <FormField
            control={form.control}
            name="donationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-charcoal">Donation Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="one-time" id="one-time" />
                      <Label htmlFor="one-time">One-time donation</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="monthly" id="monthly" />
                      <Label htmlFor="monthly">Monthly donation</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Donation Amount */}
          <div>
            <Label className="text-lg font-semibold text-charcoal mb-4 block">Select Amount</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {DONATION_AMOUNTS.map((amount) => (
                <Button
                  key={amount}
                  type="button"
                  variant={selectedAmount === amount ? "default" : "outline"}
                  className={`py-3 ${
                    selectedAmount === amount
                      ? "bg-trust-blue text-white border-trust-blue"
                      : "border-gray-300 hover:border-trust-blue hover:bg-trust-blue hover:text-white"
                  }`}
                  onClick={() => handleAmountSelect(amount)}
                >
                  ₹{amount.toLocaleString()}
                </Button>
              ))}
            </div>
            <Input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              onChange={(e) => handleCustomAmountChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Payment Method */}
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold text-charcoal">Preferred Payment Method</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="upi">UPI Payment</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Program Selection */}
          <FormField
            control={form.control}
            name="programId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Support a specific program (optional)</FormLabel>
                <Select onValueChange={(value) => field.onChange(value ? parseInt(value) : null)} defaultValue={field.value ? String(field.value) : undefined}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="General Fund - Where it's needed most" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">General Fund - Where it's needed most</SelectItem>
                    <SelectItem value="1">Education Program</SelectItem>
                    <SelectItem value="2">Healthcare Access</SelectItem>
                    <SelectItem value="3">Nutrition Support</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Donor Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Full Name*" {...field} />
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
                  <FormControl>
                    <Input type="email" placeholder="Email Address*" {...field} />
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
                  <FormControl>
                    <Input type="tel" placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="panNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="PAN Number (for 80G receipt)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Share why you're supporting our cause or any special instructions..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tax Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-start">
              <span className="text-trust-blue mr-3 mt-1">ℹ️</span>
              <div>
                <h4 className="font-semibold text-trust-blue">Tax Benefits & Next Steps</h4>
                <p className="text-sm text-gray-700">
                  Donations to Parikrama Foundation are eligible for 80G tax exemption. After submitting this form, we will contact you within 24 hours with payment instructions and provide a digital receipt for tax purposes.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={donationMutation.isPending}
            className="w-full bg-gradient-to-r from-trust-blue to-blue-700 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105"
          >
            {donationMutation.isPending ? (
              "Submitting..."
            ) : (
              <>
                <span className="mr-2">❤️</span>
                Submit Donation Request
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Impact Message */}
      <div className="mt-8 text-center">
        <p className="text-gray-600">
          <strong>₹500</strong> can provide a month's education for one child.
          <br />
          <strong>₹1,000</strong> can fund healthcare for a family of four.
          <br />
          <strong>₹2,500</strong> can provide nutritious meals for a child for a year.
        </p>
      </div>
    </div>
  );
};

export default DonationForm;