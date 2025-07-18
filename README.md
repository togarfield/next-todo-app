# Todo App

A modern, full-stack todo application built with Next.js 15, Supabase, and Prisma. Features user authentication, real-time data synchronization, and a clean, responsive UI.

## ✨ Features

- **User Authentication**: Secure sign-up and sign-in with Supabase Auth
- **Todo Management**: Create, read, update, and delete todos
- **Real-time Updates**: Instant synchronization across sessions
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Type Safety**: Full TypeScript support with Zod validation
- **Modern UI**: Clean interface with Lucide React icons
- **Server Components**: Optimized performance with Next.js App Router

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS v4
- **UI Components**: Custom components with Lucide React icons
- **Form Handling**: React Hook Form with Zod validation
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   
   # Database
   DATABASE_URL="your_database_url"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push database schema
   npm run db:push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── auth/            # Authentication pages
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Home page
│   └── components/          # React components
│       ├── auth/            # Authentication components
│       ├── layout/          # Layout components
│       ├── todo/            # Todo-related components
│       └── ui/              # Reusable UI components
├── lib/
│   ├── actions/             # Server actions
│   ├── supabase/            # Supabase client configuration
│   ├── validations/         # Zod schemas
│   ├── prisma.ts            # Prisma client
│   └── utils.ts             # Utility functions
├── prisma/
│   └── schema.prisma        # Database schema
├── middleware.ts            # Next.js middleware
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema to Supabase
- `npm run db:studio` - Open Prisma Studio

## 🗄️ Database Schema

The application uses a simple schema with the following main entities:

- **Users**: Managed by Supabase Auth
- **Todos**: User-specific todo items with title, description, completion status, and timestamps

## 🔐 Authentication Flow

1. Users can sign up with email and password
2. Email verification is handled by Supabase
3. Authenticated users can access the todo dashboard
4. Session management is handled automatically
5. Protected routes redirect unauthenticated users to sign-in

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on desktop and mobile
- **Loading States**: Smooth loading indicators for better UX
- **Form Validation**: Real-time validation with helpful error messages
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Modern Styling**: Clean, minimalist design with Tailwind CSS

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page
2. Create a new issue with detailed information
3. Refer to the [Next.js Documentation](https://nextjs.org/docs)
4. Check [Supabase Documentation](https://supabase.com/docs)

---

**Happy coding! 🎉**