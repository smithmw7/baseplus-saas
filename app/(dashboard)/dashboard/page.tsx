'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CursorDebugPanel, useCursorDebug } from '@/components/debug/CursorDebugPanel'
import { debug } from '@/lib/cursor-debug'
import { useSupabase } from '@/components/providers/supabase-provider'
import { 
  Users, 
  CreditCard, 
  Activity, 
  Settings, 
  LogOut, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Zap,
  BarChart3,
  Calendar,
  Mail,
  Bell,
  Bug,
  User
} from 'lucide-react'

// Fake data
const fakeData = {
  user: {
    name: 'Demo User',
    email: 'demo@baseplus.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    plan: 'Pro',
    planStatus: 'active'
  },
  stats: {
    revenue: 2847,
    users: 1234,
    growth: 12.5,
    churn: 2.1
  },
  recentActivity: [
    { id: 1, type: 'subscription', message: 'New Pro subscription', time: '2 hours ago', amount: 29 },
    { id: 2, type: 'user', message: 'New user registered', time: '4 hours ago' },
    { id: 3, type: 'payment', message: 'Payment processed', time: '6 hours ago', amount: 99 },
    { id: 4, type: 'support', message: 'Support ticket resolved', time: '1 day ago' }
  ],
  teamMembers: [
    { id: 1, name: 'Alice Johnson', role: 'Admin', email: 'alice@company.com', status: 'active' },
    { id: 2, name: 'Bob Smith', role: 'Member', email: 'bob@company.com', status: 'active' },
    { id: 3, name: 'Carol Davis', role: 'Member', email: 'carol@company.com', status: 'pending' }
  ]
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const { isDebugVisible, toggleDebug } = useCursorDebug()
  const { user, session, loading, signOut } = useSupabase()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  // Debug logging
  useEffect(() => {
    if (user) {
      debug.info('Dashboard loaded', { user: user.email })
      debug.performance('dashboard-render', 150, { components: 4 })
    }
  }, [user])

  const handleTestError = () => {
    debug.error('Test error triggered by user', { action: 'test-error-button' })
  }

  const handleTestWarning = () => {
    debug.warn('Test warning triggered by user', { action: 'test-warning-button' })
  }

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // Show sign in prompt if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in</h1>
          <p className="text-muted-foreground mb-4">You need to be signed in to view the dashboard.</p>
          <Link href="/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">BasePlus</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDebug}
              className={`${isDebugVisible ? 'bg-primary/10 text-primary' : ''} hover:bg-primary/10 transition-colors relative`}
              title="Toggle Cursor Debug Panel"
            >
              <Bug className="h-4 w-4" />
              {isDebugVisible && (
                <div className="absolute -top-1 -right-1 h-2 w-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Mail className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              {user ? (
                <>
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium">{user.user_metadata?.name || 'User'}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-sm text-muted-foreground">Loading...</div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.user_metadata?.name || user?.email || 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your SaaS platform today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${fakeData.stats.revenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                +{fakeData.stats.growth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeData.stats.users.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                +8.2% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeData.stats.growth}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                +2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{fakeData.stats.churn}%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                -0.5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest events and transactions in your platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fakeData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                      {activity.amount && (
                        <Badge variant="secondary">${activity.amount}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Team Members</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>
                  Manage your team and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fakeData.teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                        {member.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common tasks and shortcuts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  <span className="text-sm">Invite Team</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <CreditCard className="h-6 w-6 mb-2" />
                  <span className="text-sm">Billing</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span className="text-sm">Analytics</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col">
                  <Settings className="h-6 w-6 mb-2" />
                  <span className="text-sm">Settings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Debug Testing Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Debug Testing</CardTitle>
              <CardDescription>
                Test the Cursor debug integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button onClick={handleTestError} variant="destructive">
                  Test Error
                </Button>
                <Button onClick={handleTestWarning} variant="outline">
                  Test Warning
                </Button>
                <Button onClick={() => debug.info('Test info message')} variant="outline">
                  Test Info
                </Button>
                <Button onClick={() => debug.performance('test-operation', 250)} variant="outline">
                  Test Performance
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Profile Card */}
        {user && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">{user.user_metadata?.name || 'User'}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        Member since {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/settings">
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Button>
                    </Link>
                    <Button variant="outline" size="sm">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Cursor Debug Panel - for general app debugging, errors, and performance monitoring */}
      <CursorDebugPanel isVisible={isDebugVisible} onClose={toggleDebug} />
    </div>
  )
}
