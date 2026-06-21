// Centralised mock data used across the dashboard demo when backend has no records yet.

export const KPIS = [
  { key: "calls_answered", label: "Calls Answered", value: "1,246", delta: "+18.5%", icon: "Phone", tone: "blue" },
  { key: "chats_handled", label: "Chats Handled", value: "2,354", delta: "+22.1%", icon: "MessageSquare", tone: "indigo" },
  { key: "whatsapp_chats", label: "WhatsApp Chats", value: "1,890", delta: "+16.7%", icon: "MessageCircle", tone: "green" },
  { key: "leads_captured", label: "Leads Captured", value: "689", delta: "+25.3%", icon: "Users", tone: "purple" },
  { key: "appointments", label: "Appointments Booked", value: "342", delta: "+20.8%", icon: "Calendar", tone: "cyan" },
];

export const CONVERSATION_SUMMARY = [
  { name: "May 20", Calls: 280, Chats: 720, WhatsApp: 110 },
  { name: "May 21", Calls: 340, Chats: 540, WhatsApp: 180 },
  { name: "May 22", Calls: 410, Chats: 650, WhatsApp: 220 },
  { name: "May 23", Calls: 380, Chats: 700, WhatsApp: 300 },
  { name: "May 24", Calls: 520, Chats: 880, WhatsApp: 360 },
  { name: "May 25", Calls: 460, Chats: 760, WhatsApp: 410 },
  { name: "May 26", Calls: 540, Chats: 820, WhatsApp: 480 },
];

export const TOP_AGENTS = [
  { name: "Voice Agent", conversations: 1246, success: 76, color: "#2563EB", icon: "Phone" },
  { name: "Chat Agent", conversations: 2354, success: 64, color: "#7C3AED", icon: "MessageSquare" },
  { name: "WhatsApp Agent", conversations: 1890, success: 58, color: "#22C55E", icon: "MessageCircle" },
];

export const LEAD_SOURCES = [
  { name: "Website", value: 45, color: "#2563EB" },
  { name: "WhatsApp", value: 30, color: "#22C55E" },
  { name: "Google Ads", value: 15, color: "#7C3AED" },
  { name: "Referral", value: 7, color: "#F59E0B" },
  { name: "Others", value: 3, color: "#94A3B8" },
];

export const RECENT_CONVERSATIONS = [
  { id: "c1", phone: "+91 98765 43210", channel: "Voice Call", time: "10:30 AM", status: "Completed", tone: "green" },
  { id: "c2", phone: "Rahul Sharma", channel: "Website Chat", time: "10:25 AM", status: "Qualified", tone: "blue" },
  { id: "c3", phone: "+91 91234 56789", channel: "WhatsApp", time: "10:20 AM", status: "Completed", tone: "green" },
  { id: "c4", phone: "Priya Patel", channel: "Website Chat", time: "10:15 AM", status: "Appointment Booked", tone: "purple" },
  { id: "c5", phone: "+91 99876 54321", channel: "Voice Call", time: "10:10 AM", status: "Missed", tone: "red" },
];

export const LEADS = [
  { id: "l1", name: "Rahul Sharma", email: "rahul.sharma@email.com", phone: "+91 98765 43210", source: "Voice Call", intent: "Book Appointment", status: "Qualified", score: 92, date: "May 26, 2024" },
  { id: "l2", name: "Priya Patel", email: "priya@example.com", phone: "+91 91234 56789", source: "Website Chat", intent: "Product Inquiry", status: "New", score: 76, date: "May 26, 2024" },
  { id: "l3", name: "Amit Verma", email: "amit.verma@gmail.com", phone: "+91 99876 54321", source: "WhatsApp", intent: "Pricing", status: "Contacted", score: 81, date: "May 25, 2024" },
  { id: "l4", name: "Dr. Anita Singh", email: "anita.singh@clinic.com", phone: "+91 98989 67676", source: "Voice Call", intent: "Book Consultation", status: "Won", score: 95, date: "May 25, 2024" },
  { id: "l5", name: "Karan Mehta", email: "karan.m@business.in", phone: "+91 90909 11223", source: "Website Chat", intent: "Demo Request", status: "Qualified", score: 88, date: "May 24, 2024" },
  { id: "l6", name: "Sneha Iyer", email: "sneha.iyer@org.com", phone: "+91 87878 23232", source: "WhatsApp", intent: "Support", status: "Lost", score: 42, date: "May 23, 2024" },
];

export const LIVE_TRANSCRIPT = [
  { who: "agent", time: "10:30:15 AM", text: "Hello, thank you for calling Bright Dental Clinic. How can I help you today?" },
  { who: "customer", time: "10:30:22 AM", text: "I need a dental appointment tomorrow." },
  { who: "agent", time: "10:30:28 AM", text: "Sure, I'd be happy to help. Which location would you prefer?" },
  { who: "customer", time: "10:30:36 AM", text: "Andheri West branch." },
  { who: "agent", time: "10:30:40 AM", text: "Great! I have an appointment available tomorrow at 10:00 AM. Shall I book it for you?" },
  { who: "customer", time: "10:30:46 AM", text: "Yes, please book it." },
  { who: "agent", time: "10:30:52 AM", text: "Your appointment is confirmed for tomorrow at 10:00 AM at Andheri West branch." },
];

