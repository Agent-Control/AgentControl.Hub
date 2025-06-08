# AgentControl.Hub - Project Structure

This is a complete Human-in-the-Loop Oversight Platform built with React, TypeScript, Express.js, and WebSocket integration.

## Folder Structure

```
AgentControl-Hub-Local/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # UI components (will need shadcn/ui components)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── pages/          # Page components
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # React entry point
│   │   └── index.css       # Global styles
│   └── index.html          # HTML template
├── server/                 # Backend Express server
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes and WebSocket setup
│   ├── storage.ts          # In-memory storage with mock data
│   └── vite.ts             # Vite development server setup
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schemas and types
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── README.md               # Project documentation
├── LICENSE                 # MIT license
└── .gitignore              # Git ignore rules
```

## Key Features Implemented

1. **Real-time Dashboard**: Live escalation monitoring with WebSocket updates
2. **Mock Agent Escalations**: Four different agent types with realistic scenarios:
   - Payment Agent (high-risk transaction approval)
   - Fraud Detection (suspicious activity patterns)
   - Compliance Agent (policy clarification needs)
   - Trade Agent (large order execution approval)
3. **Interactive UI**: Risk-based filtering, SLA timers, action buttons
4. **Chat System**: Real-time communication with agents
5. **Professional Design**: Modern UI with shadcn/ui components

## Setup Instructions

1. Navigate to the project folder:
   ```bash
   cd AgentControl-Hub-Local
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Access the application at `http://localhost:5000`

## Missing Components

You'll need to copy the following from the original project:
- All shadcn/ui components from `client/src/components/ui/`
- Main page components: `dashboard.tsx`, `not-found.tsx`
- Hook implementations: `use-websocket.ts`, `use-toast.ts`
- Utility files: `queryClient.ts`, `utils.ts`
- CSS styling: `index.css` with custom color variables
- Additional configuration files: `tailwind.config.ts`, `postcss.config.js`, `components.json`

## Technology Stack

- **Frontend**: React 18, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: Express.js, WebSocket (ws library)
- **Build Tool**: Vite
- **Data Layer**: Drizzle ORM schemas (with in-memory storage)
- **Real-time**: WebSocket connections for live updates

## GitHub Repository Setup

This structure is ready for GitHub deployment at:
https://github.com/DhruvMiyani/AgentControl.Hub

The project demonstrates a complete Human-in-the-Loop oversight platform suitable for monitoring AI agents in production environments.