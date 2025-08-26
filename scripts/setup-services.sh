#!/bin/bash

# BasePlus SaaS - Service Setup Script
# This script helps you set up all the production services for your micro-SaaS

set -e

echo "🚀 BasePlus SaaS - Service Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.local exists
if [ ! -f .env.local ]; then
    print_warning ".env.local not found. Creating from template..."
    cp env.example .env.local
    print_success "Created .env.local from template"
fi

echo ""
print_status "Setting up production services..."
echo ""

# 1. Database Setup
echo "📊 Database Setup"
echo "-----------------"
print_status "Recommended: Neon (PostgreSQL)"
echo "Visit: https://neon.tech"
echo "Free tier: 3GB storage, 10GB transfer"
echo "After setup, update DATABASE_URL in .env.local"
echo ""

# 2. Redis Setup
echo "🔴 Redis Setup (Upstash)"
echo "------------------------"
print_status "Visit: https://upstash.com"
echo "Free tier: 10,000 requests/day"
echo "After setup, update UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN"
echo ""

# 3. Email Setup
echo "📧 Email Setup (Resend)"
echo "----------------------"
print_status "Visit: https://resend.com"
echo "Free tier: 3,000 emails/month"
echo "After setup, update RESEND_API_KEY"
echo ""

# 4. Analytics Setup
echo "📈 Analytics Setup"
echo "------------------"
print_status "Google Analytics: https://analytics.google.com"
echo "Create a new property and get your GA4 ID"
echo "Update NEXT_PUBLIC_GA_ID in .env.local"
echo ""

# 5. Error Tracking Setup
echo "🐛 Error Tracking Setup (Sentry)"
echo "--------------------------------"
print_status "Visit: https://sentry.io"
echo "Free tier: 5,000 errors/month"
echo "After setup, update SENTRY_DSN"
echo ""

# 6. Stripe Setup
echo "💳 Stripe Setup"
echo "---------------"
print_status "Visit: https://stripe.com"
echo "Get your API keys from the dashboard"
echo "Update STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY"
echo "Set up webhooks for subscription events"
echo ""

# 7. OAuth Setup
echo "🔐 OAuth Setup"
echo "--------------"
print_status "Google OAuth: https://console.cloud.google.com"
echo "GitHub OAuth: https://github.com/settings/developers"
echo "Update GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET"
echo "Update GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET"
echo ""

# 8. Deployment Setup
echo "🚀 Deployment Setup (Vercel)"
echo "----------------------------"
print_status "Visit: https://vercel.com"
echo "Connect your GitHub repository"
echo "Add all environment variables in Vercel dashboard"
echo ""

echo ""
print_status "Environment Variables Checklist:"
echo ""

# Check which variables are set
check_env_var() {
    local var_name=$1
    local description=$2
    
    if grep -q "^${var_name}=" .env.local; then
        local value=$(grep "^${var_name}=" .env.local | cut -d'=' -f2)
        if [ "$value" != "" ] && [ "$value" != "your-$(echo $var_name | tr '[:upper:]' '[:lower:]')" ]; then
            echo -e "  ${GREEN}✅${NC} $description"
        else
            echo -e "  ${YELLOW}⚠️${NC} $description (not configured)"
        fi
    else
        echo -e "  ${RED}❌${NC} $description (missing)"
    fi
}

check_env_var "DATABASE_URL" "Database URL"
check_env_var "NEXTAUTH_SECRET" "NextAuth Secret"
check_env_var "GOOGLE_CLIENT_ID" "Google OAuth Client ID"
check_env_var "GOOGLE_CLIENT_SECRET" "Google OAuth Client Secret"
check_env_var "GITHUB_CLIENT_ID" "GitHub OAuth Client ID"
check_env_var "GITHUB_CLIENT_SECRET" "GitHub OAuth Client Secret"
check_env_var "STRIPE_PUBLISHABLE_KEY" "Stripe Publishable Key"
check_env_var "STRIPE_SECRET_KEY" "Stripe Secret Key"
check_env_var "STRIPE_WEBHOOK_SECRET" "Stripe Webhook Secret"
check_env_var "UPSTASH_REDIS_REST_URL" "Upstash Redis URL"
check_env_var "UPSTASH_REDIS_REST_TOKEN" "Upstash Redis Token"
check_env_var "RESEND_API_KEY" "Resend API Key"
check_env_var "NEXT_PUBLIC_GA_ID" "Google Analytics ID"
check_env_var "SENTRY_DSN" "Sentry DSN"

echo ""
print_status "Next Steps:"
echo "1. Set up each service using the links above"
echo "2. Update .env.local with your credentials"
echo "3. Run: npm run db:push (to set up database)"
echo "4. Run: npm run dev (to test locally)"
echo "5. Deploy to Vercel"
echo ""

print_success "Setup script completed! 🎉"
echo ""
print_status "For detailed instructions, see DEPLOYMENT.md"
