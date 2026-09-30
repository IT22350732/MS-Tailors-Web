# MS Tailors — Luxury Bespoke Tailoring Platform & Admin Panel

A full-stack, production-grade bespoke tailoring platform and atelier content management system for **MS Tailors** in **Panadura, Western Province, Sri Lanka**.

---

## 1. Architectural Overview

```
MS-Tailors-Web/
├── backend/
│   └── MsTailors.Api/             # ASP.NET Core 8 Web API
│       ├── Controllers/            # REST Endpoints (Auth, Services, Lookbook, Fabrics, Appointments, Inquiries, Dashboard)
│       ├── Data/                   # MongoDb Context & Automated Seeder
│       ├── DTOs/                   # Request/Response Data Contracts
│       ├── Models/                 # MongoDB Document Entities (Bson Attributes)
│       ├── Services/               # JWT Token Generator & Authentication
│       ├── Settings/               # Configuration POCOs
│       └── appsettings.json        # MongoDB Atlas & JWT Secrets
└── frontend/                       # Next.js 14 App Router (TypeScript, Tailwind, Framer Motion)
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx            # Luxury Public Portal & Client Experience
    │   │   ├── admin/page.tsx      # Atelier CMS Dashboard (JWT Authenticated)
    │   │   ├── layout.tsx          # Google Fonts (Cormorant, Cinzel, Inter) & SEO
    │   │   └── globals.css         # Dark Luxury Styling & Hairline Tokens
    │   ├── components/             # Reusable Sartorial UI Components
    │   │   ├── Navbar.tsx          # Sticky Header with Panadura Coordinates & Quick Booking
    │   │   ├── Hero.tsx            # Sartorial Storytelling & Dual Gold CTAs
    │   │   ├── CraftsmanshipStory.tsx # 4 Pillars of Savile Row Handcrafted Bespoke
    │   │   ├── ServicesSection.tsx # Catalog with Turnaround Days & LKR Starting Rates
    │   │   ├── ProcessTimeline.tsx # 5-Stage Sartorial Journey
    │   │   ├── LookbookSection.tsx # Filterable Lookbook Portfolio with Detail Modals
    │   │   ├── FabricLibrarySection.tsx # European Mills (VBC, Scabal, Loro Piana, Irish Linen)
    │   │   ├── SuitRentalSection.tsx # Black-Tie & Wedding Groomsmen Suit Rentals
    │   │   ├── AppointmentModal.tsx# Multi-Step Consultation & Measurement Booking
    │   │   ├── LocationContactSection.tsx # Panadura Atelier Coordinates & Map
    │   │   ├── FloatingHotlineBar.tsx # Direct Mobile WhatsApp & Hotline Bar
    │   │   └── Footer.tsx          # Atelier Details & Staff Admin Link
    │   └── lib/                    # API client, WhatsApp helpers & TypeScript types
    └── tailwind.config.ts          # Luxury Dark Tokens (Obsidian #08090C, Deep Navy, Sartorial Gold)
```

---

## 2. Technology Stack

### Backend
- **Framework:** ASP.NET Core 8 Web API (`.NET 8.0`)
- **Database Driver:** `MongoDB.Driver` (Official C# Driver)
- **Database:** MongoDB Atlas (`MsTailorsDb`)
- **Authentication:** JWT Bearer Authentication (`Microsoft.AspNetCore.Authentication.JwtBearer`)
- **Security:** `BCrypt.Net-Next` for admin password hashing
- **Documentation:** Swagger / OpenAPI UI at `http://localhost:5000/swagger`
- **CORS:** Configured for `http://localhost:3000`

### Frontend
- **Framework:** Next.js 14+ (App Router, TypeScript)
- **Styling:** Tailwind CSS with custom dark luxury tokens:
  - Base Obsidian: `#08090C`
  - Dark Surface / Cards: `#0F1218`
  - Deep Sartorial Navy: `#0A1120`
  - Sartorial Gold: `#C5A880`, `#D4AF37`, `#9E825E`
- **Animations:** `framer-motion` (scroll reveals, modal transitions, smooth hover states)
- **Icons:** `lucide-react`
- **Typography:** `Cormorant Garamond`, `Cinzel`, and `Inter` via Next.js Google Fonts

---

## 3. Getting Started

### Prerequisites
- Node.js 18+ and npm
- .NET 8.0 SDK

### 1. Launch Backend API
```bash
cd backend/MsTailors.Api
dotnet run --launch-profile http
```
- API will start on: `http://localhost:5000`
- Swagger Documentation: `http://localhost:5000/swagger`
- *Database is automatically seeded with initial services, lookbook items, fabric swatches, and the master admin user on first run.*

### 2. Launch Frontend Application
```bash
cd frontend
npm install
npm run dev
```
- Public Platform: `http://localhost:3000`
- Admin CMS: `http://localhost:3000/admin`

---

## 4. Admin Credentials

| Role | Username | Password | Email |
| :--- | :--- | :--- | :--- |
| **Master Tailor (Admin)** | `admin` | `Admin@MsTailors2026` | `Mstailorspdura@gmail.com` |

---

## 5. Key Features

1. **Bespoke Craftsmanship Storytelling:**
   - Highlights the 4 pillars: Hand-cut individual paper patterns, floating horsehair canvas drape, Milanese buttonhole finishing, and archived anatomical measurements.
2. **5-Stage Sartorial Journey:**
   - 1. Consultation -> 2. 30+ Anatomical Measurements -> 3. Fabric Curation -> 4. Basted Skeleton Fitting -> 5. Final Handcrafted Delivery.
3. **European Fabric & Mill Library:**
   - Direct imports from Vitale Barberis Canonico (Italy), Scabal (Savile Row / England), Loro Piana (Italy), and Spence Bryson (Irish Linen) with GSM weights and color filtering.
4. **Suit Rental Suite:**
   - Dedicated black-tie and groomsmen rental packages (LKR 12,500 – 15,000) with master-tailor sleeve & hem alterations and hospital-grade dry-cleaning assurance.
5. **Direct Customer Channels:**
   - Pre-filled WhatsApp inquiry generator with Sri Lanka hotline (`076 407 0182`).
   - Sticky top announcement bar and mobile floating contact bar.
6. **Consultation & Measurement Booking Engine:**
   - Interactive modal with date picker, time slot selector, location choice (*Panadura Studio* vs *Traveling Master Tailor*), and auto-generated booking reference code (`MST-YYMM-XXXX`).
7. **Atelier CMS Dashboard (`/admin`):**
   - KPI counters (Bookings, Inquiries, Active Catalog Items, Fabric Mills).
   - Appointments Table: Confirm, Complete, or Cancel appointments, and launch direct WhatsApp messages to clients with 1 click.
   - Lookbook Manager: Add new lookbook pieces with rental status toggles and price settings.
   - Fabrics & Inquiries feeds.
