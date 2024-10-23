'use client'

import { AlertCircle, ArrowUpRight, BarChart2, Bell, BookOpen, ChevronDown, Clock, HelpCircle, Home, Link2, MessageSquare, RefreshCcw, Search, Settings, Share2, Sliders, Zap } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function DashboardComponent() {
  return (
    <div className="flex h-screen bg-white text-sm">
      {/* Sidebar */}
      <aside className="w-56 bg-white p-4 flex flex-col border-r border-gray-200 overflow-y-auto">
        <div className="flex items-center mb-4">
          <span className="text-lg font-semibold">🌳 rootly</span>
          <Button variant="ghost" size="sm" className="ml-auto p-0">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
        <div className="mb-2">
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs mr-2">Slop</span>
            <ChevronDown className="h-3 w-3 ml-auto" />
          </Button>
        </div>
        <div className="mb-2">
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <Search className="mr-2 h-3 w-3" />
            Search
            <span className="ml-auto text-xs bg-gray-100 px-1 rounded">⌘ K</span>
          </Button>
        </div>
        <Button variant="secondary" className="w-full justify-start bg-purple-100 text-purple-700 hover:bg-purple-200 mb-4 text-sm py-1 px-2 h-auto">
          <Home className="mr-2 h-3 w-3" />
          Dashboard
        </Button>
        <div className="space-y-1 mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-1 px-2">RESPOND</p>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <AlertCircle className="mr-2 h-3 w-3" />
            Alerts
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <MessageSquare className="mr-2 h-3 w-3" />
            Incidents
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <Clock className="mr-2 h-3 w-3" />
            On-Call
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <Share2 className="mr-2 h-3 w-3" />
            Status Pages
          </Button>
        </div>
        <div className="space-y-1 mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-1 px-2">LEARN</p>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <BookOpen className="mr-2 h-3 w-3" />
            Retrospectives
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <Zap className="mr-2 h-3 w-3" />
            Follow-ups
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <BarChart2 className="mr-2 h-3 w-3" />
            Metrics
          </Button>
        </div>
        <div className="space-y-1 mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-1 px-2">MODIFY</p>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <Sliders className="mr-2 h-3 w-3" />
            Workflows
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <Settings className="mr-2 h-3 w-3" />
            Configuration
          </Button>
        </div>
        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm py-1 px-2 h-auto">
            <HelpCircle className="mr-2 h-3 w-3" />
            Help
            <ChevronDown className="ml-auto h-3 w-3" />
          </Button>
        </div>
        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white mt-4 text-sm py-2">
          Create Incident
        </Button>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Trial banner */}
        <div className="bg-yellow-50 border-b border-yellow-100 py-2 px-4">
          <div className="flex justify-between items-center max-w-7xl mx-auto text-xs">
            <p className="text-yellow-800">
              <span className="mr-2">⚠️</span>
              Your trial is ending in 14 days. Talk to sales to upgrade your account.
            </p>
            <Button variant="link" className="text-purple-600 hover:text-purple-700 font-medium p-0 h-auto">
              Talk to sales
              <span className="ml-1">×</span>
            </Button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold mr-3">
                JL
              </div>
              Good Afternoon, Jacob <span className="ml-2">👋</span>
            </h1>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input className="pl-8 h-8 text-sm" placeholder="Search incidents..." />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700 text-white h-8 text-sm">Create Incident</Button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex -space-x-2 overflow-hidden mb-3">
                  <Avatar className="border-2 border-white w-8 h-8">
                    <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-7eFyZS1rKkTHFJsqLGYzh6Zeld3nOJ.svg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white w-8 h-8">
                    <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-7eFyZS1rKkTHFJsqLGYzh6Zeld3nOJ.svg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Avatar className="border-2 border-white w-8 h-8">
                    <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-7eFyZS1rKkTHFJsqLGYzh6Zeld3nOJ.svg" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-semibold mb-2 text-sm">Ask our Reliability Advocates</h3>
                <p className="text-xs text-gray-500 mb-3">
                  We built incident response at Shopify, Twilio, and more before. Ask us how your process and culture stacks up.
                </p>
                <Button variant="outline" className="w-full text-xs h-8">Book a consultation</Button>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-7eFyZS1rKkTHFJsqLGYzh6Zeld3nOJ.svg" alt="Tutorial" className="mb-3 mx-auto h-16 w-16" />
                <h3 className="font-semibold mb-2 text-sm">Run tutorial incident</h3>
                <p className="text-xs text-gray-500 mb-3">
                  A hands-on tutorial in Slack that walks you through everything you need to know
                </p>
                <Button variant="outline" className="w-full text-xs h-8">Set up Slack</Button>
              </CardContent>
            </Card>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-7eFyZS1rKkTHFJsqLGYzh6Zeld3nOJ.svg" alt="Overview" className="mb-3 mx-auto h-16 w-16" />
                <h3 className="font-semibold mb-2 text-sm">Watch overview</h3>
                <p className="text-xs text-gray-500 mb-3">
                  3 min lightning overview and primer that shows you all the basics of Rootly.
                </p>
                <Button variant="outline" className="w-full text-xs h-8">Watch now</Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Incidents */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold flex items-center">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Active Incidents
                <span className="ml-2 text-xs font-normal text-gray-500">0</span>
                <RefreshCcw className="ml-2 h-3 w-3 text-gray-400" />
                <span className="ml-1 text-xs text-gray-400">Refreshes every 5s</span>
              </h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  Latest
                  <ChevronDown className="ml-1 h-3 w-3" />
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">All Incidents</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">My Incidents</Button>
              </div>
            </div>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/placeholder-7eFyZS1rKkTHFJsqLGYzh6Zeld3nOJ.svg" alt="No incidents" className="mb-3 h-24 w-24" />
                <p className="text-gray-500 text-sm">You don't have any active incidents. Good job!</p>
              </CardContent>
            </Card>
          </div>

          {/* Incident Insights */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-semibold">Incident Insights</h2>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-7 text-xs">All Incidents</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs">My Incidents</Button>
              </div>
            </div>
            <Card className="border border-gray-200 shadow-sm">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-sm">Activities</h3>
                  <div className="flex items-center space-x-4">
                    <h3 className="font-semibold text-sm">Trends</h3>
                    <Select defaultValue="oct2024">
                      <SelectTrigger className="w-[120px] h-7 text-xs">
                        <SelectValue placeholder="Select month" />
                      
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oct2024">Oct 2024</SelectItem>
                        <SelectItem value="sep2024">Sep 2024</SelectItem>
                        <SelectItem value="aug2024">Aug 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex-1 grid grid-cols-10 gap-0.5">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className="h-6 bg-gray-100 rounded-sm"></div>
                    ))}
                  </div>
                  <div className="w-48 ml-6">
                    <div className="mb-3">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-500">Incidents Created</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-2xl font-bold">0</p>
                      <p className="text-xs text-gray-500">Incidents Resolved</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">hh:mm:ss</p>
                      <p className="text-xs text-gray-500">Avg Resolution Time</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}