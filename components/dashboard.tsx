'use client'

import { AlertCircle, ArrowUpRight, BarChart2, Bell, BookOpen, ChevronDown, Clock, HelpCircle, Home, Link2, MessageSquare, RefreshCcw, Search, Settings, Share2, Sliders, Zap, PanelLeftClose, User, LogOut, ChevronRight, MoreHorizontal, Download, Calendar } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreateIncidentModal } from "@/components/create-incident-modal"
import { useState } from "react"
import { IncidentData } from "./create-incident-modal"
import { format } from "date-fns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function DashboardComponent() {
  const [incidents, setIncidents] = useState<IncidentData[]>([])
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  // Add this new component
  const IncidentView = ({ incident }: { incident: IncidentData }) => {
    return (
      <div className="space-y-6">
        {/* Breadcrumb and Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedIncidentId(null)}
              className="text-sm p-0 h-auto hover:bg-transparent"
            >
              Home
            </Button>
            <span>/</span>
            <span>Incidents</span>
            <span>/</span>
            <span className="text-gray-900">{incident.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-sm">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Active
            </Button>
            <Button variant="outline" className="text-sm">
              Edit
            </Button>
            <Button variant="outline" className="text-sm p-2">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="text-sm p-2">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title and ID */}
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">{incident.title}</h1>
          <span className="text-sm text-gray-500">#{incident.id.slice(0, 4)}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Timeline and Details */}
          <div className="col-span-2 space-y-6">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex gap-6">
                {['Timeline', 'Tasks', 'Follow-ups', 'Status Page', 'Retrospective'].map((tab) => (
                  <Button
                    key={tab}
                    variant="ghost"
                    className={`relative h-10 rounded-none font-normal ${
                      tab === 'Timeline' ? 'text-purple-600 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-purple-600' : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </div>

            {/* Timeline Content */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Switch id="systemEvents" />
                  <Label htmlFor="systemEvents">Include System Events</Label>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Timeline Events */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>JL</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">
                        <span className="font-medium">Jacob Lopez</span> created this incident
                      </p>
                      <time className="text-sm text-gray-500">
                        {format(incident.createdAt, "MMM d h:mm:ss a 'PDT'")}
                      </time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Metadata */}
          <div className="space-y-6">
            {/* Severity */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Severity</span>
              <Button variant="outline" size="sm" className="text-xs">
                + Add Severity
              </Button>
            </div>

            {/* Started At */}
            <div>
              <span className="text-sm font-medium">Started At</span>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {format(incident.createdAt, "MMM d 'at' h:mm a")}
                </span>
              </div>
            </div>

            {/* Time elapsed */}
            <div>
              <span className="text-sm font-medium">Time elapsed</span>
              <p className="text-sm mt-1">11s</p>
            </div>

            {/* Types */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Types</span>
              <Button variant="outline" size="sm" className="text-xs">
                + Add Type
              </Button>
            </div>

            {/* Services */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Services</span>
              <Button variant="outline" size="sm" className="text-xs">
                + Add Service
              </Button>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Teams</span>
              <Button variant="outline" size="sm" className="text-xs">
                + Add Team
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Update the click handler in ActiveIncidentsContent
  const handleIncidentClick = (incidentId: string) => {
    setSelectedIncidentId(incidentId)
  }

  // Add the ActiveIncidentsContent component inside DashboardComponent
  const ActiveIncidentsContent = () => {
    if (incidents.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <img 
            src="/6.svg" 
            alt="No incidents" 
            className="mb-3 h-24 w-24" 
          />
          <p className="text-gray-500 text-sm">You don't have any active incidents. Good job!</p>
        </div>
      )
    }

    return (
      <div className="divide-y">
        {incidents.map((incident) => (
          <div 
            key={incident.id} 
            className="p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => handleIncidentClick(incident.id)}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-sm">{incident.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{incident.summary}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {incident.severity.toUpperCase()}
                  </span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {incident.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    Created {format(incident.createdAt, 'MMM d, h:mm a')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar - hide on mobile, show on lg screens */}
      <aside className={`hidden lg:flex flex-col border-r border-gray-200 bg-white transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-56'}`}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-6">
            {!isSidebarCollapsed ? (
              <Image 
                src="/logo_rootly.svg" 
                alt="Rootly" 
                width={100} 
                height={28} 
                className="flex-shrink-0"
              />
            ) : (
              <Image 
                src="/logo_rootly.svg" 
                alt="Rootly" 
                width={28} 
                height={28} 
                className="flex-shrink-0"
              />
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto p-0 h-6 w-6"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            >
              <PanelLeftClose className={`h-4 w-4 transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {/* Rest of the sidebar content - wrap in a conditional render */}
          {!isSidebarCollapsed ? (
            // Existing sidebar content
            <div className="space-y-4">
              <div className="space-y-1">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                      <span className="bg-gray-100 text-gray-600 py-0.5 px-2 rounded text-xs mr-2">Slop</span>
                      <ChevronRight className="h-3 w-3 ml-auto" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Organization Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-500">
                      jacob@slop.codes
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Account Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                  <span className="ml-auto text-xs bg-gray-100 px-1.5 py-0.5 rounded">⌘ K</span>
                </Button>

                <Button variant="secondary" className="w-full justify-start bg-purple-100 text-purple-700 hover:bg-purple-200 text-sm h-9">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 mb-2 px-2">RESPOND</p>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Alerts
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Incidents
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <Clock className="mr-2 h-4 w-4" />
                  On-Call
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <Share2 className="mr-2 h-4 w-4" />
                  Status Pages
                </Button>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 mb-2 px-2">LEARN</p>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Retrospectives
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <Zap className="mr-2 h-4 w-4" />
                  Follow-ups
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Metrics
                </Button>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 mb-2 px-2">MODIFY</p>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <Sliders className="mr-2 h-4 w-4" />
                  Workflows
                </Button>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuration
                </Button>
              </div>
            </div>
          ) : (
            // Collapsed version with only icons
            <div className="space-y-4">
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-center text-gray-700 text-sm h-9">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="secondary" className="w-full justify-center bg-purple-100 text-purple-700 hover:bg-purple-200 text-sm h-9">
                  <Home className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-gray-500 mb-2 text-center">•••</p>
                <Button variant="ghost" className="w-full justify-center text-gray-700 text-sm h-9">
                  <AlertCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-center text-gray-700 text-sm h-9">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-center text-gray-700 text-sm h-9">
                  <Clock className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="w-full justify-center text-gray-700 text-sm h-9">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Add similar collapsed versions for other sections */}
            </div>
          )}
        </div>

        {/* Sticky bottom section - also conditional */}
        <div className="sticky bottom-0 p-4 border-t border-gray-200 bg-white mt-auto">
          <div className="space-y-4">
            {!isSidebarCollapsed ? (
              <>
                <Button variant="ghost" className="w-full justify-start text-gray-700 text-sm h-9">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
                
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm h-9"
                  onClick={() => setIsCreateModalOpen(true)}
                >
                  Create Incident
                </Button>
              </>
            ) : (
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm h-9 p-0"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Zap className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Trial banner */}
        <div className="bg-yellow-50 border-b border-yellow-100 py-2.5">
          <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center text-xs">
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

        {/* Main content area */}
        <div className="container mx-auto px-4 lg:px-8 py-6">
          {selectedIncidentId ? (
            // Show incident view when an incident is selected
            <IncidentView 
              incident={incidents.find(i => i.id === selectedIncidentId)!} 
            />
          ) : (
            // Show normal dashboard content
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
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
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white h-8 text-sm"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    Create Incident
                  </Button>
                </div>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center min-h-[320px]">
                    <div className="flex justify-center -space-x-2 overflow-hidden mb-4">
                      <Avatar className="border-2 border-white w-10 h-10">
                        <AvatarImage src="/1.svg" />
                        <AvatarFallback>1</AvatarFallback>
                      </Avatar>
                      <Avatar className="border-2 border-white w-10 h-10">
                        <AvatarImage src="/2.svg" />
                        <AvatarFallback>2</AvatarFallback>
                      </Avatar>
                      <Avatar className="border-2 border-white w-10 h-10">
                        <AvatarImage src="/3.svg" />
                        <AvatarFallback>3</AvatarFallback>
                      </Avatar>
                    </div>
                    <h3 className="font-semibold mb-3 text-lg text-center">Ask our Reliability Advocates</h3>
                    <p className="text-gray-600 mb-6 text-center leading-relaxed flex-grow">
                      We built incident response at Shopify, Twilio, and more before. Ask us how your process and culture stacks up.
                    </p>
                    <Button variant="outline" className="w-full">Book a consultation</Button>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center min-h-[320px]">
                    <div className="bg-purple-50 rounded-lg p-4 w-20 h-20 mb-4 flex items-center justify-center">
                      <img src="/4.svg" alt="Tutorial" className="w-12 h-12" />
                    </div>
                    <h3 className="font-semibold mb-3 text-lg text-center">Run tutorial incident</h3>
                    <p className="text-gray-600 mb-6 text-center leading-relaxed flex-grow">
                      A hands-on tutorial in Slack that walks you through everything you need to know
                    </p>
                    <Button variant="outline" className="w-full">Set up Slack</Button>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-6 flex flex-col items-center min-h-[320px]">
                    <div className="bg-purple-50 rounded-lg p-4 w-20 h-20 mb-4 flex items-center justify-center">
                      <img src="/5.svg" alt="Overview" className="w-12 h-12" />
                    </div>
                    <h3 className="font-semibold mb-3 text-lg text-center">Watch overview</h3>
                    <p className="text-gray-600 mb-6 text-center leading-relaxed flex-grow">
                      3 min lightning overview and primer that shows you all the basics of Rootly.
                    </p>
                    <Button variant="outline" className="w-full">Watch now</Button>
                  </CardContent>
                </Card>
              </div>

              {/* Active Incidents */}
              <div className="mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <h2 className="text-base font-semibold flex items-center">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    Active Incidents
                    <span className="ml-2 text-xs font-normal text-gray-500">{incidents.length}</span>
                    <RefreshCcw className="ml-2 h-3 w-3 text-gray-400" />
                    <span className="ml-1 text-xs text-gray-400">Refreshes every 5s</span>
                  </h2>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="h-8 text-xs font-medium">
                      Latest
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-medium">All Incidents</Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs font-medium">My Incidents</Button>
                  </div>
                </div>
                <Card className="border border-gray-200 shadow-sm">
                  <CardContent className="p-0">
                    <ActiveIncidentsContent />
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
            </>
          )}
        </div>
      </main>
      <CreateIncidentModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateIncident={(incident) => {
          setIncidents(prev => [...prev, incident])
          setSelectedIncidentId(incident.id)
          setIsCreateModalOpen(false)
        }}
      />
    </div>
  )
}
