import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Camera, Newspaper, Play, ExternalLink } from "lucide-react";
import { Link } from "wouter";

const MediaEvents = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: upcomingEvents, isLoading: upcomingLoading } = useQuery({
    queryKey: ["/api/events", "upcoming"],
    queryFn: () => fetch("/api/events?type=upcoming").then(res => res.json()),
  });

  const { data: pastEvents, isLoading: pastLoading } = useQuery({
    queryKey: ["/api/events", "past"],
    queryFn: () => fetch("/api/events?type=past").then(res => res.json()),
  });

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Children in educational activities",
      category: "Education"
    },
    {
      url: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Volunteers teaching children",
      category: "Volunteering"
    },
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Children enjoying nutritious meals",
      category: "Nutrition"
    },
    {
      url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Healthcare checkup for children",
      category: "Healthcare"
    },
    {
      url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Community outreach activities",
      category: "Community"
    },
    {
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Educational materials and books",
      category: "Education"
    },
    {
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Team celebration moment",
      category: "Events"
    },
    {
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Workshop and training sessions",
      category: "Training"
    }
  ];

  const pressArticles = [
    {
      title: "Times of India Features Parikrama's Education Initiative",
      description: "Our innovative approach to digital learning in underserved communities gains national recognition.",
      source: "Times of India",
      date: "February 28, 2024",
      url: "#",
      logo: "📰"
    },
    {
      title: "NDTV Covers Our Healthcare Initiative",
      description: "Documentary on how mobile health clinics are reaching remote communities.",
      source: "NDTV",
      date: "February 15, 2024",
      url: "#",
      logo: "📺"
    },
    {
      title: "The Better India Highlights Success Stories",
      description: "Feature article on children who have transformed their lives through our programs.",
      source: "The Better India",
      date: "January 20, 2024",
      url: "#",
      logo: "🌐"
    },
    {
      title: "Economic Times: CSR Partnership Models",
      description: "How Parikrama's corporate partnerships are creating sustainable impact.",
      source: "Economic Times",
      date: "January 10, 2024",
      url: "#",
      logo: "📈"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const EventCard = ({ event, isUpcoming = true }: { event: any; isUpcoming?: boolean }) => (
    <Card className="border-none shadow-lg card-hover">
      <img 
        src={event.imageUrl} 
        alt={event.title}
        className="w-full h-48 object-cover rounded-t-2xl"
      />
      <CardContent className="p-6">
        <div className="flex items-center text-trust-blue text-sm mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          {formatDate(event.eventDate)}
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-3">{event.title}</h3>
        <p className="text-gray-600 mb-4">{event.description}</p>
        <div className="flex items-center text-gray-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          {event.location}
        </div>
        {isUpcoming ? (
          <Button className="w-full bg-trust-blue hover:bg-blue-700 text-white">
            {event.registrationRequired ? "Register Now" : "Learn More"}
          </Button>
        ) : (
          <Button variant="outline" className="w-full border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white">
            View Highlights
          </Button>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 bg-gradient-to-r from-trust-blue to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Media & Events</h1>
          <p className="text-xl opacity-90">
            Stay updated with our latest activities, events, and impact stories through our media gallery and news coverage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-1/2 mx-auto mb-12">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
              <TabsTrigger value="press">Press Coverage</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>

            {/* Upcoming Events */}
            <TabsContent value="upcoming">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-charcoal text-center mb-6">Upcoming Events</h2>
                <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Join us at our upcoming events and be part of our mission to create positive change.
                </p>
              </div>

              {upcomingLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-6 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-4" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : upcomingEvents && upcomingEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {upcomingEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} isUpcoming={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4">No Upcoming Events</h3>
                  <p className="text-gray-600 mb-6">
                    We're planning exciting events for the future. Check back soon for updates!
                  </p>
                  <Link href="/contact">
                    <Button className="bg-trust-blue hover:bg-blue-700 text-white">
                      Get Notified About Events
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            {/* Photo Gallery */}
            <TabsContent value="gallery">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-charcoal text-center mb-6">Photo Gallery</h2>
                <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Capturing moments of joy, learning, and transformation from our programs and events.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <Badge variant="secondary" className="text-xs bg-white/90">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Button className="bg-charcoal hover:bg-gray-800 text-white px-8 py-3 rounded-lg">
                  <Camera className="mr-2 h-5 w-5" />
                  View Full Gallery
                </Button>
              </div>

              {/* Image Modal */}
              {selectedImage && (
                <div 
                  className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="relative max-w-4xl max-h-full">
                    <img
                      src={selectedImage}
                      alt="Gallery image"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Press Coverage */}
            <TabsContent value="press">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-charcoal text-center mb-6">Press Coverage</h2>
                <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Our work and impact as featured in leading media outlets across India.
                </p>
              </div>

              <div className="space-y-6">
                {pressArticles.map((article, index) => (
                  <Card key={index} className="border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-20 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl">{article.logo}</span>
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-xl font-bold text-charcoal mb-2">{article.title}</h3>
                          <p className="text-gray-600 mb-3">{article.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-gray-500">
                              <span className="font-medium">{article.source}</span>
                              <span className="mx-2">•</span>
                              <span>{article.date}</span>
                            </div>
                            <Button variant="outline" size="sm" className="text-trust-blue hover:bg-trust-blue hover:text-white">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Read Article
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button className="bg-trust-blue hover:bg-blue-700 text-white px-8 py-3 rounded-lg">
                  <Newspaper className="mr-2 h-5 w-5" />
                  View All Press Coverage
                </Button>
              </div>
            </TabsContent>

            {/* Past Events */}
            <TabsContent value="past">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-charcoal text-center mb-6">Past Events</h2>
                <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
                  Look back at our successful events and the impact they created in our communities.
                </p>
              </div>

              {pastLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                      <div className="w-full h-48 bg-gray-200 rounded-lg mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-2" />
                      <div className="h-6 bg-gray-200 rounded mb-4" />
                      <div className="h-4 bg-gray-200 rounded mb-4" />
                      <div className="h-10 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              ) : pastEvents && pastEvents.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {pastEvents.map((event: any) => (
                    <EventCard key={event.id} event={event} isUpcoming={false} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Calendar className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-4">No Past Events</h3>
                  <p className="text-gray-600">
                    Our event history will be displayed here as we continue our mission.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-6">Get Involved in Our Events</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join us at our next event or help us organize community activities that create lasting impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/volunteer">
              <Button className="bg-trust-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg">
                <Users className="mr-2 h-5 w-5" />
                Volunteer at Events
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-trust-blue text-trust-blue hover:bg-trust-blue hover:text-white px-8 py-4 rounded-full font-semibold text-lg">
                Suggest an Event
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MediaEvents;
