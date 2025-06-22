import { useQuery } from "@tanstack/react-query";
import ProgramCard from "@/components/program-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { PROGRAM_CATEGORIES } from "@/lib/constants";

const Programs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: programs, isLoading } = useQuery({
    queryKey: ["/api/programs"],
  });

  const filteredPrograms = programs?.filter((program: any) => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Programs</h1>
          <p className="text-xl opacity-90">
            Comprehensive initiatives designed to address the multifaceted needs of children and their communities.
          </p>
        </div>
      </section>

      {/* Impact Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-trust-blue mb-2">3</div>
              <div className="text-lg text-gray-600">Active Programs</div>
              <p className="text-sm text-gray-500 mt-2">Covering education, healthcare, and nutrition</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-success-green mb-2">12</div>
              <div className="text-lg text-gray-600">Cities Reached</div>
              <p className="text-sm text-gray-500 mt-2">Across multiple states in India</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-hope-orange mb-2">5,200+</div>
              <div className="text-lg text-gray-600">Lives Transformed</div>
              <p className="text-sm text-gray-500 mt-2">Children and families served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center w-full md:w-auto">
              <Input
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(PROGRAM_CATEGORIES).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-600">
              {filteredPrograms.length} program{filteredPrograms.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid lg:grid-cols-3 gap-8">
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
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl text-gray-400">🔍</span>
              </div>
              <h3 className="text-2xl font-bold text-charcoal mb-4">No Programs Found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or category filters to find programs.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                variant="outline"
                className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program: any) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">How We Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our approach is community-centered, evidence-based, and designed for sustainable impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Assess</h3>
              <p className="text-gray-600">
                We conduct thorough community assessments to understand specific needs and challenges.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-success-green rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Plan</h3>
              <p className="text-gray-600">
                We design evidence-based programs in collaboration with communities and local partners.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-hope-orange rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Implement</h3>
              <p className="text-gray-600">
                We execute programs with dedicated teams, ensuring quality delivery and community engagement.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-charcoal mb-4">Evaluate</h3>
              <p className="text-gray-600">
                We continuously monitor and evaluate our programs to ensure effectiveness and impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-6">Support Our Programs</h2>
          <p className="text-xl text-gray-600 mb-8">
            Your contribution can help us expand our programs and reach more children in need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-trust-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg">
              Donate to Programs
            </Button>
            <Button
              variant="outline"
              className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white px-8 py-4 rounded-full font-semibold text-lg"
            >
              Volunteer with Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
