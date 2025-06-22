import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import About from "@/pages/about";
import Programs from "@/pages/programs";
import ProgramDetail from "@/pages/program-detail";
import Donate from "@/pages/donate";
import Volunteer from "@/pages/volunteer";
import Internships from "@/pages/internships";
import Collaborations from "@/pages/collaborations";
import MediaEvents from "@/pages/media-events";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/programs" component={Programs} />
          <Route path="/programs/:id" component={ProgramDetail} />
          <Route path="/donate" component={Donate} />
          <Route path="/volunteer" component={Volunteer} />
          <Route path="/internships" component={Internships} />
          <Route path="/collaborations" component={Collaborations} />
          <Route path="/media-events" component={MediaEvents} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
