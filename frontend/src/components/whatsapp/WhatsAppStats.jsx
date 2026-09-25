import { MessageSquare, ArrowDownLeft, Bot, AlertTriangle } from 'lucide-react';
import StatCard from '../dashboard/StatCard';

export default function WhatsAppStats({ stats }) {
  if (!stats) return null;

  return (
    <div className="dashboard-grid stat-cards-grid">
      <StatCard 
        title="Messages Today" 
        value={stats.messagesToday} 
        change="+12%" 
        isPositive={true} 
        icon={MessageSquare} 
      />
      <StatCard 
        title="Incoming Messages" 
        value={stats.incomingMessages} 
        change="+8%" 
        isPositive={true} 
        icon={ArrowDownLeft} 
      />
      <StatCard 
        title="AI Responses" 
        value={stats.aiResponses} 
        change="+15%" 
        isPositive={true} 
        icon={Bot} 
      />
      <StatCard 
        title="Failed Messages" 
        value={stats.failedMessages} 
        change="-2%" 
        isPositive={true} 
        icon={AlertTriangle} 
      />
    </div>
  );
}
