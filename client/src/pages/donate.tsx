import DonationForm from "@/components/donation-form";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Heart, Shield, Receipt, Users } from "lucide-react";

const Donate = () => {
  const { data: programs } = useQuery({
    queryKey: ["/api/programs"],
  });

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Make a Difference Today</h1>
          <p className="text-xl opacity-90">
            Your contribution directly impacts a child's future. Every donation counts and brings us closer to our mission.
          </p>
        </div>
      </section>

      {/* Impact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
            <div className="p-6">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-white fill-current" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">Direct Impact</h3>
              <p className="text-gray-600">
                100% of your donation goes directly to our programs, creating immediate impact in children's lives.
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">Secure & Safe</h3>
              <p className="text-gray-600">
                Your donations are processed securely with industry-standard encryption and security measures.
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-2">Tax Benefits</h3>
              <p className="text-gray-600">
                Get 80G tax exemption benefits and receive instant digital receipts for all your donations.
              </p>
            </div>
          </div>

          {/* Impact Examples */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-charcoal text-center mb-8">Your Impact</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-trust-blue mb-2">₹500</div>
                  <div className="text-sm text-gray-600">Can provide a month's education for one child</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-success-green mb-2">₹1,000</div>
                  <div className="text-sm text-gray-600">Can fund healthcare for a family of four</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-hope-orange mb-2">₹2,500</div>
                  <div className="text-sm text-gray-600">Can provide nutritious meals for a child for a year</div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">₹5,000</div>
                  <div className="text-sm text-gray-600">Can sponsor a child's complete education for a year</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <DonationForm />
        </div>
      </section>

      {/* Programs You Can Support */}
      {programs && programs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charcoal mb-6">Programs You Can Support</h2>
              <p className="text-xl text-gray-600">
                Choose a specific program or contribute to our general fund where it's needed most.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {programs.slice(0, 3).map((program: any) => (
                <Card key={program.id} className="border-none shadow-lg card-hover">
                  <img 
                    src={program.imageUrl} 
                    alt={program.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-charcoal mb-3">{program.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{program.description}</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span>Progress: {program.currentNumber.toLocaleString()}</span>
                      <span>Goal: {program.targetNumber.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-trust-blue h-2 rounded-full" 
                        style={{ width: `${Math.min((program.currentNumber / program.targetNumber) * 100, 100)}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Transparency Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-charcoal mb-6">Transparency & Accountability</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in complete transparency about how your donations are used and the impact they create.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-6">How We Use Your Donations</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-charcoal">Programs & Services</span>
                  <span className="text-trust-blue font-bold">85%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-charcoal">Operations</span>
                  <span className="text-success-green font-bold">10%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg">
                  <span className="font-semibold text-charcoal">Fundraising</span>
                  <span className="text-hope-orange font-bold">5%</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-charcoal mb-6">Our Certifications</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg flex items-center">
                  <div className="w-12 h-12 bg-trust-blue rounded-full flex items-center justify-center mr-4">
                    <Receipt className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">80G Registration</div>
                    <div className="text-sm text-gray-600">AABCP1234F2024</div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg flex items-center">
                  <div className="w-12 h-12 bg-success-green rounded-full flex items-center justify-center mr-4">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">FCRA Registration</div>
                    <div className="text-sm text-gray-600">083781234</div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg flex items-center">
                  <div className="w-12 h-12 bg-hope-orange rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">Section 8 Company</div>
                    <div className="text-sm text-gray-600">Registered under Companies Act 2013</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donor Recognition */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-charcoal mb-6">Join Our Community of Changemakers</h2>
          <p className="text-xl text-gray-600 mb-8">
            Thousands of donors like you are already making a difference in children's lives across India.
          </p>
          <div className="bg-gradient-to-r from-trust-blue to-blue-700 rounded-2xl p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">2,847</div>
                <div className="text-blue-200">Active Donors</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">₹1.2M</div>
                <div className="text-blue-200">Raised This Year</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">5,200+</div>
                <div className="text-blue-200">Children Supported</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Donate;
