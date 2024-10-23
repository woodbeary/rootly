'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { AlertCircle, X, Wand2, Loader2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect } from "react"
import { AnalyzeIncidentResponse } from "@/app/api/analyze-incident/types"
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

interface CreateIncidentModalProps {
  isOpen: boolean
  onClose: () => void
  onCreateIncident: (incident: IncidentData) => void
}

export interface IncidentData {
  id: string
  title: string
  summary: string
  severity: string
  type: string
  isPrivate: boolean
  status: 'active' | 'resolved'
  createdAt: Date
}

const severityOptions = [
  { value: 'sev1', label: 'SEV1 - Critical Impact' },
  { value: 'sev2', label: 'SEV2 - High Impact' },
  { value: 'sev3', label: 'SEV3 - Medium Impact' },
  { value: 'sev4', label: 'SEV4 - Low Impact' },
]

const incidentTypes = [
  { value: 'customer_facing', label: 'Customer Facing' },
  { value: 'internal', label: 'Internal' },
  { value: 'security', label: 'Security' },
  { value: 'infrastructure', label: 'Infrastructure' },
]

interface Check {
  id: string
  title: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  type: 'standard' | 'magic'
  result?: string
}

const standardChecks: Check[] = [
  {
    id: 'service-status',
    title: 'Service Status Check',
    status: 'pending',
    type: 'standard',
    result: 'All services operational'
  },
  {
    id: 'alerts',
    title: 'Recent Alerts Review',
    status: 'pending',
    type: 'standard',
    result: 'No critical alerts in the last hour'
  },
  {
    id: 'metrics',
    title: 'Performance Metrics Analysis',
    status: 'pending',
    type: 'standard',
    result: 'Response times within normal range'
  },
  {
    id: 'dependencies',
    title: 'Dependency Health Check',
    status: 'pending',
    type: 'standard',
    result: 'All dependencies responding normally'
  }
]

interface AnalysisState {
  isAnalyzing: boolean
  checks: Check[]
  isComplete: boolean
}

