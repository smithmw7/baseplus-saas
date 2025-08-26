# 🚀 BasePlus - Modern Micro-SaaS Platform

A production-ready SaaS platform built for solo developers with everything you need to launch your product quickly. Features Cursor integration for self-debugging capabilities.

[![CI/CD](https://github.com/smithmw7/baseplus-saas/actions/workflows/ci.yml/badge.svg)](https://github.com/smithmw7/baseplus-saas/actions/workflows/ci.yml)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/smithmw7/baseplus-saas)

## ✨ Features

- **🔐 Authentication** - NextAuth.js with social login (Google, GitHub)
- **💾 Database** - PostgreSQL with Prisma ORM
- **💳 Payments** - Stripe integration for subscriptions
- **🎨 UI/UX** - Modern design with Tailwind CSS and shadcn/ui
- **🔧 Type Safety** - Full TypeScript support
- **👥 Team Management** - Organization and role-based access
- **📊 Analytics** - Usage tracking and monitoring
- **🚀 Deployment** - Optimized for Vercel
- **🐛 Cursor Integration** - Self-debugging capabilities

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL, Prisma ORM
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **State Management**: TanStack Query, Zustand
- **Caching**: Upstash Redis
- **Email**: Resend
- **Analytics**: Vercel Analytics
- **Error Tracking**: Sentry
- **Deployment**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Stripe account
- GitHub account (for OAuth)

### 1. Clone the Repository

```bash
git clone https://github.com/smithmw7/baseplus-saas.git
cd baseplus-saas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:
- Database URL
- NextAuth secret
- OAuth provider credentials
- Stripe keys
- Redis configuration
- Email service

### 4. Set Up the Database

```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   ├── debug/            # Cursor debug components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── providers.tsx     # Context providers
├── lib/                  # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Database utilities
│   ├── stripe.ts         # Stripe utilities
│   ├── redis.ts          # Redis utilities
│   ├── email.ts          # Email utilities
│   ├── analytics.ts      # Analytics utilities
│   ├── cursor-debug.ts   # Cursor integration
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
├── prisma/               # Database schema and migrations
├── scripts/              # Setup and utility scripts
└── public/               # Static assets
```

## 🐛 Cursor Integration

This project includes Cursor integration for self-debugging capabilities:

### Features
- **Real-time monitoring** - Debug panel shows live logs
- **Error detection** - Automatic error capture and analysis
- **Context awareness** - Cursor understands your app state
- **Auto-fixing** - Cursor can fix common issues
- **Performance tracking** - Monitor bottlenecks

### Setup
1. Add the debug panel to your app layout
2. Expose debug data globally for Cursor
3. Start development server
4. Cursor can now monitor and debug your app

See [MICRO-SAAS-GUIDE.md](./MICRO-SAAS-GUIDE.md) for detailed instructions.

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

1. Fork this repository
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/smithmw7/baseplus-saas)

### Environment Variables for Production

Make sure to set these in your production environment:

- `DATABASE_URL` - Production database URL
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - Strong secret key
- `STRIPE_SECRET_KEY` - Production Stripe key
- `STRIPE_WEBHOOK_SECRET` - Webhook secret
- `UPSTASH_REDIS_REST_URL` - Redis URL
- `UPSTASH_REDIS_REST_TOKEN` - Redis token
- `RESEND_API_KEY` - Email service key

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
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [MICRO-SAAS-GUIDE.md](./MICRO-SAAS-GUIDE.md)
- **Deployment Guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Issues**: [GitHub Issues](https://github.com/smithmw7/baseplus-saas/issues)
- **Discussions**: [GitHub Discussions](https://github.com/smithmw7/baseplus-saas/discussions)

## 🎯 Roadmap

- [ ] Multi-tenant support
- [ ] Advanced analytics dashboard
- [ ] API rate limiting
- [ ] Email templates
- [ ] Mobile app
- [ ] White-label solution
- [ ] Advanced billing features
- [ ] Integration marketplace

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=smithmw7/baseplus-saas&type=Date)](https://star-history.com/#smithmw7/baseplus-saas&Date)

---

Built with ❤️ for solo developers

**Give it a ⭐ if this project helped you!**
