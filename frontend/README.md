# Real-Time Chat Application Frontend

A modern, real-time chat application frontend built with Next.js 15, React 19, and TypeScript. Designed to work with a Django backend using Django Channels for WebSocket communication.

## Features

- 🎨 Modern, dark-themed UI with sophisticated gradient design
- 💬 Real-time messaging interface
- 🔐 User authentication (login/signup)
- 🏠 Chat room lobby with public and private rooms
- 👥 Online user presence indicators
- 🔔 Real-time notifications system
- 👤 User profile and settings management
- 📱 Fully responsive design
- ⚡ Built with Next.js App Router and React Server Components
- 🌓 Dark/Light mode toggle

## Tech Stack

- **Framework:** Next.js 15
- **UI Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Data Fetching:** SWR
- **Date Formatting:** date-fns

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Django backend running (with Django Channels configured)
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd realtime-chat-frontend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Create environment variables:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your Django backend URLs:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
\`\`\`

5. Run the development server:
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
├── app/
│   ├── chat/[id]/          # Individual chat room pages
│   ├── lobby/              # Chat rooms lobby
│   ├── login/              # Login page
│   ├── signup/             # Signup page
│   ├── profile/            # User profile and settings
│   ├── notifications/      # Notifications page
│   ├── globals.css         # Global styles and design tokens
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   ├── navigation.tsx      # Main navigation component
│   ├── chat-message.tsx    # Chat message component
│   ├── user-avatar.tsx     # User avatar component
│   └── notification-badge.tsx
├── lib/
│   ├── types.ts            # TypeScript type definitions
│   ├── api.ts              # API utility functions
│   └── utils.ts            # Utility functions
└── hooks/
    └── use-websocket.ts    # WebSocket hook for real-time updates
\`\`\`

## Backend Integration

This frontend is designed to work with a Django backend. You'll need to implement the following API endpoints:

### REST API Endpoints

- `POST /api/auth/login/` - User login
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/logout/` - User logout
- `GET /api/rooms/` - Get all chat rooms
- `POST /api/rooms/` - Create a new room
- `GET /api/rooms/{id}/` - Get room details
- `GET /api/rooms/{id}/messages/` - Get room messages
- `GET /api/notifications/` - Get user notifications
- `GET /api/profile/` - Get user profile
- `PUT /api/profile/` - Update user profile

### WebSocket Endpoints

- `ws://your-backend/ws/chat/{room_id}/` - Chat room WebSocket connection

## Customization

### Design Tokens

The app uses CSS custom properties for theming. You can customize colors in `app/globals.css`:

\`\`\`css
@theme inline {
  --background: 220 15% 8%;
  --foreground: 220 10% 95%;
  --primary: 217 91% 60%;
  /* ... more tokens */
}
\`\`\`

### API Configuration

Update the API URLs in your `.env` file to point to your Django backend.

## Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License

**Crafted by Abdul Mubin**
