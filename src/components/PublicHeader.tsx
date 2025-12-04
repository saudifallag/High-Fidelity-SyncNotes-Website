'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Mail, Lock, Eye, EyeOff, Star, User } from 'lucide-react'

export function PublicHeader() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSignInOpen, setIsSignInOpen] = useState(false)
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleDemoSignIn = async () => {
        setIsLoading(true)
        try {
            const result = await signIn('credentials', {
                email: 'demo@syncnotes.com',
                password: 'demo12',
                redirect: false,
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
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
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
    )
}
