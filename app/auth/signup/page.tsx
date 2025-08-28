'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSupabase } from '@/components/providers/supabase-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Zap, Github, Mail } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signUp, signInWithGitHub } = useSupabase()

  const handleDemoSignUp = () => {
    setIsLoading(true)
    // Simulate loading
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000)
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    setIsLoading(true)
    
    try {
      const { error } = await signUp(formData.email, formData.password, formData.name)

      if (error) {
        console.error('Signup error:', error)
        alert(error.message)
        setIsLoading(false)
        return
      }

      // Show success message and redirect to signin
      alert('Account created successfully! Please check your email to verify your account.')
      router.push('/auth/signin?message=Account created successfully. Please check your email.')
    } catch (error) {
      console.error('Signup error:', error)
      alert('Failed to create account')
      setIsLoading(false)
    }
  }

  const handleGitHubSignUp = async () => {
    setIsLoading(true)
    try {
      const { error } = await signInWithGitHub()
      if (error) {
        console.error('GitHub signup error:', error)
        alert(error.message)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('GitHub signup error:', error)
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Get started with BasePlus today
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Demo Sign Up */}
          <Button 
            onClick={handleDemoSignUp} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating account...' : '🚀 Try Demo Dashboard'}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleGitHubSignUp} disabled={isLoading}>
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" disabled>
              <Mail className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>

          {/* Email Sign Up */}
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
