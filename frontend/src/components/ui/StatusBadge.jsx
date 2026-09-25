import './StatusBadge.css';

export default function StatusBadge({ status, type }) {
  // If type is not explicitly provided, infer it from the status text
  let badgeType = type;
  
  if (!badgeType) {
    const lowerStatus = status?.toLowerCase() || '';
    if (lowerStatus === 'active' || lowerStatus === 'delivered' || lowerStatus === 'in stock') {
      badgeType = 'success';
    } else if (lowerStatus === 'processing' || lowerStatus === 'low stock' || lowerStatus === 'draft') {
      badgeType = 'warning';
    } else if (lowerStatus === 'inactive' || lowerStatus === 'out of stock' || lowerStatus === 'cancelled') {
      badgeType = 'danger';
    } else if (lowerStatus === 'shipped') {
      badgeType = 'info';
    } else {
      badgeType = 'neutral';
    }
  }

  return (
    <span className={`badge badge-${badgeType}`}>
      {status}
    </span>
  );
}
