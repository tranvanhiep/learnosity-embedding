# Learnosity Activity Renderer - Next.js + React + TypeScript

A modern Next.js application to render Learnosity activities and assessments using the Author API and Items API.

## 🚀 Tech Stack

- **Next.js 14** with App Router
- **React 18** with Server Components
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Learnosity SDK** (Node.js) for secure authentication
- **UUID** for generating unique identifiers

## 📋 Features

- **Assessment Rendering**: Display assessments with predefined items using Learnosity Items API
- **Activity Editor**: Render activities by ID using Learnosity Author API in edit mode
- **Server-Side Authentication**: Secure API request signing via Next.js API routes
- **TypeScript**: Full type safety across the application
- **Responsive Design**: Modern UI with Tailwind CSS
- **Error Handling**: Comprehensive error states and loading indicators

## 📦 Prerequisites

- Node.js 18+
- npm or yarn
- Learnosity consumer key and secret

## 🛠️ Installation

1. **Clone or download the project**

```bash
cd learnosity-embedding
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Copy your existing `.env` file or create `.env.local`:

```bash
# Learnosity Credentials (server-side only)
LEARNOSITY_CONSUMER_KEY=your_consumer_key_here
LEARNOSITY_CONSUMER_SECRET=your_consumer_secret_here

# User Configuration
USER_ID=demos-site
USER_EMAIL=demo@example.com
USER_FIRSTNAME=Demo
USER_LASTNAME=User

# API URLs (server-side)
AUTHOR_API_URL=https://authorapi.learnosity.com/?latest-lts

# Public API URLs (client-side accessible)
NEXT_PUBLIC_AUTHOR_API_URL=https://authorapi.learnosity.com/?latest-lts
NEXT_PUBLIC_ITEMS_API_URL=https://items.learnosity.com/?latest-lts
```

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
```

## 📖 Usage

### Home Page (`/`)
- Overview of available endpoints
- Links to assessment and activity pages
- Tech stack information

### Assessment Page (`/assess`)
- Renders a predefined assessment with multiple items
- Uses Learnosity Items API
- Includes time limits and navigation controls

**URL:** `http://localhost:3000/assess`

### Activity Page (`/activity`)
- Renders activities by ID using Author API
- Edit mode for activity management
- Dynamic activity loading via query parameter

**URL:** `http://localhost:3000/activity?id=ACTIVITY_ID`

**Example:**
```
http://localhost:3000/activity?id=quickstart_examples_activity_template_001
```

## 🏗️ Project Structure

```
.
├── app/
│   ├── api/
│   │   ├── assess/
│   │   │   └── route.ts         # Items API endpoint
│   │   └── activity/
│   │       └── route.ts         # Author API endpoint
│   ├── assess/
│   │   └── page.tsx             # Assessment page component
│   ├── activity/
│   │   └── page.tsx             # Activity page component
│   ├── page.tsx                 # Home page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── lib/
│   ├── config.ts                # Configuration loader
│   └── types.ts                 # TypeScript type definitions
├── public/                      # Static assets
├── .env.local                   # Environment variables (not in git)
├── .env.example                 # Environment template
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── package.json                 # Dependencies and scripts
```

## 🔒 API Routes

### `/api/assess`
- **Method:** GET
- **Purpose:** Generate signed request for Items API
- **Returns:** Security token, request object, and endpoint URL
- **Query Parameters:**
  - `user` (optional): Custom user ID

### `/api/activity`
- **Method:** GET
- **Purpose:** Generate signed request for Author API
- **Returns:** Security token, request object, and endpoint URL
- **Query Parameters:**
  - `id` (required): Activity reference ID

## 🎨 Styling

The application uses Tailwind CSS with a custom design:
- Gradient backgrounds
- Responsive cards and layouts
- Loading spinners and animations
- Error states with visual feedback
- Accessibility-focused design

## 🔧 Configuration

### TypeScript
Configured in `tsconfig.json` with:
- Strict type checking
- Path aliases (`@/` for root imports)
- Next.js specific settings

### Environment Variables
- Server-side variables: Used in API routes for secure operations
- Client-side variables: Prefixed with `NEXT_PUBLIC_` for browser access

## 🌐 Learnosity Integration

### Items API (Assessment)
- Renders complete assessments
- Uses predefined items array
- Supports time limits and navigation
- UUID-based session management

### Author API (Activity)
- Uses `activity_edit` mode
- Allows activity viewing and editing
- User information from environment variables
- Activity loaded by reference ID

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Build Errors
- Ensure all environment variables are set in `.env.local`
- Check TypeScript errors with `npm run build`
- Verify Node.js version is 18+

### Runtime Errors
- Verify Learnosity credentials are valid
- Check browser console for client-side errors
- Ensure API routes are accessible

### Learnosity Not Loading
- Verify NEXT_PUBLIC_* environment variables are set
- Check that Learnosity CDN is accessible
- Inspect network requests for failed script loading

## 📄 License

ISC

## 🤝 Contributing

This is a demo/learning project. Feel free to fork and modify for your needs.

## 🔗 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learnosity Developer Documentation](https://help.learnosity.com/hc/en-us/categories/360000082128-Developers)
- [Learnosity SDK GitHub](https://github.com/Learnosity/learnosity-sdk-nodejs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
