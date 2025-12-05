'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useModal } from '@/context/ModalContext'
import {
  Zap,
  Shield,
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
} from 'lucide-react'

export default function WelcomePage() {
  const router = useRouter()
  const { openModal } = useModal()
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleDemoSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        email: 'demo@syncnotes.com',
        password: 'demo12',
        redirect: false, // Handle redirect manually to catch errors
      })

      if (result?.error) {
        console.error('Login failed:', result.error)
        alert('Demo login failed. Please try again.')
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('An unexpected error occurred.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = async () => {
    // Basic validation
    const nameInput = document.getElementById('name') as HTMLInputElement
    const emailInput = document.getElementById('signup-email') as HTMLInputElement
    const passwordInput = document.getElementById('signup-password') as HTMLInputElement
    const confirmPasswordInput = document.getElementById('confirm-password') as HTMLInputElement

    if (!nameInput.value || !emailInput.value || !passwordInput.value) {
      alert('Please fill in all fields')
      return
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      alert('Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Signup failed')
      }

      // Auto sign in after signup
      await signIn('credentials', {
        email: emailInput.value,
        password: passwordInput.value,
        redirect: true,
        callbackUrl: '/dashboard'
      })
    } catch (error: any) {
      console.error('Signup error:', error)
      alert(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-teal-100 text-teal-800 hover:bg-teal-100">
            ✨ Organize your thoughts effortlessly
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Notes,
            <span className="text-teal-600"> Perfectly Synced</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the future of note-taking with SyncNotes. Organize, collaborate, and access your ideas from anywhere with our intelligent platform designed for modern learners and professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-lg px-8 py-3"
              onClick={() => setIsSignUpOpen(true)}
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-teal-200 text-teal-700 hover:bg-teal-50 text-lg px-8 py-3"
              onClick={handleDemoSignIn}
            >
              <Star className="mr-2 w-5 h-5" />
              Try Demo Account
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required • demo/demo12</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Stay Organized
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features that make note-taking effortless and enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openModal('features')}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Instant sync across all your devices. Your notes are always up-to-date whether you're on your phone, tablet, or computer.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openModal('features')}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Secure & Private</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Your data is encrypted end-to-end. We never share your information with third parties, ensuring complete privacy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => openModal('features')}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Collaborate Easily</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base">
                  Share notes with teammates, work on projects together, and keep everyone on the same page with real-time collaboration.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and upgrade as you grow
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card
              className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openModal('pricing')}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free</CardTitle>
                <div className="text-4xl font-bold">$0<span className="text-lg text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Up to 50 notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Basic formatting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>1 GB storage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="border-2 border-teal-500 shadow-xl relative cursor-pointer hover:shadow-2xl transition-shadow"
              onClick={() => openModal('pricing')}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-teal-600 text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Student</CardTitle>
                <div className="text-4xl font-bold">$5<span className="text-lg text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Unlimited notes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Advanced formatting</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>10 GB storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Collaboration tools</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card
              className="border-0 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => openModal('pricing')}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="text-4xl font-bold">$10<span className="text-lg text-gray-600">/month</span></div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Everything in Student</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Unlimited storage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-teal-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Note-Taking?
          </h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who've already made the switch to SyncNotes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-3"
              onClick={() => setIsSignUpOpen(true)}
            >
              Start Your Free Trial
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-teal-600 bg-white hover:bg-teal-600 hover:text-white text-lg px-8 py-3"
              onClick={handleDemoSignIn}
            >
              <Star className="mr-2 w-5 h-5" />
              Try Demo Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}