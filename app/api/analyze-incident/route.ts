import { GoogleGenerativeAI } from '@google/generative-ai'
import { AnalyzeIncidentRequest, AnalyzeIncidentResponse } from './types'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')

export async function POST(request: Request) {
  try {
    const body: AnalyzeIncidentRequest = await request.json()
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        temperature: 0.1,
        topP: 0.1,
        topK: 16,
      }
    })

    const prompt = `Analyze this incident report and generate relevant checks:
Title: ${body.title}
Summary: ${body.summary}
Severity: ${body.severity}
Type: ${body.type}

Based on this incident, generate exactly two specific technical checks that would be most relevant.
Focus on the specific context mentioned in the title and summary.

Format your response exactly like this, replacing the content in brackets:
magic-1|||[First check title]|||[First check detailed result]
magic-2|||[Second check title]|||[Second check detailed result]

Example for a database incident:
magic-1|||Database Connection Pool Analysis|||Connection pool at 85% capacity, 15ms average latency
magic-2|||Recent Database Operations|||Spike in write operations detected 5 minutes ago

Example for a deployment incident:
magic-1|||Recent Deployment Logs|||Last deployment failed with exit code 1 at 15:45
magic-2|||Infrastructure Health Check|||2 of 4 instances showing increased error rates`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()
    
    console.log('Raw AI response:', text) // Debug log

    const checks = text.split('\n')
      .filter(line => line.trim() && line.includes('|||'))
      .map(line => {
        const [id, title, result] = line.split('|||').map(s => s.trim())
        return {
          id,
          title,
          status: 'completed' as const,
          type: 'magic' as const,
          result
        }
      })

    console.log('Processed checks:', checks) // Debug log

    return Response.json({ magicChecks: checks })
  } catch (error) {
    console.error('Error analyzing incident:', error)
    return Response.json(
      { error: 'Failed to analyze incident' },
      { status: 500 }
    )
  }
}
