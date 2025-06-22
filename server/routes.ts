import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDonationSchema, insertVolunteerSchema, insertInternshipSchema, 
  insertPartnershipSchema, insertContactSchema, insertNewsletterSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Programs API
  app.get("/api/programs", async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      res.json(programs);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching programs: " + error.message });
    }
  });

  app.get("/api/programs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const program = await storage.getProgram(id);
      if (!program) {
        return res.status(404).json({ message: "Program not found" });
      }
      res.json(program);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching program: " + error.message });
    }
  });

  // Donations API
  app.post("/api/donations", async (req, res) => {
    try {
      const validatedData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(validatedData);
      res.json(donation);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating donation: " + error.message });
    }
  });

  app.get("/api/donations", async (req, res) => {
    try {
      const donations = await storage.getAllDonations();
      res.json(donations);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching donations: " + error.message });
    }
  });

  app.patch("/api/donations/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const donation = await storage.updateDonationStatus(id, status);
      if (!donation) {
        return res.status(404).json({ message: "Donation not found" });
      }
      res.json(donation);
    } catch (error: any) {
      res.status(500).json({ message: "Error updating donation status: " + error.message });
    }
  });

  // Volunteers API
  app.post("/api/volunteers", async (req, res) => {
    try {
      const validatedData = insertVolunteerSchema.parse(req.body);
      const volunteer = await storage.createVolunteer(validatedData);
      res.json(volunteer);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating volunteer application: " + error.message });
    }
  });

  app.get("/api/volunteers", async (req, res) => {
    try {
      const volunteers = await storage.getAllVolunteers();
      res.json(volunteers);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching volunteers: " + error.message });
    }
  });

  // Internships API
  app.post("/api/internships", async (req, res) => {
    try {
      const validatedData = insertInternshipSchema.parse(req.body);
      const internship = await storage.createInternship(validatedData);
      res.json(internship);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating internship application: " + error.message });
    }
  });

  app.get("/api/internships", async (req, res) => {
    try {
      const internships = await storage.getAllInternships();
      res.json(internships);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching internships: " + error.message });
    }
  });

  // Partnerships API
  app.post("/api/partnerships", async (req, res) => {
    try {
      const validatedData = insertPartnershipSchema.parse(req.body);
      const partnership = await storage.createPartnership(validatedData);
      res.json(partnership);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating partnership inquiry: " + error.message });
    }
  });

  app.get("/api/partnerships", async (req, res) => {
    try {
      const partnerships = await storage.getAllPartnerships();
      res.json(partnerships);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching partnerships: " + error.message });
    }
  });

  // Contacts API
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.json(contact);
    } catch (error: any) {
      res.status(400).json({ message: "Error creating contact message: " + error.message });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching contacts: " + error.message });
    }
  });

  // Events API
  app.get("/api/events", async (req, res) => {
    try {
      const { type } = req.query;
      let events;
      
      if (type === "upcoming") {
        events = await storage.getUpcomingEvents();
      } else if (type === "past") {
        events = await storage.getPastEvents();
      } else {
        events = await storage.getAllEvents();
      }
      
      res.json(events);
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching events: " + error.message });
    }
  });

  // Newsletter API
  app.post("/api/newsletter", async (req, res) => {
    try {
      const validatedData = insertNewsletterSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscriber(validatedData);
      res.json(subscription);
    } catch (error: any) {
      res.status(400).json({ message: "Error subscribing to newsletter: " + error.message });
    }
  });

  app.delete("/api/newsletter/:email", async (req, res) => {
    try {
      const email = req.params.email;
      const result = await storage.unsubscribeNewsletter(email);
      if (!result) {
        return res.status(404).json({ message: "Subscription not found" });
      }
      res.json({ message: "Successfully unsubscribed" });
    } catch (error: any) {
      res.status(500).json({ message: "Error unsubscribing: " + error.message });
    }
  });

  // Stats API for dashboard
  app.get("/api/stats", async (req, res) => {
    try {
      const programs = await storage.getAllPrograms();
      const volunteers = await storage.getAllVolunteers();
      const donations = await storage.getAllDonations();
      
      const totalChildrenHelped = programs.reduce((sum, program) => sum + program.currentNumber, 0);
      const totalVolunteers = volunteers.length;
      const totalDonations = donations.filter(d => d.paymentStatus === "completed").length;
      
      res.json({
        childrenHelped: totalChildrenHelped,
        citiesCovered: 12, // Static for now
        yearsOperation: 8, // Static for now
        totalVolunteers,
        totalDonations,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Error fetching stats: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
