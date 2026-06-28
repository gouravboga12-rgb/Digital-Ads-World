# Digital Ads World — Admin Panel User Guide

> **Version:** 1.0 | **Last Updated:** June 2026
> **Admin URL (Live):** `https://digital-ads-world.vercel.app/admin`
> **Admin URL (Local):** `http://localhost:5173/admin`

---

## Table of Contents

1. [Logging In](#1-logging-in)
2. [Dashboard Overview](#2-dashboard-overview)
3. [Dashboard Inquiries](#3-dashboard-inquiries)
4. [Service Requests](#4-service-requests-orders)
5. [Manage Services](#5-manage-services)
6. [Add New Service](#6-add-new-service)
7. [Home Page Edit](#7-home-page-edit)
8. [About Page Edit](#8-about-page-edit)
9. [Our Team Edit](#9-our-team-edit)
10. [Services & Form Edit](#10-services--form-edit)
11. [Contact Page Edit](#11-contact-page-edit)
12. [Gallery Page Edit](#12-gallery-page-edit)
13. [Footer & Terms Edit](#13-footer--terms-edit)
14. [Tips & Best Practices](#14-tips--best-practices)

---

## 1. Logging In

1. Go to `/admin` on your website.
2. Enter your **Admin Username** and **Password**.
3. Click **"Sign In to Console"**.
4. You will see the **Admin Console** sidebar on the left.

> **Security Warning:** Never share your admin credentials. Log out after every session using "Log Out Console" in the sidebar.

---

## 2. Dashboard Overview

After login you see the Dashboard with three summary cards:

| Widget | What It Shows |
|---|---|
| Total Inquiries | All contact form submissions ever received |
| New Inquiries | Submissions not yet followed up (status = New) |
| Handled Leads | Submissions marked Contacted or Converted |

The **left sidebar** links to every admin section.  
The **top-right** shows database connection status and a Refresh button.

---

## 3. Dashboard Inquiries

**Sidebar:** Dashboard Inquiries  
**What it manages:** General contact form submissions from the home page and contact page.

### Filtering Records

Use the **All / Day / Month / Year** toggle bar:

| Filter | How to use |
|---|---|
| **All** | Shows every inquiry with no date restriction |
| **Day** | A date picker appears — pick a specific day to view |
| **Month** | A month picker appears — pick a month (e.g., June 2026) |
| **Year** | A year dropdown appears — pick a year (e.g., 2026) |

Use the **Search box** to find a specific client by name, email, or phone.

### Updating Lead Status

Click the **checkmark (✅)** icon on any row to advance the status:

```
New  →  Contacted  →  Converted  →  Closed
```

### Deleting an Inquiry

Click the **trash (🗑️)** icon. A confirmation popup will appear before deleting permanently.

### Column Reference

| Column | Description |
|---|---|
| Customer Profile | Client name, phone, email |
| Channel / Interest | Service they inquired about |
| Requirements Message | Message text they submitted |
| Status | Current follow-up stage |
| Submitted | Date and time of submission |
| Controls | Status update & delete buttons |

---

## 4. Service Requests (Orders)

**Sidebar:** Service Requests  
**What it manages:** Detailed service order requests submitted via the service inquiry forms. These include uploaded files (briefs, logos, documents).

### Filtering — same as Dashboard Inquiries

Use **All / Day / Month / Year** toggle + Search box.

### Viewing Uploaded Documents

If a client uploaded a file with their order, the **Requirements Details** column will show:
- A **"View"** button — opens the file in a new browser tab
- A **"Download"** button — downloads the file directly

### Updating Order Status

Click the **"Status"** button to cycle through stages:  
`New` → `Contacted` → `Converted` → `Closed`

### Deleting an Order

Click the **trash icon**. Confirm in the popup.

---

## 5. Manage Services

**Sidebar:** Manage Services  
**What it manages:** All existing service listings shown on the Services page.

### Editing a Service

1. Find the service in the list.
2. Click the **pencil (✏️)** icon.
3. Update the fields:
   - Service Name, Slug (URL path), Short Description
   - Full Description, Price / Starting From
   - Icon Name (Lucide icon), Features list
4. Click **"Save Changes"**.

### Deleting a Service

1. Click the **trash icon**.
2. Confirm deletion.

> **Warning:** Deleting a service breaks all public URL links for that service (e.g., `/services/google-ads`). Only delete if the service is being permanently discontinued.

---

## 6. Add New Service

**Sidebar:** Add New Service  
**What it does:** Creates a brand new service card on the Services page.

### Steps

1. Fill in all required fields:
   - **Name** — Display name (e.g., "TikTok Ads")
   - **Slug** — URL path, lowercase, hyphens (e.g., `tiktok-ads`)
   - **Short Description** — One line teaser
   - **Icon Name** — From [lucide.dev/icons](https://lucide.dev/icons) (e.g., `Video`)
   - **Price** — Starting price display
   - **Full Description** — Detailed explanation
   - **Features** — Key deliverables (comma-separated)
2. Click **"Create Service"**.
3. The service appears live on the website immediately.

---

## 7. Home Page Edit

**Sidebar:** Home Page Edit  
**What it manages:** All content visible on the Home (landing) page.

Navigate using the **sub-tabs** at the top of the page:

---

### 7.1 Corporate Coordinates

Edit core agency details used across the whole website:

| Field | Where it appears |
|---|---|
| Agency Name | Header, footer, browser tab |
| Tagline | Hero section |
| Phone | Contact section, footer, floating CTA |
| Email | Contact section, footer |
| Address | Contact & footer |
| Founded Year | About page |
| WhatsApp Number | Floating WhatsApp button (bottom-right) |

**Save Button:** "Save Corporate Details"

---

### 7.2 Hero Copy & CTAs

Edit the main banner at the top of the home page:

- **Hero Headline** — Large bold text (e.g., "We Don't Run Ads, We Drive Results.")
- **Hero Subheadline** — Supporting line below the headline
- **Primary CTA Text** — First action button (e.g., "Start Growing Now")
- **Secondary CTA Text** — Second button (e.g., "View Our Work")

**Save Button:** "Save Hero Copy"

---

### 7.3 Stats Counters

Edit the animated achievement numbers:

- Each stat has: **Number value**, **Label**, **Suffix** (e.g., `+`, `%`, `Cr`)
- Example: `500` + `Clients Served` + `+` → displays as "500+ Clients Served"

**Save Button:** "Save Stats"

---

### 7.4 Core Values

Manage the "Why Choose Us" / core value proposition cards:

- **Add** — Fill in title, description, and Lucide icon name, then click "Add Value"
- **Edit** — Click pencil icon, update fields, click "Update Value"
- **Delete** — Click trash icon

**Save Button:** Changes save automatically per action.

---

### 7.5 Journey Timeline

> **Important:** Changes here appear on **BOTH** the Home Page and About Page automatically.

Manage company milestone history:

- Each milestone: **Year**, **Title**, **Description**
- **Add** — Fill the "New Milestone" form at the bottom, click "Add Milestone"
- **Edit** — Click pencil icon on any milestone
- **Delete** — Click trash icon

**Save Button:** "Save Milestones Timeline"

---

### 7.6 Leads Flow (Process)

Edit the step-by-step process section shown on the home page:

- Switch between **B2C** and **B2B** tabs
- Edit the section title, subtitle
- Edit each process step: number, title, description

**Save Button:** "Save Process Flow"

---

### 7.7 Brand Logos

Manage the scrolling client logo strip:

- **Add** — Upload a logo image, enter the brand name, click "Add Brand"
- **Delete** — Click trash icon on any logo

> Images upload to **Cloudinary**. Recommended: PNG with transparent background, max 1MB.

---

### 7.8 Client Reviews (Testimonials)

Manage the testimonials carousel:

- **Add** — Fill in client name, company, star rating (1-5), feedback, optional avatar image
- **Edit** — Click pencil icon
- **Delete** — Click trash icon

---

### 7.9 Industries We Serve

Manage the industry cards grid:

- **Add** — Enter industry name, sub-description (e.g., "Hospitals • Clinics • Pharma"), icon name, color theme
- **Edit** — Click pencil icon
- **Delete** — Click trash icon

**Save Button:** "Save All to Supabase" — **must click this to sync to database**

**Color Themes available:** Blue, Red, Green, Indigo, Amber, Yellow, Cyan, Slate, Pink, Rose, Purple, Teal

**Icon Names:** Use exact camelCase names from [lucide.dev/icons](https://lucide.dev/icons) — e.g., `Activity`, `Globe`, `ShoppingCart`, `Users`, `Heart`

---

### 7.10 FAQs (Frequently Asked Questions)

Manage the FAQ accordion on the home page:

- **Add** — Enter a question and detailed answer, click "Add FAQ"
- **Edit** — Click pencil icon, update, click "Update FAQ"
- **Delete** — Click trash icon

**Save Button:** "Save All to Supabase" — **must click this to sync to database**

---

## 8. About Page Edit

**Sidebar:** About Page Edit  
**What it manages:** All content on the About Us page.

### Page Copy Tab

Edit text sections:
- About hero headline and subtitle
- Mission statement
- Vision statement
- Company story paragraphs

**Save Button:** "Save About Page Copy"

### Team Tab

Same as Our Team Edit (see Section 9 below).

> **Note:** The Journey Timeline on the About page is controlled from **Home Page Edit → Journey Timeline** (shared data).

---

## 9. Our Team Edit

**Sidebar:** Our Team Edit  
**What it manages:** Team member profiles shown on the About page.

### Adding a Team Member

1. Click **"+ Add Team Member"**
2. Fill in:
   - Full Name
   - Role / Designation (e.g., "Performance Marketing Lead")
   - Short Bio
   - Profile Photo — click Upload (goes to Cloudinary)
   - LinkedIn URL (optional)
3. Click **"Save Member"**

### Editing a Team Member

1. Click the **pencil (✏️)** icon on any member card
2. Update any fields
3. Click **"Update Member"**

### Deleting a Team Member

1. Click the **trash (🗑️)** icon
2. Confirm deletion in popup

---

## 10. Services & Form Edit

**Sidebar:** Services & Form Edit  
**What it manages:** The structure of inquiry forms on the website.

### Contact Form Fields

Edit what fields appear on the main Contact page form:
- Add new fields (text, email, tel, textarea, select/dropdown)
- Edit labels, placeholders
- Toggle Required on/off for each field
- Delete unused fields

**Save Button:** "Save Contact Form Fields"

### Service Inquiry Form Fields

Edit the additional fields that appear in Service Inquiry forms (e.g., "What is your website URL?", "What are your goals?"):

**Save Button:** "Save Service Inquiry Fields"

---

## 11. Contact Page Edit

**Sidebar:** Contact Page Edit  
**What it manages:** Office information shown on the Contact page.

### Editable Fields

- Primary Phone Number
- Secondary Phone Number
- Primary Email
- Secondary Email
- Office Address (full address text)
- Business Hours
- Google Maps Embed URL

**Save Button:** "Save Contact Details"

---

## 12. Gallery Page Edit

**Sidebar:** Gallery Page Edit  
**What it manages:** The portfolio / work gallery section.

### Adding a Gallery Item

1. Click **"Upload New Item"**
2. Upload an image (recommended: 1200×800px, JPG/PNG, under 3MB)
3. Fill in:
   - **Title** — Project name (e.g., "NSR Developers Campaign")
   - **Category** — e.g., `Google Ads`, `Meta Ads`, `SEO`, `Website`, `Branding`
   - **Description** — Brief project summary
4. Click **"Add to Gallery"**

### Deleting a Gallery Item

1. Click the **trash icon** on any gallery card
2. Confirm in popup

> Gallery items are filterable by category on the public website. Visitors can click category tabs to browse by type.

---

## 13. Footer & Terms Edit

**Sidebar:** Footer & Terms Edit  
**What it manages:** Footer content and the full Terms & Conditions page.

### Footer Tab

- **Footer Tagline** — Short phrase under the footer logo
- **Social Media Links** — Instagram, Facebook, LinkedIn, YouTube (full URLs)
- **Quick Links** — Footer navigation links and their URLs

**Save Button:** "Save Footer Info"

### Terms & Conditions Tab

Full section-by-section editor for the T&C page:

- Each section has a **Title** and **Content** (paragraph text)
- **Add** — Click "Add Section", fill in title and content
- **Edit** — Click pencil icon, update, save
- **Delete** — Click trash icon on any section

**Save Button:** "Save Terms & Conditions"

---

## 14. Tips & Best Practices

### Always Click Save

Every section has a dedicated **Save** button. Changes are **not** auto-saved. After clicking Save, data is synced to **Supabase** (cloud database) and becomes live on the website within a few seconds.

### Refresh If Changes Don't Appear

Click **"Refresh Page"** in the top-right corner of the admin panel. Or press `Ctrl + Shift + R` in your browser for a hard refresh.

### Image Upload Guidelines

| Setting | Recommendation |
|---|---|
| Max file size | 5 MB |
| Formats | JPG, PNG, WebP |
| Team photos | Square or portrait crop |
| Gallery images | Landscape 1200×800px |
| Brand logos | PNG with transparent background |

All images are stored in **Cloudinary** — they load fast globally via CDN.

### Icon Name Reference

For any field asking for an **Icon Name**, go to [https://lucide.dev/icons](https://lucide.dev/icons) and search for an icon. Copy the **exact camelCase name** shown below the icon.

Examples: `Globe`, `BarChart3`, `ShoppingCart`, `Heart`, `Users`, `Activity`, `Zap`, `Star`

### Date Filter Tips

On Dashboard Inquiries and Service Requests, use these filters:
- **Day** → Check if any new leads came in today
- **Month** → See this month's total inquiries for reporting
- **Year** → Annual summary of all inquiries

The stats cards (Total, New, Followed Up) update live based on the active filter.

### Security Checklist

- [ ] Never share admin username/password
- [ ] Log out after every session (sidebar → "Log Out Console")
- [ ] Do not edit `.env` files directly — contact your developer
- [ ] If you see a "Disconnected" status in top-right, check your internet connection

---

*This guide covers all features of the Digital Ads World Admin Panel as of June 2026.*
*For technical support, contact the development team.*
