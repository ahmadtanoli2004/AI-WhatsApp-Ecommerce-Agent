import { MessageSquare, Zap, Target, Clock } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

export default function AiPerformanceCards({ performance }) {
  if (!performance) return null;

  return (
    <div className="dashboard-grid stat-cards-grid">
      <StatCard 
        title="Conversations Handled" 
        value={performance.conversationsHandled} 
        change="+14%" 
        isPositive={true} 
        icon={MessageSquare} 
      />
      <StatCard 
        title="AI Responses" 
        value={performance.aiResponses} 
        change="+22%" 
        isPositive={true} 
        icon={Zap} 
      />
      <StatCard 
        title="Resolution Rate" 
        value={performance.resolutionRate} 
        change="+1.2%" 
        isPositive={true} 
        icon={Target} 
      />
      <StatCard 
        title="Avg. Response Time" 
        value={performance.avgResponseTime} 
        change="-0.3s" 
        isPositive={true} 
        icon={Clock} 
      />
    </div>
  );
}
