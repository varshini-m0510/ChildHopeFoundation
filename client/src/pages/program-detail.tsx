import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Users, Target, Calendar } from "lucide-react";

const ProgramDetail = () => {
  const { id } = useParams();
  
  const { data: program, isLoading, error } = useQuery({
    queryKey: ["/api/programs", id],
    queryFn: () => fetch(`/api/programs/${id}`).then(res => {
      if (!res.ok) throw new Error("Program not found");
      return res.json();
    }),
  });

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8" />
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-8" />
            <div className="h-64 bg-gray-200 rounded mb-8" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !program) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <div className="text-red-500 mb-4">
              <Target className="h-12 w-12 mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal mb-4">Program Not Found</h1>
            <p className="text-gray-600 mb-6">
              The program you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/programs">
              <Button className="bg-trust-blue hover:bg-blue-700 text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Programs
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progressPercentage = (program.currentNumber / program.targetNumber) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "education":
        return "bg-trust-blue";
      case "healthcare":
        return "bg-success-green";
      case "nutrition":
        return "bg-hope-orange";
      default:
        return "bg-trust-blue";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "education":
        return "🎓";
      case "healthcare":
        return "🏥";
      case "nutrition":
        return "🍎";
      default:
        return "❤️";
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/programs">
            <Button variant="ghost" className="text-trust-blue hover:text-blue-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Programs
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 ${getCategoryColor(program.category)} rounded-full flex items-center justify-center`}>
                  <span className="text-2xl">{getCategoryIcon(program.category)}</span>
                </div>
                <Badge variant="secondary" className="text-sm px-3 py-1">
                  {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">{program.title}</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{program.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/donate">
                  <Button className="bg-hope-orange hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold">
                    <Heart className="mr-2 h-5 w-5 fill-current" />
                    Support This Program
                  </Button>
                </Link>
                <Link href="/volunteer">
                  <Button variant="outline" className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white px-8 py-3 rounded-full font-semibold">
                    <Users className="mr-2 h-5 w-5" />
                    Volunteer
                  </Button>
                </Link>
              </div>
            </div>

            <div>
              <img
                src={program.imageUrl}
                alt={program.title}
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-trust-blue mb-2">
                  {program.currentNumber.toLocaleString()}
                </div>
                <div className="text-lg text-gray-600">People Reached</div>
                <p className="text-sm text-gray-500 mt-2">Beneficiaries served so far</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-success-green mb-2">
                  {program.targetNumber.toLocaleString()}
                </div>
                <div className="text-lg text-gray-600">Annual Target</div>
                <p className="text-sm text-gray-500 mt-2">Goal for {new Date().getFullYear()}</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="text-4xl font-bold text-hope-orange mb-2">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-lg text-gray-600">Progress</div>
                <p className="text-sm text-gray-500 mt-2">Towards annual goal</p>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <div className="mt-12 bg-white p-8 rounded-2xl shadow-lg">
            <div className="flex justify-between text-lg font-semibold text-charcoal mb-4">
              <span>{new Date().getFullYear()} Progress</span>
              <span>{program.currentNumber.toLocaleString()} / {program.targetNumber.toLocaleString()}</span>
            </div>
            <Progress value={progressPercentage} className="w-full h-4 mb-4" />
            <p className="text-gray-600 text-center">
              We're {Math.round(progressPercentage)}% of the way to our {new Date().getFullYear()} goal of reaching {program.targetNumber.toLocaleString()} beneficiaries.
            </p>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-charcoal mb-8">About This Program</h2>
            
            {program.category === "education" && (
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Our Quality Education program focuses on providing foundational literacy, numeracy, and life skills 
                  education to underprivileged children. We use innovative teaching methods that make learning engaging 
                  and effective, ensuring every child has the opportunity to reach their full potential.
                </p>
                
                <h3 className="text-2xl font-bold text-charcoal mt-8 mb-4">What We Provide</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-trust-blue mr-3 mt-1">•</span>
                    Interactive learning materials and educational resources
                  </li>
                  <li className="flex items-start">
                    <span className="text-trust-blue mr-3 mt-1">•</span>
                    Trained teachers and mentors for personalized attention
                  </li>
                  <li className="flex items-start">
                    <span className="text-trust-blue mr-3 mt-1">•</span>
                    Technology integration with tablets and educational software
                  </li>
                  <li className="flex items-start">
                    <span className="text-trust-blue mr-3 mt-1">•</span>
                    Life skills workshops and career guidance
                  </li>
                  <li className="flex items-start">
                    <span className="text-trust-blue mr-3 mt-1">•</span>
                    Parent engagement programs to support learning at home
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-charcoal mt-8 mb-4">Impact Stories</h3>
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-trust-blue">
                  <p className="text-gray-700 italic">
                    "When Meera joined our program at age 8, she could barely write her name. Today, at 12, 
                    she's at the top of her class and dreams of becoming a doctor. Her transformation shows 
                    what's possible when we invest in a child's education."
                  </p>
                  <p className="text-sm text-gray-600 mt-2">- Rajesh Kumar, Program Director</p>
                </div>
              </div>
            )}

            {program.category === "healthcare" && (
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Our Healthcare Access program ensures that children and their families receive essential medical 
                  care, preventive services, and health education. We work to eliminate barriers to healthcare 
                  and promote overall well-being in underserved communities.
                </p>
                
                <h3 className="text-2xl font-bold text-charcoal mt-8 mb-4">Services We Offer</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-success-green mr-3 mt-1">•</span>
                    Regular health checkups and medical screenings
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-green mr-3 mt-1">•</span>
                    Vaccination drives and immunization programs
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-green mr-3 mt-1">•</span>
                    Emergency medical assistance and referrals
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-green mr-3 mt-1">•</span>
                    Health education and hygiene workshops
                  </li>
                  <li className="flex items-start">
                    <span className="text-success-green mr-3 mt-1">•</span>
                    Mental health support and counseling services
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-charcoal mt-8 mb-4">Community Impact</h3>
                <div className="bg-green-50 p-6 rounded-lg border-l-4 border-success-green">
                  <p className="text-gray-700 italic">
                    "Our mobile health clinics have reduced child mortality rates by 40% in the communities 
                    we serve. Early intervention and preventive care are saving lives and giving families hope."
                  </p>
                  <p className="text-sm text-gray-600 mt-2">- Dr. Anita Patel, Healthcare Coordinator</p>
                </div>
              </div>
            )}

            {program.category === "nutrition" && (
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Our Nutrition Support program addresses malnutrition and food insecurity among children through 
                  meal programs, nutrition education, and community gardens. We believe that proper nutrition is 
                  fundamental to a child's development and learning capacity.
                </p>
                
                <h3 className="text-2xl font-bold text-charcoal mt-8 mb-4">Program Components</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-hope-orange mr-3 mt-1">•</span>
                    Daily nutritious meals for children in our programs
                  </li>
                  <li className="flex items-start">
                    <span className="text-hope-orange mr-3 mt-1">•</span>
                    Take-home rations for families in need
                  </li>
                  <li className="flex items-start">
                    <span className="text-hope-orange mr-3 mt-1">•</span>
                    Nutrition education for parents and caregivers
                  </li>
                  <li className="flex items-start">
                    <span className="text-hope-orange mr-3 mt-1">•</span>
                    Community kitchen gardens and farming initiatives
                  </li>
                  <li className="flex items-start">
                    <span className="text-hope-orange mr-3 mt-1">•</span>
                    Micronutrient supplementation programs
                  </li>
                </ul>

                <h3 className="text-2xl font-bold text-charcoal mt-8 mb-4">Success Metrics</h3>
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-hope-orange">
                  <p className="text-gray-700 italic">
                    "Since starting our nutrition program, we've seen a 60% reduction in malnutrition rates 
                    among participating children. Better nutrition means better learning outcomes and brighter futures."
                  </p>
                  <p className="text-sm text-gray-600 mt-2">- Community Health Worker</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-6">Help Us Reach Our Goal</h2>
          <p className="text-xl text-gray-600 mb-8">
            Your support can help us reach more children and create lasting impact in communities across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/donate">
              <Button className="bg-trust-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg">
                <Heart className="mr-2 h-5 w-5 fill-current" />
                Donate Now
              </Button>
            </Link>
            <Link href="/volunteer">
              <Button variant="outline" className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white px-8 py-4 rounded-full font-semibold text-lg">
                <Users className="mr-2 h-5 w-5" />
                Volunteer with Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetail;
