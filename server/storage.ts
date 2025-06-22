import { 
  users, programs, donations, volunteers, internships, partnerships, contacts, events, newsletter,
  type User, type InsertUser, type Program, type InsertProgram, type Donation, type InsertDonation,
  type Volunteer, type InsertVolunteer, type Internship, type InsertInternship, 
  type Partnership, type InsertPartnership, type Contact, type InsertContact,
  type Event, type InsertEvent, type Newsletter, type InsertNewsletter
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Program methods
  getAllPrograms(): Promise<Program[]>;
  getProgram(id: number): Promise<Program | undefined>;
  createProgram(program: InsertProgram): Promise<Program>;
  updateProgramProgress(id: number, currentNumber: number): Promise<Program | undefined>;

  // Donation methods
  getAllDonations(): Promise<Donation[]>;
  getDonation(id: number): Promise<Donation | undefined>;
  createDonation(donation: InsertDonation): Promise<Donation>;
  updateDonationStatus(id: number, status: string): Promise<Donation | undefined>;

  // Volunteer methods
  getAllVolunteers(): Promise<Volunteer[]>;
  createVolunteer(volunteer: InsertVolunteer): Promise<Volunteer>;
  updateVolunteerStatus(id: number, status: string): Promise<Volunteer | undefined>;

  // Internship methods
  getAllInternships(): Promise<Internship[]>;
  createInternship(internship: InsertInternship): Promise<Internship>;
  updateInternshipStatus(id: number, status: string): Promise<Internship | undefined>;

  // Partnership methods
  getAllPartnerships(): Promise<Partnership[]>;
  createPartnership(partnership: InsertPartnership): Promise<Partnership>;
  updatePartnershipStatus(id: number, status: string): Promise<Partnership | undefined>;

  // Contact methods
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: number, status: string): Promise<Contact | undefined>;

  // Event methods
  getAllEvents(): Promise<Event[]>;
  getUpcomingEvents(): Promise<Event[]>;
  getPastEvents(): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;

  // Newsletter methods
  getAllNewsletterSubscribers(): Promise<Newsletter[]>;
  createNewsletterSubscriber(newsletter: InsertNewsletter): Promise<Newsletter>;
  unsubscribeNewsletter(email: string): Promise<Newsletter | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private programs: Map<number, Program>;
  private donations: Map<number, Donation>;
  private volunteers: Map<number, Volunteer>;
  private internships: Map<number, Internship>;
  private partnerships: Map<number, Partnership>;
  private contacts: Map<number, Contact>;
  private events: Map<number, Event>;
  private newsletter: Map<number, Newsletter>;
  private currentId: { [key: string]: number };

  constructor() {
    this.users = new Map();
    this.programs = new Map();
    this.donations = new Map();
    this.volunteers = new Map();
    this.internships = new Map();
    this.partnerships = new Map();
    this.contacts = new Map();
    this.events = new Map();
    this.newsletter = new Map();
    this.currentId = {
      user: 1,
      program: 1,
      donation: 1,
      volunteer: 1,
      internship: 1,
      partnership: 1,
      contact: 1,
      event: 1,
      newsletter: 1,
    };

    // Initialize with sample programs
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Add default programs
    const defaultPrograms: InsertProgram[] = [
      {
        title: "Quality Education",
        description: "Providing foundational literacy, numeracy, and life skills education through innovative teaching methods and technology integration.",
        category: "education",
        imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        targetNumber: 1000,
        currentNumber: 750,
        isActive: true,
      },
      {
        title: "Healthcare Access",
        description: "Regular health checkups, vaccination drives, nutrition programs, and emergency medical assistance for children and families.",
        category: "healthcare",
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        targetNumber: 2000,
        currentNumber: 1650,
        isActive: true,
      },
      {
        title: "Nutrition Support",
        description: "Daily nutritious meals, nutrition education, and feeding programs to address malnutrition and support healthy growth.",
        category: "nutrition",
        imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        targetNumber: 800,
        currentNumber: 720,
        isActive: true,
      },
    ];

    defaultPrograms.forEach(program => this.createProgram(program));

    // Add default events
    const defaultEvents: InsertEvent[] = [
      {
        title: "Annual Hope Gala",
        description: "Join us for an evening of inspiration, entertainment, and fundraising for our education programs.",
        eventDate: new Date("2024-03-15T18:00:00"),
        location: "Grand Ballroom, Mumbai",
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        eventType: "upcoming",
        registrationRequired: true,
      },
      {
        title: "Community Health Camp",
        description: "Free health checkups, vaccinations, and health education for families in Dharavi.",
        eventDate: new Date("2024-03-22T09:00:00"),
        location: "Dharavi Community Center",
        imageUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        eventType: "upcoming",
        registrationRequired: false,
      },
    ];

    defaultEvents.forEach(event => this.createEvent(event));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId.user++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Program methods
  async getAllPrograms(): Promise<Program[]> {
    return Array.from(this.programs.values()).filter(program => program.isActive);
  }

  async getProgram(id: number): Promise<Program | undefined> {
    return this.programs.get(id);
  }

  async createProgram(insertProgram: InsertProgram): Promise<Program> {
    const id = this.currentId.program++;
    const program: Program = { 
      ...insertProgram, 
      id, 
      createdAt: new Date()
    };
    this.programs.set(id, program);
    return program;
  }

  async updateProgramProgress(id: number, currentNumber: number): Promise<Program | undefined> {
    const program = this.programs.get(id);
    if (program) {
      const updatedProgram = { ...program, currentNumber };
      this.programs.set(id, updatedProgram);
      return updatedProgram;
    }
    return undefined;
  }

  // Donation methods
  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async getDonation(id: number): Promise<Donation | undefined> {
    return this.donations.get(id);
  }

  async createDonation(insertDonation: InsertDonation): Promise<Donation> {
    const id = this.currentId.donation++;
    const donation: Donation = { 
      ...insertDonation,
      phone: insertDonation.phone || null,
      programId: insertDonation.programId || null,
      panNumber: insertDonation.panNumber || null,
      message: insertDonation.message || null,
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.donations.set(id, donation);
    return donation;
  }

  async updateDonationStatus(id: number, status: string): Promise<Donation | undefined> {
    const donation = this.donations.get(id);
    if (donation) {
      const updatedDonation = { 
        ...donation, 
        status: status
      };
      this.donations.set(id, updatedDonation);
      return updatedDonation;
    }
    return undefined;
  }

  // Volunteer methods
  async getAllVolunteers(): Promise<Volunteer[]> {
    return Array.from(this.volunteers.values());
  }

  async createVolunteer(insertVolunteer: InsertVolunteer): Promise<Volunteer> {
    const id = this.currentId.volunteer++;
    const volunteer: Volunteer = { 
      ...insertVolunteer,
      skills: insertVolunteer.skills || null,
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.volunteers.set(id, volunteer);
    return volunteer;
  }

  async updateVolunteerStatus(id: number, status: string): Promise<Volunteer | undefined> {
    const volunteer = this.volunteers.get(id);
    if (volunteer) {
      const updatedVolunteer = { ...volunteer, status };
      this.volunteers.set(id, updatedVolunteer);
      return updatedVolunteer;
    }
    return undefined;
  }

  // Internship methods
  async getAllInternships(): Promise<Internship[]> {
    return Array.from(this.internships.values());
  }

  async createInternship(insertInternship: InsertInternship): Promise<Internship> {
    const id = this.currentId.internship++;
    const internship: Internship = { 
      ...insertInternship, 
      id, 
      status: "pending",
      resumeUrl: null,
      createdAt: new Date()
    };
    this.internships.set(id, internship);
    return internship;
  }

  async updateInternshipStatus(id: number, status: string): Promise<Internship | undefined> {
    const internship = this.internships.get(id);
    if (internship) {
      const updatedInternship = { ...internship, status };
      this.internships.set(id, updatedInternship);
      return updatedInternship;
    }
    return undefined;
  }

  // Partnership methods
  async getAllPartnerships(): Promise<Partnership[]> {
    return Array.from(this.partnerships.values());
  }

  async createPartnership(insertPartnership: InsertPartnership): Promise<Partnership> {
    const id = this.currentId.partnership++;
    const partnership: Partnership = { 
      ...insertPartnership, 
      id, 
      status: "pending",
      createdAt: new Date()
    };
    this.partnerships.set(id, partnership);
    return partnership;
  }

  async updatePartnershipStatus(id: number, status: string): Promise<Partnership | undefined> {
    const partnership = this.partnerships.get(id);
    if (partnership) {
      const updatedPartnership = { ...partnership, status };
      this.partnerships.set(id, updatedPartnership);
      return updatedPartnership;
    }
    return undefined;
  }

  // Contact methods
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentId.contact++;
    const contact: Contact = { 
      ...insertContact, 
      id, 
      status: "new",
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async updateContactStatus(id: number, status: string): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);
    if (contact) {
      const updatedContact = { ...contact, status };
      this.contacts.set(id, updatedContact);
      return updatedContact;
    }
    return undefined;
  }

  // Event methods
  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getUpcomingEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values()).filter(event => 
      event.eventDate > now || event.eventType === "upcoming"
    );
  }

  async getPastEvents(): Promise<Event[]> {
    const now = new Date();
    return Array.from(this.events.values()).filter(event => 
      event.eventDate <= now || event.eventType === "past"
    );
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentId.event++;
    const event: Event = { 
      ...insertEvent, 
      id, 
      createdAt: new Date()
    };
    this.events.set(id, event);
    return event;
  }

  // Newsletter methods
  async getAllNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletter.values()).filter(sub => sub.status === "active");
  }

  async createNewsletterSubscriber(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existing = Array.from(this.newsletter.values()).find(sub => sub.email === insertNewsletter.email);
    if (existing) {
      if (existing.status === "unsubscribed") {
        // Reactivate subscription
        const updatedSub = { ...existing, status: "active" as const };
        this.newsletter.set(existing.id, updatedSub);
        return updatedSub;
      }
      return existing;
    }

    const id = this.currentId.newsletter++;
    const subscription: Newsletter = { 
      ...insertNewsletter, 
      id, 
      status: "active",
      createdAt: new Date()
    };
    this.newsletter.set(id, subscription);
    return subscription;
  }

  async unsubscribeNewsletter(email: string): Promise<Newsletter | undefined> {
    const subscription = Array.from(this.newsletter.values()).find(sub => sub.email === email);
    if (subscription) {
      const updatedSub = { ...subscription, status: "unsubscribed" as const };
      this.newsletter.set(subscription.id, updatedSub);
      return updatedSub;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
