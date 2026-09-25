export const mockOrders = [
  {
    id: 'ORD-10482',
    customer: {
      name: 'Sarah Khan',
      email: 'sarah.khan@example.com',
      phone: '+92 300 1234567',
      address: {
        street: '123 Tech Boulevard, Gulberg',
        city: 'Lahore',
        province: 'Punjab',
        postalCode: '54000'
      }
    },
    items: [
      {
        id: 'p1',
        name: 'Wireless Noise-Canceling Headphones',
        quantity: 1,
        unitPrice: 15499,
        subtotal: 15499,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
      }
    ],
    subtotal: 15499,
    shipping: 0.00,
    discount: 500,
    tax: 401,
    total: 15400,
    paymentMethod: 'Credit Card (Stripe)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-09-24T13:10:00Z',
    timeline: [
      { step: 'Order Placed', time: '2026-09-21T10:32:00Z', completed: true },
      { step: 'Order Confirmed', time: '2026-09-21T10:40:00Z', completed: true },
      { step: 'Processing', time: '2026-09-21T11:15:00Z', completed: true },
      { step: 'Shipped', time: '2026-09-22T15:20:00Z', completed: true },
      { step: 'Delivered', time: '2026-09-24T13:10:00Z', completed: true }
    ]
  },
  {
    id: 'ORD-10481',
    customer: {
      name: 'Ahmed Ali',
      email: 'ahmed.ali@example.com',
      phone: '+92 321 7654321',
      address: {
        street: '456 Innovation Drive, DHA Phase 5',
        city: 'Karachi',
        province: 'Sindh',
        postalCode: '75500'
      }
    },
    items: [
      {
        id: 'p4',
        name: 'Mechanical Gaming Keyboard',
        quantity: 1,
        unitPrice: 12999,
        subtotal: 12999,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'
      },
      {
        id: 'p6',
        name: 'Ergonomic Mouse',
        quantity: 1,
        unitPrice: 3500,
        subtotal: 3500,
        image: null
      }
    ],
    subtotal: 16499,
    shipping: 250,
    discount: 0.00,
    tax: 251,
    total: 17000,
    paymentMethod: 'PayPal',
    paymentStatus: 'Paid',
    status: 'Processing',
    date: '2026-09-24T09:45:00Z',
    timeline: [
      { step: 'Order Placed', time: '2026-09-24T09:45:00Z', completed: true },
      { step: 'Order Confirmed', time: '2026-09-24T10:05:00Z', completed: true },
      { step: 'Processing', time: '2026-09-24T11:00:00Z', completed: true },
      { step: 'Shipped', time: null, completed: false },
      { step: 'Delivered', time: null, completed: false }
    ]
  },
  {
    id: 'ORD-10480',
    customer: {
      name: 'Maria James',
      email: 'maria.james@example.com',
      phone: '+92 333 9876543',
      address: {
        street: '789 Startup Way, F-8 Markaz',
        city: 'Islamabad',
        province: 'ICT',
        postalCode: '44000'
      }
    },
    items: [
      {
        id: 'p2',
        name: 'Smart Fitness Watch',
        quantity: 1,
        unitPrice: 8500,
        subtotal: 8500,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
      }
    ],
    subtotal: 8500,
    shipping: 200,
    discount: 500,
    tax: 300,
    total: 8500,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Pending',
    status: 'Confirmed',
    date: '2026-09-23T16:20:00Z',
    timeline: [
      { step: 'Order Placed', time: '2026-09-23T16:20:00Z', completed: true },
      { step: 'Order Confirmed', time: '2026-09-23T16:30:00Z', completed: true },
      { step: 'Processing', time: null, completed: false },
      { step: 'Shipped', time: null, completed: false },
      { step: 'Delivered', time: null, completed: false }
    ]
  },
  {
    id: 'ORD-10479',
    customer: {
      name: 'Daniel Smith',
      email: 'daniel.smith@example.com',
      phone: '+92 345 1122334',
      address: {
        street: '321 Enterprise Blvd, Saddar',
        city: 'Rawalpindi',
        province: 'Punjab',
        postalCode: '46000'
      }
    },
    items: [
      {
        id: 'p3',
        name: 'Ergonomic Office Chair',
        quantity: 1,
        unitPrice: 32000,
        subtotal: 32000,
        image: 'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=500&q=80'
      }
    ],
    subtotal: 32000,
    shipping: 0.00,
    discount: 0.00,
    tax: 0.00,
    total: 32000,
    paymentMethod: 'WhatsApp Pay',
    paymentStatus: 'Paid',
    status: 'Shipped',
    date: '2026-09-23T09:15:00Z',
    timeline: [
      { step: 'Order Placed', time: '2026-09-23T09:15:00Z', completed: true },
      { step: 'Order Confirmed', time: '2026-09-23T09:30:00Z', completed: true },
      { step: 'Processing', time: '2026-09-23T14:00:00Z', completed: true },
      { step: 'Shipped', time: '2026-09-24T08:30:00Z', completed: true },
      { step: 'Delivered', time: null, completed: false }
    ]
  },
  {
    id: 'ORD-10478',
    customer: {
      name: 'Jessica Taylor',
      email: 'jess.taylor@example.com',
      phone: '+92 311 5556667',
      address: {
        street: '654 Cloud St, Hayatabad',
        city: 'Peshawar',
        province: 'KPK',
        postalCode: '25000'
      }
    },
    items: [
      {
        id: 'p5',
        name: 'Organic Skincare Set',
        quantity: 1,
        unitPrice: 4500,
        subtotal: 4500,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=500&q=80'
      }
    ],
    subtotal: 4500,
    shipping: 0.00,
    discount: 0.00,
    tax: 0.00,
    total: 4500,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Refunded',
    status: 'Cancelled',
    date: '2026-09-22T11:45:00Z',
    timeline: [
      { step: 'Order Placed', time: '2026-09-22T11:45:00Z', completed: true },
      { step: 'Order Confirmed', time: '2026-09-22T12:00:00Z', completed: true },
      { step: 'Processing', time: null, completed: false },
      { step: 'Shipped', time: null, completed: false },
      { step: 'Delivered', time: null, completed: false }
    ]
  },
  {
    id: 'ORD-10477',
    customer: {
      name: 'Michael Chen',
      email: 'm.chen@example.com',
      phone: '+92 301 9988776',
      address: {
        street: '987 Data Ave, Wapda Town',
        city: 'Gujranwala',
        province: 'Punjab',
        postalCode: '52250'
      }
    },
    items: [
      {
        id: 'p1',
        name: 'Wireless Noise-Canceling Headphones',
        quantity: 1,
        unitPrice: 15499,
        subtotal: 15499,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
      },
      {
        id: 'p4',
        name: 'Mechanical Gaming Keyboard',
        quantity: 1,
        unitPrice: 12999,
        subtotal: 12999,
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80'
      }
    ],
    subtotal: 28498,
    shipping: 0.00,
    discount: 0.00,
    tax: 0.00,
    total: 28498,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-09-21T14:20:00Z',
    timeline: [
      { step: 'Order Placed', time: '2026-09-21T14:20:00Z', completed: true },
      { step: 'Order Confirmed', time: '2026-09-21T14:35:00Z', completed: true },
      { step: 'Processing', time: '2026-09-22T09:00:00Z', completed: true },
      { step: 'Shipped', time: '2026-09-22T16:45:00Z', completed: true },
      { step: 'Delivered', time: '2026-09-23T11:20:00Z', completed: true }
    ]
  }
];
