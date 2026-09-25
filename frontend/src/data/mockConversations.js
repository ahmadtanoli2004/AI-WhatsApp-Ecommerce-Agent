export const mockConversations = [
  {
    id: 'CONV-001',
    customerId: 'CUST-001',
    customerName: 'Sarah Khan',
    customerAvatar: 'SK',
    whatsapp: '+1 (555) 019-8123',
    status: 'online',
    mode: 'ai', // 'ai' or 'human'
    unreadCount: 0,
    lastMessage: 'Okay, I\'d like to order one.',
    lastMessageTime: '2026-09-24T13:10:00Z',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Hi, do you have the wireless headphones in black?',
        timestamp: '2026-09-24T13:05:00Z',
        type: 'text'
      },
      {
        id: 'm2',
        sender: 'ai',
        text: 'Yes, the Wireless Noise-Canceling Headphones are currently available in black. The current price is $299.99.',
        timestamp: '2026-09-24T13:05:05Z',
        type: 'text'
      },
      {
        id: 'm3',
        sender: 'customer',
        text: 'Can you tell me when it would arrive?',
        timestamp: '2026-09-24T13:08:00Z',
        type: 'text'
      },
      {
        id: 'm4',
        sender: 'ai',
        text: 'Standard delivery usually takes 3–5 business days.',
        timestamp: '2026-09-24T13:08:05Z',
        type: 'text'
      },
      {
        id: 'm5',
        sender: 'customer',
        text: 'Okay, I\'d like to order one.',
        timestamp: '2026-09-24T13:10:00Z',
        type: 'text'
      },
      {
        id: 'm6',
        sender: 'ai',
        text: 'Absolutely. I can help you with the next step. Would you like me to send a checkout link?',
        timestamp: '2026-09-24T13:10:05Z',
        type: 'text'
      }
    ]
  },
  {
    id: 'CONV-002',
    customerId: 'CUST-002',
    customerName: 'Ahmed Ali',
    customerAvatar: 'AA',
    whatsapp: '+1 (555) 023-4567',
    status: 'online',
    mode: 'human',
    unreadCount: 1,
    lastMessage: 'Where is my order?',
    lastMessageTime: '2026-09-24T13:20:00Z',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Where is my order?',
        timestamp: '2026-09-24T13:20:00Z',
        type: 'text'
      }
    ]
  },
  {
    id: 'CONV-003',
    customerId: 'CUST-003',
    customerName: 'Maria James',
    customerAvatar: 'MJ',
    whatsapp: '+1 (555) 089-9111',
    status: 'offline',
    mode: 'ai',
    unreadCount: 0,
    lastMessage: 'Can I change my delivery address?',
    lastMessageTime: '2026-09-24T12:50:00Z',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Can I change my delivery address?',
        timestamp: '2026-09-24T12:50:00Z',
        type: 'text'
      },
      {
        id: 'm2',
        sender: 'ai',
        text: 'I can help with that. Could you please provide the new address?',
        timestamp: '2026-09-24T12:50:05Z',
        type: 'text'
      }
    ]
  },
  {
    id: 'CONV-004',
    customerId: 'CUST-004',
    customerName: 'Daniel Smith',
    customerAvatar: 'DS',
    whatsapp: '+1 (555) 076-1234',
    status: 'offline',
    mode: 'ai',
    unreadCount: 0,
    lastMessage: 'Thanks!',
    lastMessageTime: '2026-09-23T10:15:00Z',
    messages: [
      {
        id: 'm1',
        sender: 'customer',
        text: 'Do you offer bulk discounts?',
        timestamp: '2026-09-23T10:10:00Z',
        type: 'text'
      },
      {
        id: 'm2',
        sender: 'ai',
        text: 'Yes, we offer a 10% discount on orders over $500, and 15% on orders over $1000.',
        timestamp: '2026-09-23T10:10:05Z',
        type: 'text'
      },
      {
        id: 'm3',
        sender: 'customer',
        text: 'Thanks!',
        timestamp: '2026-09-23T10:15:00Z',
        type: 'text'
      }
    ]
  }
];
