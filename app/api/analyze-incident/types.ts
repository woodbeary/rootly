export interface AnalyzeIncidentRequest {
  title: string
  summary: string
  severity: string
  type: string
}

export interface AnalyzeIncidentResponse {
  magicChecks: {
    id: string
    title: string
    status: 'completed'
    type: 'magic'
    result: string
  }[]
}
