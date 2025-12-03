# Skybridge Travels

A hotel booking system for Cordova built with React, Express, and PostgreSQL. This is a mini capstone project.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Getting API Keys](#getting-api-keys)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

To verify installation, run:
```bash
node --version
npm --version
git --version
```

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/LourdenB15/SkyBridgeTravels101.git
   cd SkyBridgeTravels101
   ```

2. **Install Backend Dependencies**
   ```bash
   cd api
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../web
   npm install
   ```

## Getting API Keys

You'll need to sign up for these services and get API keys:

### 1. Clerk (Authentication)

1. Go to [https://clerk.com](https://clerk.com)
2. Click "Start building for free"
3. Sign up for a free account
4. Create a new application
5. Choose "Email" and "Google" as sign-in options (or your preference)
6. Go to "API Keys" in the left sidebar
7. Copy the following:
   - **Publishable Key** (starts with `pk_test_`)
   - **Secret Key** (starts with `sk_test_`)

### 2. Neon (PostgreSQL Database)

1. Go to [https://neon.tech](https://neon.tech)
2. Click "Sign up" and create a free account
3. Create a new project
4. Give it a name (e.g., "skybridge-travels")
5. Select a region close to you
6. Click "Create Project"
7. Copy the **Database URL** (Connection string)
   - It looks like: `postgresql://user:password@host/database?sslmode=require`

### 3. Xendit (Payment Processing)

1. Go to [https://dashboard.xendit.co/register](https://dashboard.xendit.co/register)
2. Sign up for a free account
3. Complete the registration process
4. Go to "Settings" → "Developers" → "API Keys"
5. Copy the following:
   - **Secret Key** (for test mode)
   - **Webhook Verification Token** (under Webhooks settings)

**Note:** Make sure you're using TEST mode keys for development.

## Environment Setup

### Backend Environment Variables

1. Navigate to the `api` folder:
   ```bash
   cd api
   ```

2. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and fill in your API keys:
   ```env
   DATABASE_URL=your_neon_database_url_here
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here
   CORS_ORIGIN=http://localhost:5173
   XENDIT_SECRET_KEY=your_xendit_secret_key_here
   XENDIT_WEBHOOK_TOKEN=your_xendit_webhook_token_here
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

### Frontend Environment Variables

1. Navigate to the `web` folder:
   ```bash
   cd ../web
   ```

2. Create a `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and fill in:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   VITE_API_URL=http://localhost:3000/api
   ```

   **Note:** Use the same Clerk Publishable Key from step 1.

## Running the Project

You need to run both the backend and frontend servers.

### Option 1: Using Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd api
npm run dev
```
The backend will start on [http://localhost:3000](http://localhost:3000)

**Terminal 2 - Frontend:**
```bash
cd web
npm run dev
```
The frontend will start on [http://localhost:5173](http://localhost:5173)

### Option 2: Using One Terminal (with split panes)

Most modern terminals support split panes (VS Code terminal, iTerm2, Windows Terminal, etc.)

### Accessing the Application

Open your browser and go to [http://localhost:5173](http://localhost:5173)

## Webhook Testing with ngrok

For testing payment webhooks from Xendit during local development, you need to expose your local backend to the internet using ngrok.

### Installing ngrok

1. Go to [https://ngrok.com](https://ngrok.com)
2. Sign up for a free account
3. Download ngrok for your operating system
4. Follow the installation instructions

### Setting up ngrok

**Terminal 3 - ngrok (keep this running alongside your backend):**
```bash
ngrok http 3000
```

This creates a secure tunnel to your local backend running on port 3000.

You'll see output like:
```
Forwarding  https://xxxx-xx-xxx-xx-xxx.ngrok-free.app -> http://localhost:3000
```

**Important:** The ngrok port (3000) must match your backend server port!

### Configuring Xendit Webhooks

1. Copy your ngrok URL (e.g., `https://xxxx-xx-xxx-xx-xxx.ngrok-free.app`)
2. Go to [Xendit Dashboard](https://dashboard.xendit.co) → Settings → Webhooks
3. Find the **"Invoices paid"** webhook under the INVOICES section
4. Set the webhook URL to:
   ```
   https://your-ngrok-url.ngrok-free.app/api/payments/webhook
   ```
5. Add a custom header:
   - Header name: `x-callback-token`
   - Header value: Your `XENDIT_WEBHOOK_TOKEN` from `api/.env`
6. Click "Test and save"

**Note:** Each time you restart ngrok, you get a new URL and need to update the Xendit webhook configuration.

## Getting Latest Updates

When the code is updated, pull the latest changes:

```bash
git pull origin main
```

After pulling updates, you may need to:

1. **Reinstall dependencies** (if packages were added/updated):
   ```bash
   cd api
   npm install

   cd ../web
   npm install
   ```

2. **Update the database** (if database schema changed):
   ```bash
   cd api
   npx prisma generate
   npx prisma migrate dev
   ```

3. **Restart both servers** to see the changes

## Project Structure

```
SkyBridgeTravels101/
├── api/                    # Backend (Express)
│   ├── controllers/        # HTTP request handlers
│   ├── middlewares/        # Auth, validation, error handling
│   ├── repositories/       # Database access layer
│   ├── routes/             # API route definitions
│   ├── services/           # Business logic
│   ├── utils/              # Helper functions
│   ├── prisma/             # Database schema & migrations
│   ├── app.js              # Express app setup
│   └── server.js           # Server entry point
│
└── web/                    # Frontend (React)
    └── src/
        ├── components/     # Reusable UI components
        ├── pages/          # Page components
        ├── hooks/          # Custom React hooks
        ├── lib/            # Utilities and helpers
        └── services/       # API service calls
```

## Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Authentication:** Clerk
- **Maps:** react-leaflet
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Neon)
- **ORM:** Prisma
- **Validation:** Zod
- **Payment:** Xendit

## Useful Commands

### Backend (api/)
```bash
npm run dev              # Start dev server with auto-reload
npm start                # Start production server
npx prisma studio        # Open database GUI
npx prisma migrate dev   # Create and apply migrations
npx prisma generate      # Regenerate Prisma client
```

### Frontend (web/)
```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build
```

## Troubleshooting

### Port Already in Use
If you get an error that port 3000 or 5173 is already in use:
- **Windows:** `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
- **Mac/Linux:** `lsof -ti:3000 | xargs kill`

### Database Connection Issues
- Make sure your DATABASE_URL in `api/.env` is correct
- Check that your Neon database is active
- Run `npx prisma generate` and `npx prisma migrate dev` again

### Clerk Authentication Issues
- Verify your Clerk keys are correct
- Make sure you're using the same Publishable Key in both `api/.env` and `web/.env`
- Check that your Clerk application is set to "Development" mode

### Module Not Found Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Webhook Not Receiving Payments
- Verify ngrok is running on the correct port (3000)
- Check that the ngrok URL matches what's configured in Xendit
- Ensure the `x-callback-token` header is set in Xendit webhook settings
- Test the webhook endpoint: `https://your-ngrok-url/api/payments/webhook/test`
- Check your backend terminal for webhook logs

### ngrok Connection Refused
- Make sure your backend server is running before starting ngrok
- Verify the port number: `ngrok http 3000` matches your backend port
- Check backend logs to confirm it's running on the expected port

## Getting Help

If you encounter any issues:
1. Check the error message carefully
2. Make sure all environment variables are set correctly
3. Verify all dependencies are installed (`npm install`)
4. Check that both servers are running
5. Reach out to the team for help

## License

This project is part of a capstone project.
