'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Clock, Star } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Welcome back, Student123</h1>
                    <p className="text-gray-600">Here's what's happening with your notes today.</p>
                </div>
                <Button className="bg-[#14b8a6] hover:bg-[#0f9688]">
                    <Plus className="w-4 h-4 mr-2" />
                    New Note
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-600">Total Notes</CardTitle>
                        <FileText className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">128</div>
                        <p className="text-xs text-gray-500">+4 from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-600">Recent Activity</CardTitle>
                        <Clock className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">12m</div>
                        <p className="text-xs text-gray-500">Average session time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium text-gray-600">Favorites</CardTitle>
                        <Star className="w-4 h-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-gray-900">12</div>
                        <p className="text-xs text-gray-500">Important notes</p>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Notes */}
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Notes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
                            <CardHeader>
                                <CardTitle className="text-base font-medium">Lecture Notes: Calculus {i}</CardTitle>
                                <p className="text-xs text-gray-500">Edited 2 hours ago</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    Today we covered derivatives and integrals. Key concepts include the chain rule and integration by parts...
                                </p>
                                <div className="mt-4 flex gap-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Math</span>
                                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">Study</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
