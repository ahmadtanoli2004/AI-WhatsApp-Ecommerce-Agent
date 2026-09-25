export const mockCustomers = [
  {
    id: 'CUST-001',
    name: 'Sarah Khan',
    email: 'sarah.khan@example.com',
    whatsapp: '+92 300 1234567',
    avatar: 'SK',
    status: 'Active',
    joinedDate: '2025-03-15T08:00:00Z',
    lastActivity: '2026-09-24T13:10:00Z',
    ordersCount: 12,
    totalSpent: 85400,
    tags: ['VIP', 'Returning Customer', 'WhatsApp'],
    orders: [
      { id: 'ORD-10482', items: 3, total: 15400, status: 'Delivered', date: '2026-09-24T13:10:00Z' },
      { id: 'ORD-10255', items: 1, total: 4500, status: 'Delivered', date: '2026-08-15T10:00:00Z' }
    ],
    timeline: [
      { action: 'Received AI product recommendation', time: '2026-09-24T13:15:00Z' },
      { action: 'Placed order #ORD-10482', time: '2026-09-21T10:32:00Z' },
      { action: 'Started WhatsApp conversation', time: '2026-09-21T10:20:00Z' }
    ]
  },
  {
    id: 'CUST-002',
    name: 'Ahmed Ali',
    email: 'ahmed.ali@example.com',
    whatsapp: '+92 321 7654321',
    avatar: 'AA',
    status: 'Active',
    joinedDate: '2026-01-20T10:30:00Z',
    lastActivity: '2026-09-24T09:45:00Z',
    ordersCount: 4,
    totalSpent: 34000,
    tags: ['Returning Customer'],
    orders: [
      { id: 'ORD-10481', items: 2, total: 17000, status: 'Processing', date: '2026-09-24T09:45:00Z' }
    ],
    timeline: [
      { action: 'Placed order #ORD-10481', time: '2026-09-24T09:45:00Z' },
      { action: 'Updated delivery information', time: '2026-09-24T09:40:00Z' }
    ]
  },
  {
    id: 'CUST-003',
    name: 'Maria James',
    email: 'maria.james@example.com',
    whatsapp: '+92 333 9876543',
    avatar: 'MJ',
    status: 'Inactive',
    joinedDate: '2026-05-11T14:20:00Z',
    lastActivity: '2026-09-23T16:20:00Z',
    ordersCount: 1,
    totalSpent: 8500,
    tags: ['New Customer'],
    orders: [
      { id: 'ORD-10480', items: 1, total: 8500, status: 'Confirmed', date: '2026-09-23T16:20:00Z' }
    ],
    timeline: [
      { action: 'Placed order #ORD-10480', time: '2026-09-23T16:20:00Z' }
    ]
  },
  {
    id: 'CUST-004',
    name: 'Daniel Smith',
    email: 'daniel.smith@example.com',
    whatsapp: '+92 345 1122334',
    avatar: 'DS',
    status: 'Active',
    joinedDate: '2025-11-05T09:15:00Z',
    lastActivity: '2026-09-23T09:15:00Z',
    ordersCount: 24,
    totalSpent: 215000,
    tags: ['VIP', 'WhatsApp'],
    orders: [
      { id: 'ORD-10479', items: 3, total: 32000, status: 'Shipped', date: '2026-09-23T09:15:00Z' }
    ],
    timeline: [
      { action: 'Placed order #ORD-10479', time: '2026-09-23T09:15:00Z' }
    ]
  },
  {
    id: 'CUST-005',
    name: 'Jessica Taylor',
    email: 'jess.taylor@example.com',
    whatsapp: '+92 311 5556667',
    avatar: 'JT',
    status: 'Inactive',
    joinedDate: '2026-07-22T11:45:00Z',
    lastActivity: '2026-09-22T11:45:00Z',
    ordersCount: 0,
    totalSpent: 0,
    tags: [],
    orders: [
      { id: 'ORD-10478', items: 1, total: 4500, status: 'Cancelled', date: '2026-09-22T11:45:00Z' }
    ],
    timeline: [
      { action: 'Cancelled order #ORD-10478', time: '2026-09-22T12:05:00Z' }
    ]
  },
  {
    id: 'CUST-006',
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    whatsapp: '+92 301 9988776',
    avatar: 'MC',
    status: 'Active',
    joinedDate: '2026-02-14T14:20:00Z',
    lastActivity: '2026-09-21T14:20:00Z',
    ordersCount: 8,
    totalSpent: 85000,
    tags: ['Returning Customer'],
    orders: [
      { id: 'ORD-10477', items: 2, total: 28498, status: 'Delivered', date: '2026-09-21T14:20:00Z' }
    ],
    timeline: [
      { action: 'Placed order #ORD-10477', time: '2026-09-21T14:20:00Z' }
    ]
  }
];
