'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  BookOpen,
  Zap,
  Shield,
  Users,
  CheckCircle2,
  Star,
  ArrowRight,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Database,
  Smartphone,
  FileText,
  Search,
  Tag,
  Share2,
  Download,
  Upload,
  Settings,
  HelpCircle,
  MessageSquare,
  Activity,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  LineChart,
  Rocket,
  Heart,
  Lightbulb,
  Cpu,
  Cloud,
  Lock as LockIcon,
  Key,
  Fingerprint,
  ShieldCheck,
  UserCheck,
  Bell,
  Calendar,
  Link,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function WelcomePage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeModal, setActiveModal] = useState<string | null>(null)
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

  const openModal = (modalType: string) => {
    setActiveModal(modalType)
    setCurrentSlide(0) // Reset to first slide when opening modal
  }

  const closeModal = () => {
    setActiveModal(null)
    setCurrentSlide(0)
  }

  const nextSlide = () => {
    if (activeModal === 'features') {
      setCurrentSlide((prev) => Math.min(prev + 1, featuresSlides.length - 1))
    } else if (activeModal === 'pricing') {
      setCurrentSlide((prev) => Math.min(prev + 1, pricingSlides.length - 1))
    } else if (activeModal === 'about') {
      setCurrentSlide((prev) => Math.min(prev + 1, aboutSlides.length - 1))
    } else if (activeModal === 'support') {
      setCurrentSlide((prev) => Math.min(prev + 1, supportSlides.length - 1))
    } else if (activeModal === 'security') {
      setCurrentSlide((prev) => Math.min(prev + 1, securitySlides.length - 1))
    }
  }

  const prevSlide = () => {
    if (activeModal === 'features') {
      setCurrentSlide((prev) => Math.max(prev - 1, 0))
    } else if (activeModal === 'pricing') {
      setCurrentSlide((prev) => Math.max(prev - 1, 0))
    } else if (activeModal === 'about') {
      setCurrentSlide((prev) => Math.max(prev - 1, 0))
    } else if (activeModal === 'support') {
      setCurrentSlide((prev) => Math.max(prev - 1, 0))
    } else if (activeModal === 'security') {
      setCurrentSlide((prev) => Math.max(prev - 1, 0))
    }
  }

  const featuresSlides = [
    {
      title: "Lightning Fast Sync",
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      content: "Experience real-time synchronization across all your devices. Your notes are instantly updated whether you're on your phone, tablet, or computer.",
      highlights: ["Real-time sync", "Cross-platform", "Instant updates", "Offline mode"]
    },
    {
      title: "Advanced Security",
      icon: <Shield className="w-12 h-12 text-blue-500" />,
      content: "Your data is protected with enterprise-grade encryption. We use AES-256 encryption for data at rest and TLS 1.3 for data in transit.",
      highlights: ["End-to-end encryption", "2FA authentication", "GDPR compliant", "Regular backups"]
    },
    {
      title: "Smart Collaboration",
      icon: <Users className="w-12 h-12 text-purple-500" />,
      content: "Work together seamlessly with your team. Share notes, leave comments, and track changes in real-time.",
      highlights: ["Real-time collaboration", "Version control", "Comments & mentions", "Team workspaces"]
    }
  ]

  const pricingSlides = [
    {
      title: "Free Plan",
      price: "$0/month",
      icon: <Star className="w-8 h-8 text-gray-500" />,
      features: [
        "Up to 50 notes",
        "Basic formatting",
        "1 GB storage",
        "Web access only",
        "Community support"
      ],
      description: "Perfect for personal use and trying out SyncNotes."
    },
    {
      title: "Student Plan",
      price: "$5/month",
      icon: <Award className="w-8 h-8 text-teal-500" />,
      features: [
        "Unlimited notes",
        "Advanced formatting",
        "10 GB storage",
        "Web & mobile access",
        "Priority support",
        "Collaboration tools",
        "Custom tags"
      ],
      description: "Ideal for students who need powerful note-taking features."
    },
    {
      title: "Pro Plan",
      price: "$10/month",
      icon: <Rocket className="w-8 h-8 text-purple-500" />,
      features: [
        "Everything in Student",
        "Unlimited storage",
        "Advanced analytics",
        "API access",
        "Team workspaces",
        "Custom integrations",
        "24/7 dedicated support",
        "Export to all formats"
      ],
      description: "For professionals and teams who need the complete SyncNotes experience."
    }
  ]

  const aboutSlides = [
    {
      title: "Our Mission",
      icon: <Target className="w-12 h-12 text-teal-500" />,
      content: "SyncNotes is designed to empower learners and professionals with a seamless, accessible note-taking experience. We believe that great tools should be intuitive, reliable, and available to everyone.",
      stats: [
        { label: "Active Users", value: "50K+" },
        { label: "Notes Created", value: "1M+" },
        { label: "Countries", value: "120+" }
      ]
    },
    {
      title: "Design Philosophy",
      icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
      content: "Our design is guided by three core principles: simplicity, accessibility, and consistency. We create tools that reduce cognitive load and enhance productivity.",
      principles: [
        "Usability First",
        "Accessible Design",
        "Consistent Experience",
        "Privacy by Default"
      ]
    },
    {
      title: "Technology Stack",
      icon: <Cpu className="w-12 h-12 text-blue-500" />,
      content: "Built with modern technologies to ensure reliability, performance, and scalability. Our infrastructure is designed to handle millions of notes with 99.9% uptime.",
      tech: [
        "React & Next.js",
        "TypeScript",
        "PostgreSQL",
        "AWS Infrastructure",
        "CDN Delivery"
      ]
    },
    {
      title: "Our Team",
      icon: <Users className="w-12 h-12 text-purple-500" />,
      content: "We're a diverse team of designers, developers, and educators passionate about creating tools that help people learn and work more effectively.",
      teamStats: [
        { label: "Team Members", value: "15+" },
        { label: "Years Experience", value: "50+" },
        { label: "Customer Satisfaction", value: "98%" }
      ]
    }
  ]

  const supportSlides = [
    {
      title: "Help Center",
      icon: <HelpCircle className="w-12 h-12 text-blue-500" />,
      content: "Find comprehensive guides, tutorials, and FAQs to help you get the most out of SyncNotes.",
      resources: [
        "Getting Started Guide",
        "Video Tutorials",
        "Best Practices",
        "Troubleshooting"
      ]
    },
    {
      title: "Contact Support",
      icon: <MessageSquare className="w-12 h-12 text-green-500" />,
      content: "Our support team is here to help you 24/7. Get in touch through multiple channels.",
      channels: [
        "Live Chat",
        "Email Support",
        "Phone Support",
        "Community Forum"
      ]
    }
  ]

  const securitySlides = [
    {
      title: "Enterprise-Grade Security",
      icon: <ShieldCheck className="w-12 h-12 text-green-500" />,
      content: "Your data is protected with industry-leading security measures. We use the same encryption standards as banks and government agencies.",
      features: [
        "AES-256 encryption at rest",
        "TLS 1.3 encryption in transit",
        "End-to-end encryption",
        "Zero-knowledge architecture"
      ]
    },
    {
      title: "Privacy & Compliance",
      icon: <LockIcon className="w-12 h-12 text-blue-500" />,
      content: "We are committed to protecting your privacy and complying with global data protection regulations.",
      compliance: [
        "GDPR compliant",
        "SOC 2 Type II certified",
        "Regular security audits",
        "Data processing agreements"
      ]
    },
    {
      title: "Authentication & Access",
      icon: <Fingerprint className="w-12 h-12 text-purple-500" />,
      content: "Multi-layered authentication ensures only you can access your notes.",
      auth: [
        "Two-factor authentication (2FA)",
        "Single sign-on (SSO)",
        "Biometric authentication",
        "Session management"
      ]
    }
  ]

  const renderModalContent = () => {
    switch (activeModal) {
      case 'features':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {featuresSlides[currentSlide].icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{featuresSlides[currentSlide].title}</h3>
              <p className="text-gray-600 mb-6">{featuresSlides[currentSlide].content}</p>
              <div className="grid grid-cols-2 gap-3">
                {featuresSlides[currentSlide].highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                {featuresSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                onClick={nextSlide}
                disabled={currentSlide === featuresSlides.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case 'pricing':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {pricingSlides[currentSlide].icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{pricingSlides[currentSlide].title}</h3>
              <div className="text-3xl font-bold text-teal-600 mb-4">{pricingSlides[currentSlide].price}</div>
              <p className="text-gray-600 mb-6">{pricingSlides[currentSlide].description}</p>
              <div className="space-y-2">
                {pricingSlides[currentSlide].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                {pricingSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                onClick={nextSlide}
                disabled={currentSlide === pricingSlides.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {aboutSlides[currentSlide].icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{aboutSlides[currentSlide].title}</h3>
              <p className="text-gray-600 mb-6">{aboutSlides[currentSlide].content}</p>
              {aboutSlides[currentSlide].stats && (
                <div className="grid grid-cols-3 gap-4">
                  {aboutSlides[currentSlide].stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-teal-600">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
              {aboutSlides[currentSlide].principles && (
                <div className="grid grid-cols-2 gap-3">
                  {aboutSlides[currentSlide].principles.map((principle, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              )}
              {aboutSlides[currentSlide].tech && (
                <div className="grid grid-cols-2 gap-3">
                  {aboutSlides[currentSlide].tech.map((tech, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Cpu className="w-4 h-4 text-blue-500" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              )}
              {aboutSlides[currentSlide].teamStats && (
                <div className="grid grid-cols-3 gap-4">
                  {aboutSlides[currentSlide].teamStats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{stat.value}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                {aboutSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                onClick={nextSlide}
                disabled={currentSlide === aboutSlides.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case 'support':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {supportSlides[currentSlide].icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{supportSlides[currentSlide].title}</h3>
              <p className="text-gray-600 mb-6">{supportSlides[currentSlide].content}</p>
              <div className="grid grid-cols-2 gap-3">
                {supportSlides[currentSlide].resources?.map((resource, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4 text-blue-500" />
                    <span>{resource}</span>
                  </div>
                ))}
                {supportSlides[currentSlide].channels?.map((channel, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <span>{channel}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                {supportSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                onClick={nextSlide}
                disabled={currentSlide === supportSlides.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case 'status':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Activity className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">All Systems Operational</span>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Services</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CDN</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authentication</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {securitySlides[currentSlide].icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{securitySlides[currentSlide].title}</h3>
              <p className="text-gray-600 mb-6">{securitySlides[currentSlide].content}</p>
              <div className="grid grid-cols-2 gap-3">
                {securitySlides[currentSlide].features?.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
                {securitySlides[currentSlide].compliance?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>{item}</span>
                  </div>
                ))}
                {securitySlides[currentSlide].auth?.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Fingerprint className="w-4 h-4 text-purple-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={prevSlide}
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                {securitySlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide ? 'bg-teal-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                onClick={nextSlide}
                disabled={currentSlide === securitySlides.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )

      case 'blog':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <FileText className="w-12 h-12 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Latest Blog Posts</h3>
              <div className="space-y-4 text-left">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">10 Tips for Effective Note-Taking</h4>
                  <p className="text-sm text-gray-600 mb-2">Learn how to take better notes with these proven strategies...</p>
                  <div className="text-xs text-gray-500">Published 2 days ago</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">The Future of Digital Note-Taking</h4>
                  <p className="text-sm text-gray-600 mb-2">Explore emerging trends and technologies in note-taking...</p>
                  <div className="text-xs text-gray-500">Published 1 week ago</div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Collaboration Best Practices</h4>
                  <p className="text-sm text-gray-600 mb-2">How to effectively collaborate on notes with your team...</p>
                  <div className="text-xs text-gray-500">Published 2 weeks ago</div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">SN</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">SyncNotes</span>
          </div>

          <div className="flex items-center gap-4">
            <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                  Sign In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="email" placeholder="Enter your email" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={handleDemoSignIn}>
                    Sign In
                  </Button>
                  <div className="text-center">
                    <Button
                      variant="outline"
                      className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                      onClick={handleDemoSignIn}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Try Demo Account (demo/demo12)
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
              <DialogTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Get Started
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">Create Account</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="name" placeholder="Enter your full name" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input id="signup-email" placeholder="Enter your email" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={handleSignUp}
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                  <div className="text-center">
                    <Button
                      variant="outline"
                      className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                      onClick={handleDemoSignIn}
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Try Demo Account Instead
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

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
                <div className="text-4xl font-bold">$3<span className="text-lg text-gray-600">/month</span></div>
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
                <div className="text-4xl font-bold">$9<span className="text-lg text-gray-600">/month</span></div>
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SN</span>
                </div>
                <span className="text-xl font-bold text-white">SyncNotes</span>
              </div>
              <p className="text-sm">
                The intelligent note-taking platform for modern learners and professionals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => openModal('features')} className="hover:text-white transition-colors">Features</button></li>
                <li><button onClick={() => openModal('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                <li><button onClick={() => openModal('security')} className="hover:text-white transition-colors">Security</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => openModal('about')} className="hover:text-white transition-colors">About</button></li>
                <li><button onClick={() => openModal('blog')} className="hover:text-white transition-colors">Blog</button></li>
                <li><button onClick={() => openModal('support')} className="hover:text-white transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => openModal('support')} className="hover:text-white transition-colors">Help Center</button></li>
                <li><button onClick={() => openModal('support')} className="hover:text-white transition-colors">FAQ</button></li>
                <li><button onClick={() => openModal('status')} className="hover:text-white transition-colors">Status</button></li>
              </ul>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-sm">
            <p>© 2025 SyncNotes. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Information Modal */}
      <Dialog open={!!activeModal} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold pr-8">
              {activeModal === 'features' && 'Features'}
              {activeModal === 'pricing' && 'Pricing Plans'}
              {activeModal === 'about' && 'About SyncNotes'}
              {activeModal === 'support' && 'Support & Help'}
              {activeModal === 'status' && 'System Status'}
              {activeModal === 'blog' && 'Blog & Updates'}
              {activeModal === 'security' && 'Security & Privacy'}
            </DialogTitle>
          </DialogHeader>
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          <ScrollArea className="max-h-[600px]">
            {renderModalContent()}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  )
}