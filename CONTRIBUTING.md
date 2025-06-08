# Contributing to AgentControl.Hub

Thank you for your interest in contributing to AgentControl.Hub! This document provides guidelines for contributing to the project.

## Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AgentControl.Hub.git
   cd AgentControl.Hub
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
AgentControl.Hub/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and configs
│   │   └── pages/        # Page components
├── server/               # Backend Express server
├── shared/               # Shared types and schemas
├── components.json       # shadcn/ui configuration
└── package.json
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code formatting (Prettier configuration)
- Use meaningful variable and function names
- Add comments for complex logic
- Follow React hooks best practices

## Component Guidelines

- Use functional components with hooks
- Implement proper TypeScript types
- Use shadcn/ui components when possible
- Follow the established design system

## API Guidelines

- Use proper HTTP status codes
- Implement input validation with Zod schemas
- Handle errors gracefully
- Follow RESTful conventions

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test both happy path and error scenarios

## Pull Request Process

1. Create a feature branch from main:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes
3. Commit with descriptive messages:
   ```bash
   git commit -m "feat: add real-time notification system"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Create a Pull Request on GitHub

## Commit Message Format

Use conventional commits format:
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation updates
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## Issues

When creating issues:
- Use descriptive titles
- Provide steps to reproduce for bugs
- Include screenshots for UI issues
- Label appropriately (bug, feature, enhancement)

## Questions?

Feel free to open an issue for any questions about contributing to the project.