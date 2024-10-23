import { Metadata } from 'next'
import { DashboardComponent } from '@/components/dashboard'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, you'd fetch the incident details here
  return {
    title: `Incident #${params.id} - Rootly`,
    description: `View and manage incident #${params.id} in Rootly's incident management platform.`,
    openGraph: {
      title: `Incident #${params.id} - Rootly`,
      description: `View and manage incident #${params.id} in Rootly's incident management platform.`,
    },
    twitter: {
      title: `Incident #${params.id} - Rootly`,
      description: `View and manage incident #${params.id} in Rootly's incident management platform.`,
    }
  }
}

export default function IncidentPage({params}: {params: {id: string}}) {
  return <DashboardComponent />
}
