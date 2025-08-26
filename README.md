# BasePlus - Modern SaaS Platform

A modern, scalable SaaS platform built for solo developers with everything you need to launch your product quickly.

## 🚀 Features

- **Authentication** - NextAuth.js with social login (Google, GitHub)
- **Database** - PostgreSQL with Prisma ORM
- **Payments** - Stripe integration for subscriptions
- **UI/UX** - Modern design with Tailwind CSS and shadcn/ui
- **Type Safety** - Full TypeScript support
- **Team Management** - Organization and role-based access
- **Analytics** - Usage tracking and monitoring
- **Deployment** - Optimized for Vercel

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **State Management**: TanStack Query, Zustand
- **Deployment**: Vercel
- **Monitoring**: Sentry (optional)

## 📦 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account
- Google/GitHub OAuth apps (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd baseplus-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   - Database URL
   - NextAuth secret
   - OAuth provider credentials
   - Stripe keys

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── providers.tsx     # Context providers
├── lib/                  # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database utilities
│   ├── stripe.ts         # Stripe utilities
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔐 Authentication

The platform uses NextAuth.js for authentication with support for:

- Email/password authentication
- Google OAuth
- GitHub OAuth
- Magic links (email)

### Setting up OAuth providers

1. **Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

2. **GitHub OAuth**
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Create a new OAuth App
   - Add callback URL: `http://localhost:3000/api/auth/callback/github`

## 💳 Payments & Subscriptions

Stripe integration is included for handling:

- Subscription management
- Payment processing
- Usage-based billing
- Webhook handling

### Setting up Stripe

1. Create a [Stripe account](https://stripe.com)
2. Get your API keys from the dashboard
3. Set up webhook endpoints for subscription events
4. Configure your products and pricing plans

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set these in your production environment:

- `DATABASE_URL` - Production database URL
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Strong secret key
- `STRIPE_SECRET_KEY` - Production Stripe key
- `STRIPE_WEBHOOK_SECRET` - Webhook secret

## 📊 Monitoring & Analytics

### Error Tracking

Optional Sentry integration for error monitoring:

1. Create a Sentry account
2. Add your DSN to environment variables
3. Errors will be automatically tracked

### Usage Analytics

Built-in usage tracking for:
- User activity
- Feature usage
- Subscription metrics
- Performance monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Documentation: [docs.baseplus.com](https://docs.baseplus.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)
- Discord: [Join our community](https://discord.gg/baseplus)

## 🎯 Roadmap

- [ ] Multi-tenant support
- [ ] Advanced analytics dashboard
- [ ] API rate limiting
- [ ] Email templates
- [ ] Mobile app
- [ ] White-label solution
- [ ] Advanced billing features
- [ ] Integration marketplace

---

Built with ❤️ for solo developers
