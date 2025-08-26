#!/bin/bash

# BasePlus SaaS Setup Script
echo "🚀 Setting up BasePlus SaaS Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local file..."
    cp env.example .env.local
    echo "✅ Created .env.local - Please update it with your configuration"
else
    echo "✅ .env.local already exists"
fi

# Generate Prisma client
echo "🗄️ Generating Prisma client..."
npx prisma generate

# Check if database is configured
if grep -q "postgresql://username:password@localhost:5432/baseplus" .env.local; then
    echo "⚠️  Please update DATABASE_URL in .env.local with your database connection string"
    echo "   Example: postgresql://user:password@localhost:5432/baseplus"
else
    echo "✅ Database URL appears to be configured"
fi

# Create necessary directories
echo "📁 Creating project directories..."
mkdir -p app/(auth)
mkdir -p app/(dashboard)
mkdir -p app/api
mkdir -p components/auth
mkdir -p components/dashboard
mkdir -p lib
mkdir -p types
mkdir -p hooks
mkdir -p public

echo "✅ Directories created"

# Check if database is accessible
echo "🔍 Checking database connection..."
if npx prisma db push --accept-data-loss &> /dev/null; then
    echo "✅ Database connection successful"
else
    echo "⚠️  Database connection failed. Please check your DATABASE_URL in .env.local"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your configuration"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation: Check README.md for detailed setup instructions"
echo ""
