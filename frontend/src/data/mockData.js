export const mockProducts = [
  {
    id: 'p1',
    name: 'Wireless Noise-Canceling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 15499,
    currency: 'PKR',
    stock: 45,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'],
    status: 'Active',
    lastUpdated: '2023-10-24T10:30:00Z',
    bargainingEnabled: true,
    maxDiscount: 10,
    minimumSellingPrice: 13949,
    maxNegotiationAttempts: 3
  },
  {
    id: 'p2',
    name: 'Smart Fitness Watch',
    description: 'Track your health, sleep, and workouts with this sleek smartwatch.',
    price: 8500,
    currency: 'PKR',
    stock: 8,
    category: 'Wearables',
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'],
    status: 'Active',
    lastUpdated: '2023-10-23T14:15:00Z',
    bargainingEnabled: false
  },
  {
    id: 'p3',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable mesh chair with lumbar support, perfect for long working hours.',
    price: 32000,
    currency: 'PKR',
    stock: 0,
    category: 'Furniture',
    images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80'],
    status: 'Inactive',
    lastUpdated: '2023-10-20T09:00:00Z'
  },
  {
    id: 'p4',
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with tactile switches for gamers and typists.',
    price: 12999,
    currency: 'PKR',
    stock: 60,
    category: 'Electronics',
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'],
    status: 'Active',
    lastUpdated: '2023-10-25T11:45:00Z'
  },
  {
    id: 'p5',
    name: 'Organic Skincare Set',
    description: 'Complete 3-step routine made from 100% natural ingredients.',
    price: 4500,
    currency: 'PKR',
    stock: 12,
    category: 'Beauty',
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80'],
    status: 'Draft',
    lastUpdated: '2023-10-25T16:20:00Z'
  }
];

export const mockAgentStats = {
  totalInteractions: 1248,
  activeConversations: 12,
  avgResponseTime: '1.2s',
  salesConverted: 84
};

export const mockConversations = [
  {
    id: 'c1',
    customer: 'Sarah Khan',
    lastMessage: 'Can you give me this headphones for Rs. 13,000?',
    status: 'active',
    timestamp: '2 mins ago',
    messages: [
      { id: 100, sender: 'customer', type: 'text', text: 'Can you give me this headphones for Rs. 13,000?', timestamp: '2026-09-24T10:15:00Z' },
      { id: 101, sender: 'ai', type: 'bargain_offer', text: 'The lowest available price for this product is Rs. 13,949. I can offer it to you for Rs. 13,949.', timestamp: '2026-09-24T10:15:05Z', metadata: { originalPrice: 15499, customerOffer: 13000, minimumPrice: 13949, aiOffer: 13949 } }
    ]
  },
  {
    id: 'c2',
    customer: 'Ahmed Ali',
    lastMessage: 'Voice Message (0:04)',
    status: 'resolved',
    timestamp: '1 hour ago',
    messages: [
      { id: 200, sender: 'customer', type: 'voice', duration: '0:04', transcript: 'Mujhe smart watch ka price bata dein.', timestamp: '2026-09-24T09:10:00Z' },
      { id: 201, sender: 'ai', type: 'text', text: 'The Smart Fitness Watch is available for Rs. 8,500.', timestamp: '2026-09-24T09:10:15Z' }
    ]
  }
];
