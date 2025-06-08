# AgentControl.Hub

A Human-in-the-Loop Oversight Platform for real-time AI agent monitoring and intervention management.

## Overview

AgentControl.Hub provides a real-time dashboard for monitoring AI agents and managing escalations when agents require human intervention. The platform enables safe delegation of complex tasks by allowing agents to pause and escalate to human experts mid-task.

## Features

- **Real-time Escalation Dashboard** - Live monitoring of agent decisions requiring human oversight
- **Interactive Agent Communication** - Chat interface for real-time agent collaboration
- **Risk-based Filtering** - Filter escalations by risk level, agent type, and escalation reason
- **SLA Management** - Time-bound response tracking with visual countdown timers
- **WebSocket Integration** - Real-time updates without page refresh
- **Multi-Agent Support** - Support for various agent types (Payment, Fraud Detection, Compliance, Trading)

## Architecture

- **Frontend**: React with TypeScript, TailwindCSS, and shadcn/ui components
- **Backend**: Express.js with WebSocket support
- **Storage**: In-memory storage with mock data for demonstration
- **Real-time**: WebSocket connections for live updates

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/DhruvMiyani/AgentControl.Hub.git
cd AgentControl.Hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5000`

## Use Cases

### Payment Agent Review
An AI agent managing business spend control encounters a suspicious transaction and escalates for human review instead of making an autonomous decision.

### Fraud Detection
AI agents detect unusual patterns and request human verification before taking account protection measures.

### Compliance Monitoring
Agents identify policy edge cases requiring expert interpretation and guidance.

### Trading Decisions
High-value or volatile market conditions trigger escalations for expert trader review.

## API Endpoints

- `GET /api/escalations` - Retrieve all escalations
- `POST /api/escalations` - Create new escalation
- `PATCH /api/escalations/:id` - Update escalation status
- `GET /api/escalations/:id/messages` - Get chat messages
- `POST /api/escalations/:id/messages` - Send chat message

## WebSocket Events

- `new_escalation` - New escalation created
- `escalation_updated` - Escalation status changed
- `new_message` - New chat message received

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Contact

For questions or support, please open an issue on GitHub.