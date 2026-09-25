// Dashboard Mock Data

export const statCardsData = [
  {
    id: 'orders',
    title: 'Total Orders',
    value: '1,248',
    change: '+12.5%',
    isPositive: true,
  },
  {
    id: 'revenue',
    title: 'Revenue',
    value: '$48,920',
    change: '+8.2%',
    isPositive: true,
  },
  {
    id: 'customers',
    title: 'Customers',
    value: '3,842',
    change: '+14.3%',
    isPositive: true,
  },
  {
    id: 'products',
    title: 'Products',
    value: '186',
    change: '+5.7%',
    isPositive: true,
  }
];

export const chartData30Days = [
  { name: '1', revenue: 1200, orders: 12 },
  { name: '5', revenue: 2100, orders: 20 },
  { name: '10', revenue: 1800, orders: 18 },
  { name: '15', revenue: 2800, orders: 25 },
  { name: '20', revenue: 2400, orders: 22 },
  { name: '25', revenue: 3200, orders: 30 },
  { name: '30', revenue: 3800, orders: 35 },
];

export const recentOrdersData = [
  {
    id: 'ORD-10482',
    customer: 'Sarah Khan',
    items: 3,
    total: 249.00,
    status: 'Delivered',
    date: 'Today, 10:42 AM'
  },
  {
    id: 'ORD-10481',
    customer: 'Ahmed Ali',
    items: 2,
    total: 129.50,
    status: 'Processing',
    date: 'Today, 09:15 AM'
  },
  {
    id: 'ORD-10480',
    customer: 'Maria James',
    items: 1,
    total: 89.00,
    status: 'Confirmed',
    date: 'Yesterday, 04:30 PM'
  },
  {
    id: 'ORD-10479',
    customer: 'David Chen',
    items: 4,
    total: 450.00,
    status: 'Shipped',
    date: 'Yesterday, 02:10 PM'
  }
];

export const aiActivityData = [
  {
    id: 1,
    action: 'AI recommended Wireless Headphones',
    time: '2 mins ago',
    type: 'recommendation'
  },
  {
    id: 2,
    action: 'AI answered a product question',
    time: '15 mins ago',
    type: 'inquiry'
  },
  {
    id: 3,
    action: 'AI assisted with order #ORD-10481',
    time: '1 hour ago',
    type: 'support'
  },
  {
    id: 4,
    action: 'AI handled customer inquiry',
    time: '3 hours ago',
    type: 'inquiry'
  },
  {
    id: 5,
    action: 'AI recommended products to a customer',
    time: '4 hours ago',
    type: 'recommendation'
  }
];

export const whatsappStatsData = {
  status: 'Connected',
  messagesToday: 328,
  aiResponses: 291,
  responseRate: '88.7%'
};