export function CreateIncidentModal({ isOpen, onClose, onCreateIncident }: CreateIncidentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    severity: '',
    type: '',
    isPrivate: false
  })
  
  const [analysis, setAnalysis] = useState<AnalysisState>({
    isAnalyzing: false,
    checks: standardChecks,
    isComplete: false
  })

  // Add a new state for confirmation
  const [showConfirmation, setShowConfirmation] = useState(false)

  // First, modify the analyzeIncident function to store the incident data
  const [pendingIncident, setPendingIncident] = useState<IncidentData | null>(null)

  // Move generateMagicChecks inside component
  const generateMagicChecks = (summary: string): Check[] => {
    const lowercaseSummary = summary.toLowerCase()
    
    if (lowercaseSummary.includes('database')) {
      return [
        {
          id: 'magic-1',
          title: 'Database Connection Analysis',
          status: 'completed' as const,
          type: 'magic' as const,
          result: 'Database connection pools showing increased latency'
        },
        {
          id: 'magic-2',
          title: 'Recent Database Operations',
          status: 'completed' as const,
          type: 'magic' as const,
          result: 'Spike in write operations detected 5 minutes ago'
        }
      ]
    }

    if (lowercaseSummary.includes('github') || lowercaseSummary.includes('deployment')) {
      return [
        {
          id: 'magic-1',
          title: 'Recent Deployment Analysis',
          status: 'completed' as const,
          type: 'magic' as const,
          result: 'Last deployment was 15 minutes ago to production'
        },
        {
          id: 'magic-2',
          title: 'GitHub Status Check',
          status: 'completed' as const,
          type: 'magic' as const,
          result: 'GitHub API reporting degraded performance'
        }
      ]
    }

    // Default magic checks if no specific keywords found
    return [
      {
        id: 'magic-1',
        title: 'System Health Analysis',
        status: 'completed' as const,
        type: 'magic' as const,
        result: 'No significant system anomalies detected'
      },
      {
        id: 'magic-2',
        title: 'Service Dependencies Check',
        status: 'completed' as const,
        type: 'magic' as const,
        result: 'All critical dependencies operating normally'
      }
    ]
  }

  // Move analyzeThroughAPI inside component
  const analyzeThroughAPI = async (incidentData: IncidentData) => {
    try {
      const response = await fetch('/api/analyze-incident', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(incidentData),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze incident')
      }

      const data: AnalyzeIncidentResponse = await response.json()
      return data.magicChecks
    } catch (error) {
      console.error('Error analyzing incident:', error)
      return generateMagicChecks(incidentData.summary)
    }
  }

  // Modify analyzeIncident function
  const analyzeIncident = async (incidentData: IncidentData) => {
    setPendingIncident(incidentData)
    setAnalysis(prev => ({
      ...prev,
      isAnalyzing: true,
      checks: standardChecks.map(check => ({
        ...check,
        status: 'running' as const
      }))
    }))

    // Run standard checks with delays
    for (let i = 0; i < standardChecks.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500))
      setAnalysis(prev => ({
        ...prev,
        checks: prev.checks.map((check, index) => 
          index === i ? { ...check, status: 'completed' as const } : check
        )
      }))
    }

    try {
      // Get AI checks
      const magicChecks = await analyzeThroughAPI(incidentData)
      console.log('Magic checks received:', magicChecks) // Debug log

      // Update analysis with both standard and magic checks
      setAnalysis(prev => ({
        ...prev,
        isAnalyzing: false,
        isComplete: true,
        checks: [
          ...prev.checks,
          ...magicChecks.map(check => ({
            ...check,
            status: 'completed' as const,
            type: 'magic' as const
          }))
        ]
      }))
    } catch (error) {
      console.error('Error getting magic checks:', error)
      // Fallback to standard checks only if AI fails
      setAnalysis(prev => ({
        ...prev,
        isAnalyzing: false,
        isComplete: true
      }))
    }

    setShowConfirmation(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const newIncident: IncidentData = {
      id: Math.random().toString(36).substring(7),
      ...formData,
      status: 'active',
      createdAt: new Date()
    }

    // Just start analysis, don't create incident yet
    await analyzeIncident(newIncident)
    // Remove: onCreateIncident(newIncident)
  }

  const handleClose = () => {
    // Reset everything on close
    setFormData({
      title: '',
      summary: '',
      severity: '',
      type: '',
      isPrivate: false
    })
    setAnalysis({
      isAnalyzing: false,
      checks: standardChecks,
      isComplete: false
    })
    onClose()
  }

  // Modify the view incident handler
  const handleViewIncident = () => {
    if (pendingIncident) {
      onCreateIncident(pendingIncident)
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[800px] p-0 flex flex-col max-h-[85vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <DialogTitle>New Incident Details</DialogTitle>
        </div>

        {/* Make the content section flex-grow and scrollable */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Warning banner */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-3 mb-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-800">
                  Is this related to an active incident?
                </p>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-800">
                  customers-001 database down
                </a>
              </div>
            </div>
          </div>

          {!analysis.isAnalyzing && !analysis.isComplete ? (
            // Show form when not analyzing and not complete
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="customers-001 database down" 
                    className="mt-1.5"
                    disabled={analysis.isAnalyzing}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                    placeholder="Briefly describe the impact of the incident"
                    className="mt-1.5 resize-none"
                    disabled={analysis.isAnalyzing}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, severity: value }))}
                    disabled={analysis.isAnalyzing}
                    required
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select severity level" />
                    </SelectTrigger>
                    <SelectContent>
                      {severityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="types">Types</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                    disabled={analysis.isAnalyzing}
                    required
                  >
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select incident types" />
                    </SelectTrigger>
                    <SelectContent>
                      {incidentTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="private" 
                      checked={formData.isPrivate}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPrivate: checked }))}
                      disabled={analysis.isAnalyzing}
                    />
                    <Label htmlFor="private">Is this a Private incident?</Label>
                  </div>
                  <p className="text-sm text-gray-500 mt-1.5">
                    Private incidents such as security vulnerabilities will create a private Slack channel and only accessible to users with private incident permissions.
                    <a href="#" className="text-purple-600 hover:text-purple-800 ml-1">
                      Configure roles and permissions
                    </a>
                  </p>
                </div>
              </div>
            </form>
          ) : (
            // Show analysis when analyzing or complete
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Wand2 className="h-4 w-4 text-purple-600" />
                Incident Analysis
              </h3>
              
              {/* Standard Checks */}
              <div className="space-y-2">
                {analysis.checks
                  .filter(check => check.type === 'standard')
                  .map((check) => (
                    <div key={check.id} className="bg-white p-2.5 rounded-lg border shadow-sm">
                      <div className="flex items-center gap-2">
                        {check.type === 'magic' && (
                          <Wand2 className="h-4 w-4 text-purple-600" />
                        )}
                        {check.status === 'running' ? (
                          <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                        ) : check.status === 'completed' ? (
                          check.result?.includes('error') || check.result?.includes('failed') ? (
                            <XCircle className="h-4 w-4 text-red-500" />
                          ) : check.result?.includes('warning') ? (
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          )
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className="text-sm">
                          {check.title}
                        </span>
                      </div>
                      {check.result && (
                        <p className="text-sm text-gray-600 mt-2 ml-6">
                          {check.result}
                        </p>
                      )}
                    </div>
                  ))}
              </div>

              {/* AI Magic Checks */}
              {analysis.checks.some(check => check.type === 'magic') && (
                <>
                  <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-gray-50 px-3 text-sm text-gray-500 flex items-center gap-2">
                        <Wand2 className="h-4 w-4 text-purple-600" />
                        AI-Powered Analysis
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {analysis.checks
                      .filter(check => check.type === 'magic')
                      .map((check) => (
                        <div key={check.id} className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-sm">
                          <div className="flex items-center gap-2">
                            {check.type === 'magic' && (
                              <Wand2 className="h-4 w-4 text-purple-600" />
                            )}
                            {check.status === 'running' ? (
                              <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                            ) : check.status === 'completed' ? (
                              check.result?.includes('error') || check.result?.includes('failed') ? (
                                <XCircle className="h-4 w-4 text-red-500" />
                              ) : check.result?.includes('warning') ? (
                                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 text-green-600" />
                              )
                            ) : (
                              <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            )}
                            <span className="text-sm">
                              {check.title}
                            </span>
                          </div>
                          {check.result && (
                            <p className="text-sm text-gray-600 mt-2 ml-6">
                              {check.result}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer - Always visible */}
        <div className="border-t p-4 bg-white mt-auto">
          {!analysis.isAnalyzing && !analysis.isComplete ? (
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Create Incident
              </Button>
            </div>
          ) : analysis.isComplete && (
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium">Would you like to proceed with creating this incident?</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Our analysis has completed. You can review the results above before proceeding.
                </p>
                <div className="mt-4 flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleViewIncident}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Create and View Incident
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
