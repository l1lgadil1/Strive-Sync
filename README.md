# StriveSync - Self-Improvement Challenges Platform

StriveSync is a gamified self-improvement platform that helps users create and participate in challenges across multiple life dimensions, track their progress, and connect with like-minded individuals.

## Features

- **Challenge Creation & Discovery**: Create custom challenges or join existing ones across various categories (fitness, learning, mindfulness, etc.)
- **Progress Tracking**: Track your daily progress and visualize your improvement over time
- **Social Interaction**: Connect with other participants, share experiences, and motivate each other
- **Gamification**: Earn points, badges, and achievements as you complete challenges
- **Analytics**: Get insights into your habits and progress with detailed analytics

## Tech Stack

### Frontend
- **Framework**: Next.js with TypeScript
- **UI Libraries**: Material UI, Framer Motion
- **State Management**: Zustand, React Context
- **Data Fetching**: TanStack React Query
- **Form Validation**: Zod

### Backend (Planned)
- **Framework**: Spring Boot (Java)
- **Database**: PostgreSQL
- **Authentication**: JWT
- **API**: RESTful
- **Caching**: Redis

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/strivesync.git
cd strivesync
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                  # Next.js App Router pages and layouts
├── components/
│   ├── ui/               # Reusable UI components
│   ├── features/         # Feature-specific components
│   ├── layout/           # Layout components
│   └── forms/            # Form components
├── lib/
│   ├── api/              # API client and services
│   ├── utils/            # Utility functions
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand stores
│   ├── constants/        # Application constants
│   └── validations/      # Form validation schemas
├── providers/            # Context providers
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Material UI](https://mui.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)
- [TanStack React Query](https://tanstack.com/query/latest) 

Add changes that we made for future CursorAI agents: What we have now, files,components,their location, their fetaures, what they responsible for, ...etc needed