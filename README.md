# StriveSync - Group Self-Development Challenge Platform

StriveSync is a modern web application designed to help users create, join, and track self-development challenges. Whether you're looking to build new habits, improve your skills, or achieve personal goals, StriveSync provides a social and gamified environment to keep you motivated and accountable.

## Features

- **Challenge Management**: Create and join challenges with customizable rules, durations, and categories
- **Progress Tracking**: Track your progress through challenges with visual indicators and statistics
- **Social Interaction**: Connect with friends, join team challenges, and share your achievements
- **Gamification**: Earn points, badges, and level up as you complete challenges
- **User Profiles**: Showcase your achievements and track your personal growth journey

## Tech Stack

- **Frontend**:
  - Next.js 14 with App Router
  - TypeScript
  - Tailwind CSS for styling
  - React Server Components for optimal performance
  - Radix UI for accessible component primitives

- **State Management**:
  - React Context API for local state
  - React Hook Form for form handling
  - Zod for schema validation

- **Backend**:
  - Spring Boot 3.2.2
  - Java 17
  - PostgreSQL for data persistence
  - Redis for caching
  - JWT for authentication
  - Hibernate/JPA for ORM
  - Flyway for database migrations

## Getting Started

### Prerequisites

- Node.js 18.0 or later
- npm or yarn
- Java 17 or later
- Maven 3.8 or later
- Docker and Docker Compose (for local database setup)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/strivesync.git
   cd strivesync
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the local database services:
   ```bash
   docker-compose up -d
   ```

4. Build and run the backend:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

5. Run the frontend development server:
   ```bash
   cd ..
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
strivesync/
├── backend/                # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/      # Java source code
│   │   │   └── resources/ # Configuration and migrations
│   │   └── test/          # Test files
│   ├── pom.xml            # Maven configuration
│   └── README.md          # Backend documentation
├── public/                # Static assets
├── src/                   # Frontend source code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable UI components
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── docker-compose.yml     # Docker Compose configuration
├── .gitignore
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Key Pages

- **Home**: Landing page with feature highlights and call-to-action
- **Dashboard**: User's personal dashboard with stats and active challenges
- **Challenges**: Browse and filter available challenges
- **Challenge Detail**: View specific challenge details and progress
- **Profile**: User profile with achievements and activity history
- **Authentication**: Login and registration pages

## API Documentation

Once the backend is running, you can access the API documentation at:

```
http://localhost:8080/api/swagger-ui.html
```

## Future Enhancements

- Integration with fitness tracking APIs
- Advanced analytics and insights
- Mobile application
- Community forums and discussion boards
- Challenge templates and recommendations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by habit-tracking and self-improvement communities
- Built with modern web development best practices
- Designed for optimal user experience and accessibility
