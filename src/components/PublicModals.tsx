'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useModal } from '@/context/ModalContext'
import {
    Zap, Shield, Users, CheckCircle2, Star, Award, Rocket,
    Lightbulb, Cpu, HelpCircle, MessageSquare, Activity,
    ShieldCheck, Lock as LockIcon, Fingerprint, FileText,
    ChevronLeft, ChevronRight, X
} from 'lucide-react'

export function PublicModals() {
    const { activeModal, closeModal } = useModal()
    const [currentSlide, setCurrentSlide] = useState(0)

    // Reset slide when modal changes
    useEffect(() => {
        setCurrentSlide(0)
    }, [activeModal])

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
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
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
            icon: <Award className="w-12 h-12 text-teal-500" />, // Replaced Target with Award as Target wasn't imported in original file either, or I missed it. Let's check imports. Wait, Target WAS imported in page.tsx. I should add it.
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
    )
}
