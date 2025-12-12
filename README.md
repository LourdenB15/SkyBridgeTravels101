# Skybridge Travels

A hotel booking system for Cordova, Cebu built with React, Express, and PostgreSQL. This is a mini capstone project.

## What is this app?

SkyBridge Travels is a hotel booking website where users can:
- **Search hotels** by location in Cordova, Cebu
- **View hotel details** including photos, amenities, and room options
- **Book rooms** by selecting check-in/check-out dates and number of guests
- **Pay online** via Xendit payment gateway (GCash, Maya, credit cards)
- **Manage bookings** - view booking history and cancel bookings
- **Create an account** with email/password authentication

## Features

| Feature | Description |
|---------|-------------|
| Hotel Search | Search by address, filter by dates and guests |
| Hotel Details | Photos, amenities, location map, room listings |
| Room Booking | Select dates, guest count, and room type |
| Online Payment | Xendit integration (GCash, Maya, cards) |
| User Auth | Register, login, logout, password reset via email |
| Booking History | View all bookings, check status, cancel bookings |
| Responsive Design | Works on desktop and mobile |

## Table of Contents

- [What is this app?](#what-is-this-app)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting API Keys](#getting-api-keys)
- [Environment Setup](#environment-setup)
- [Email Setup for Password Reset](#email-setup-for-password-reset-optional)
- [Database Setup](#database-setup)
- [Running the Project](#running-the-project)
- [Testing Payments with ngrok](#testing-payments-with-ngrok)
- [Project Structure](#project-structure)
- [Database Models](#database-models)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (v18 or higher) - Download the LTS version
- [Git](https://git-scm.com/) - For cloning the repository

### Verify Installation

Open a terminal (Command Prompt on Windows, Terminal on Mac) and run:
```bash
node --version
npm --version
git --version
```

You should see version numbers for each. If you get an error, install the missing software.

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/LourdenB15/SkyBridgeTravels101.git
cd SkyBridgeTravels101
```

### Step 2: Install Backend Dependencies

```bash
cd api
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../web
npm install
```

## Getting API Keys

You need to get API keys from two services: **Neon** (database) and **Xendit** (payments).

---

### 1. Neon Database (FREE)

Neon is a free PostgreSQL database in the cloud.

1. Go to [https://neon.tech](https://neon.tech)
2. Click **"Sign Up"** (you can use Google or GitHub)
3. Click **"Create a project"**
4. Enter a project name (e.g., "skybridge-travels")
5. Select the region closest to you (e.g., "Southeast Asia" for Philippines)
6. Click **"Create Project"**
7. On the dashboard, you'll see **"Connection string"**
8. Click the **copy button** next to the connection string
   - It looks like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`

**Save this connection string - you'll need it later!**

---

### 2. Xendit Payment Gateway (FREE for Testing)

Xendit handles payment processing.

1. Go to [https://dashboard.xendit.co/register](https://dashboard.xendit.co/register)
2. Fill in the registration form:
   - Email address
   - Password
   - Country: **Philippines**
   - Business type: Select any (for testing)
3. Verify your email
4. Once logged in, make sure you're in **TEST MODE** (toggle at the top of the dashboard)

**Getting the Secret Key:**
1. Go to **Settings** → **Developers** → **API Keys**
2. Find the **Secret Key** section
3. Click **"Generate secret key"** if there isn't one
4. Copy the secret key (starts with `xnd_development_`)

**Getting the Webhook Token:**
1. Go to **Settings** → **Developers** → **Webhooks**
2. Scroll down to find **"Webhook Verification Token"**
3. Copy this token

**Save both the Secret Key and Webhook Token!**

---

## Environment Setup

### Backend Environment (.env)

1. Navigate to the `api` folder:
   ```bash
   cd api
   ```

2. Create a `.env` file by copying the example:
   ```bash
   cp .env.example .env
   ```

   **On Windows (if cp doesn't work):**
   ```bash
   copy .env.example .env
   ```

3. Open the `.env` file in a text editor (VS Code, Notepad, etc.)

4. Fill in your values:
   ```env
   DATABASE_URL=paste_your_neon_connection_string_here
   CORS_ORIGIN=http://localhost:5173
   XENDIT_SECRET_KEY=paste_your_xendit_secret_key_here
   XENDIT_WEBHOOK_TOKEN=paste_your_xendit_webhook_token_here
   JWT_SECRET=any_random_string_here_make_it_long
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:5173
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=
   EMAIL_PASS=
   ```

   **Notes:**
   - `JWT_SECRET`: Type any random long string (e.g., "mysupersecretkey123xyz")
   - `EMAIL_USER` and `EMAIL_PASS`: See [Email Setup for Password Reset](#email-setup-for-password-reset) below

### Frontend Environment (.env)

1. Navigate to the `web` folder:
   ```bash
   cd ../web
   ```

2. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

   **On Windows:**
   ```bash
   copy .env.example .env
   ```

3. Open the `.env` file and verify it contains:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

### Email Setup for Password Reset (Optional)

The app uses Gmail with Nodemailer to send password reset emails. To enable this feature:

1. Create a Gmail account (or use an existing one)
2. Enable **2-Step Verification** on the Gmail account:
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click **"2-Step Verification"** and follow the steps
3. Generate an **App Password**:
   - After enabling 2-Step Verification, go back to Security settings
   - Click **"App passwords"** (or search for it)
   - Select app: **"Mail"**
   - Select device: **"Other"** → type "SkyBridge"
   - Click **"Generate"**
   - Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
4. Update your `api/.env`:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-character-app-password
   ```

**Note:** Remove spaces from the app password when pasting.

## Database Setup

This step creates the database tables.

1. Navigate to the `api` folder:
   ```bash
   cd api
   ```

2. Generate the Prisma client:
   ```bash
   npx prisma generate
   ```

3. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

   When prompted for a migration name, just press Enter or type a name like "init"

4. (Optional) Seed the database with sample data:
   ```bash
   npx prisma db seed
   ```

**Tip:** You can view your database using:
```bash
npx prisma studio
```
This opens a visual database editor in your browser.

## Running the Project

You need to run **two servers** at the same time: backend and frontend.

### Using VS Code (Recommended)

1. Open VS Code
2. Open the SkyBridgeTravels101 folder
3. Open a terminal (Terminal → New Terminal)
4. Split the terminal into two (click the split icon)

**Terminal 1 - Backend:**
```bash
cd api
npm run dev
```
You should see: `Server running on port 3000`

**Terminal 2 - Frontend:**
```bash
cd web
npm run dev
```
You should see a URL like: `http://localhost:5173`

### Open in Browser

Go to [http://localhost:5173](http://localhost:5173) in your browser.

You should see the SkyBridge Travels homepage!

## Testing Payments with ngrok

To test the payment flow, Xendit needs to send notifications to your computer. This requires ngrok.

### Step 1: Install ngrok

1. Go to [https://ngrok.com](https://ngrok.com)
2. Click **"Sign up for free"**
3. After signing up, go to **"Your Authtoken"** in the dashboard
4. Download ngrok for your operating system
5. Extract/install ngrok

**Add your authtoken (one-time setup):**
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN_HERE
```

### Step 2: Start ngrok

Open a **third terminal** and run:
```bash
ngrok http 3000
```

You'll see output like:
```
Forwarding  https://abc123.ngrok-free.app -> http://localhost:3000
```

**Copy the https URL** (e.g., `https://abc123.ngrok-free.app`)

### Step 3: Configure Xendit Webhook

1. Go to [Xendit Dashboard](https://dashboard.xendit.co)
2. Navigate to **Settings** → **Developers** → **Webhooks**
3. Scroll down to the **INVOICES** section
4. Find **"Invoices paid"** and enter your webhook URL:
   ```
   https://YOUR-NGROK-URL.ngrok-free.app/api/payments/webhook
   ```
   (Replace YOUR-NGROK-URL with your actual ngrok URL)
5. Check the box: **"Also notify my application when a payment has been received after expiry"**
6. Click the dropdown arrow (▼) to expand settings
7. Add a header:
   - **Header name:** `x-callback-token`
   - **Header value:** Your `XENDIT_WEBHOOK_TOKEN` from `api/.env`
8. Click **"Test and save"**

**Important:** Every time you restart ngrok, you get a new URL and must update Xendit!

## Project Structure

```
SkyBridgeTravels101/
├── api/                    # Backend (Express.js)
│   ├── controllers/        # Handle HTTP requests
│   ├── middlewares/        # Auth, validation
│   ├── repositories/       # Database queries
│   ├── routes/             # API endpoints
│   ├── services/           # Business logic
│   ├── prisma/             # Database schema
│   └── server.js           # Entry point
│
└── web/                    # Frontend (React)
    └── src/
        ├── components/     # UI components
        ├── pages/          # Page components
        ├── hooks/          # React hooks
        └── services/       # API calls
```

## Database Models

The app uses 4 database tables:

| Model | Description | Key Fields |
|-------|-------------|------------|
| **User** | Registered users | email, password, firstName, lastName |
| **Hotel** | Hotel listings | name, address, rating, images[], amenities[] |
| **Room** | Rooms in hotels | name, maxGuests, pricePerNight, images[] |
| **Booking** | User bookings | bookingRef (SKY-XXXXXX), dates, status, totalPrice |

**Relationships:**
- A Hotel has many Rooms
- A User has many Bookings
- A Booking belongs to a User, Hotel, and Room

## Useful Commands

### Backend (api/)
```bash
npm run dev              # Start dev server
npx prisma studio        # Visual database editor
npx prisma migrate dev   # Apply database changes
npx prisma db seed       # Add sample data
```

### Frontend (web/)
```bash
npm run dev              # Start dev server
npm run build            # Build for production
```

## Troubleshooting

### "Cannot connect to database"
- Check your `DATABASE_URL` in `api/.env`
- Make sure there are no extra spaces
- Verify your Neon database is active at [neon.tech](https://neon.tech)

### "Port 3000 already in use"
Another program is using port 3000. Close it or:
- **Windows:** Open Task Manager → End Node.js processes
- **Mac/Linux:** Run `lsof -ti:3000 | xargs kill`

### "Module not found" errors
Delete node_modules and reinstall:
```bash
cd api
rm -rf node_modules package-lock.json
npm install

cd ../web
rm -rf node_modules package-lock.json
npm install
```

On Windows, use:
```bash
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Payment not completing
- Make sure ngrok is running
- Check that Xendit webhook URL matches your ngrok URL
- Verify the `x-callback-token` header is set correctly
- Check the backend terminal for error messages

### "Invalid credentials" after payment
- Make sure you're logged in before starting the booking
- If cookies aren't working, try a different browser
- Some browsers block third-party cookies in incognito mode

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Payments:** Xendit
- **Maps:** Leaflet

## Getting Help

1. Check the error message carefully
2. Make sure all `.env` files are filled in correctly
3. Verify both servers are running
4. Ask your team for help!

## License

This project is part of a capstone project.