export const INDUSTRY_USE_CASES = [
  { name: "Healthcare", desc: "Appointment scheduling, patient support & reminders", icon: "Stethoscope", slug: "healthcare" },
  { name: "Real Estate", desc: "Lead qualification, site visits & follow-ups", icon: "Home", slug: "real-estate" },
  { name: "Education", desc: "Admissions, inquiries & student support", icon: "GraduationCap", slug: "education" },
  { name: "Insurance", desc: "Policy support, claims & renewals", icon: "ShieldCheck", slug: "insurance" },
  { name: "Automotive", desc: "Service booking, reminders & support", icon: "Car", slug: "automotive" },
  { name: "Finance", desc: "Customer onboarding, KYC & support", icon: "Wallet", slug: "finance" },
  { name: "Retail", desc: "Order tracking, returns & support", icon: "ShoppingBag", slug: "retail" },
  { name: "Hospitality", desc: "Reservations, support & guest services", icon: "Hotel", slug: "hospitality" },
];

export const INTEGRATIONS = [
  { name: "Salesforce", category: "CRM", desc: "Sync leads and contacts to Salesforce CRM.", slug: "salesforce" },
  { name: "HubSpot", category: "CRM", desc: "Auto-create deals and update pipelines.", slug: "hubspot" },
  { name: "Zoho CRM", category: "CRM", desc: "Push qualified leads to Zoho.", slug: "zoho" },
  { name: "Pipedrive", category: "CRM", desc: "Create deals from conversations.", slug: "pipedrive" },
  { name: "Google Calendar", category: "Calendar", desc: "Book appointments directly in Google Calendar.", slug: "google-calendar" },
  { name: "Microsoft Outlook", category: "Calendar", desc: "Schedule meetings in Outlook.", slug: "outlook" },
  { name: "WhatsApp Business", category: "Communication", desc: "Connect to WhatsApp Business API.", slug: "whatsapp" },
  { name: "Slack", category: "Communication", desc: "Get notified of new leads in Slack.", slug: "slack" },
  { name: "Microsoft Teams", category: "Communication", desc: "Receive alerts in Teams channels.", slug: "teams" },
  { name: "Gmail", category: "Productivity", desc: "Send follow-up emails via Gmail.", slug: "gmail" },
  { name: "Webhook", category: "Other", desc: "Send events to any URL via webhook.", slug: "webhook" },
  { name: "API", category: "Other", desc: "Build custom integrations via REST API.", slug: "api" },
];

export const TEMPLATES = [
  { name: "Dental Clinic Receptionist", type: "Voice Agent", desc: "Voice agent for dental clinics to handle calls and appointments.", icon: "Stethoscope" },
  { name: "Real Estate Assistant", type: "Chat Agent", desc: "Qualify leads and book site visits automatically.", icon: "Home" },
  { name: "Car Service Booking", type: "WhatsApp Agent", desc: "Book car services and handle customer queries.", icon: "Car" },
  { name: "Insurance Support Agent", type: "Voice Agent", desc: "Answer policy queries and assist customers.", icon: "ShieldCheck" },
  { name: "Restaurant Reservation", type: "WhatsApp Agent", desc: "Take reservations and manage bookings.", icon: "Hotel" },
  { name: "Lead Qualification Agent", type: "Chat Agent", desc: "Qualify leads and route to sales team.", icon: "Users" },
];

export const FAQ = [
  { q: "What is OraOne?", a: "OraOne is an AI Agent Platform that automates customer conversations across voice, chat, and WhatsApp — so your business never misses a lead." },
  { q: "How does the Voice Agent work?", a: "Our Voice Agent answers inbound calls 24/7, has natural conversations, books appointments, and captures leads automatically into your CRM." },
  { q: "Can I integrate OraOne with my existing CRM?", a: "Yes — OraOne ships with native integrations for Salesforce, HubSpot, Zoho, Pipedrive, plus webhooks and REST APIs for anything custom." },
  { q: "Is my data secure?", a: "All data is encrypted in transit (TLS 1.3) and at rest (AES-256). OraOne is built on enterprise AWS infrastructure with audit logs and RBAC." },
  { q: "Can I try OraOne for free?", a: "Absolutely. Sign up for free Beta Access — no credit card required. Deploy your first agent in minutes." },
  { q: "How long does deployment take?", a: "Most customers go live within 24 hours. Connect your channels, train on your knowledge base, and you're ready." },
];

export const TESTIMONIALS = [
  { quote: "OraOne AI handles our calls and books appointments 24/7. We've never missed a lead again!", name: "Dr. Priya Sharma", role: "Apollo Clinic" },
  { quote: "Our real estate leads increased by 3X after deploying OraOne. It's like having an AI receptionist!", name: "Rahul Mehta", role: "RE/MAX India" },
  { quote: "The WhatsApp automation is a game changer. Super easy to use and extremely reliable.", name: "Amit Verma", role: "Verma Motors" },
];

export const TEAM_MEMBERS = [
  { id: "t1", name: "OraOne Admin", email: "admin@oraone.ai", role: "Owner", status: "active" },
  { id: "t2", name: "Sarah Connor", email: "sarah@oraone.ai", role: "Admin", status: "active" },
  { id: "t3", name: "John Reese", email: "john@oraone.ai", role: "Manager", status: "active" },
  { id: "t4", name: "Maya Singh", email: "maya@oraone.ai", role: "Viewer", status: "invited" },
];

export const KNOWLEDGE_DOCS = [
  { id: "k1", name: "Product Catalog 2024.pdf", type: "PDF", size: "2.4 MB", uploaded: "May 20, 2024", status: "trained" },
  { id: "k2", name: "Service Policies.docx", type: "DOCX", size: "1.1 MB", uploaded: "May 18, 2024", status: "trained" },
  { id: "k3", name: "FAQs - Customer Support", type: "FAQ", size: "—", uploaded: "May 15, 2024", status: "training" },
  { id: "k4", name: "https://oraone.ai/docs", type: "URL", size: "—", uploaded: "May 12, 2024", status: "trained" },
];
