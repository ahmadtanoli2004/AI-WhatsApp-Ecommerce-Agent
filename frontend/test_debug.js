const mockProducts = [
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

const mockAgentStats = {
  totalInteractions: 1248,
  activeConversations: 12,
  avgResponseTime: '1.2s',
  salesConverted: 84
};

const mockConversations = [
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

const mockOrders=[]; const mockCustomers=[]; const mockAiConfig={}; const mockWhatsAppConfig={}; const mockSettings={};








// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a random ID for new items
const generateId = () => Math.random().toString(36).substr(2, 9);

let currentProducts = [...mockProducts];
let currentOrders = [...mockOrders];
let currentCustomers = [...mockCustomers];
let currentConversations = [...mockConversations];
let currentAiConfig = JSON.parse(JSON.stringify(mockAiConfig));
let currentWhatsAppConfig = JSON.parse(JSON.stringify(mockWhatsAppConfig));
let currentSettings = JSON.parse(JSON.stringify(mockSettings));

const mockApiService = {
  // Products API
  getProducts: async ({ search = '', category = 'All Categories', stock = 'All Stock', status = 'All Status', sort = 'Recently Updated' } = {}) => {
    await delay(600);
    let filteredProducts = [...currentProducts];
    
    if (search) {
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (category && category !== 'All Categories') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (status && status !== 'All Status') {
      filteredProducts = filteredProducts.filter(p => p.status === status);
    }

    if (stock && stock !== 'All Stock') {
      if (stock === 'In Stock') {
        filteredProducts = filteredProducts.filter(p => p.stock > 10);
      } else if (stock === 'Low Stock') {
        filteredProducts = filteredProducts.filter(p => p.stock > 0 && p.stock <= 10);
      } else if (stock === 'Out of Stock') {
        filteredProducts = filteredProducts.filter(p => p.stock === 0);
      }
    }
    
    if (sort === 'Recently Updated') {
      filteredProducts.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    } else if (sort === 'Price: Low to High') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === 'Price: High to Low') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    return filteredProducts;
  },

  getProductById: async (id) => {
    await delay(400);
    const product = currentProducts.find(p => p.id === id);
    if (!product) throw new Error('Product not found');
    return { ...product };
  },

  createProduct: async (productData) => {
    await delay(800);
    const newProduct = { 
      ...productData, 
      id: `p${generateId()}`,
      lastUpdated: new Date().toISOString()
    };
    currentProducts.unshift(newProduct);
    return newProduct;
  },

  updateProduct: async (id, productData) => {
    await delay(800);
    const index = currentProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    currentProducts[index] = { 
      ...productData, 
      id,
      lastUpdated: new Date().toISOString()
    };
    return currentProducts[index];
  },

  deleteProduct: async (id) => {
    await delay(500);
    const index = currentProducts.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Product not found');
    currentProducts.splice(index, 1);
    return { success: true };
  },

  // Orders API
  getOrders: async ({ search = '', status = 'All Statuses', payment = 'All Payments', date = 'All Dates', sort = 'Newest First' } = {}) => {
    await delay(500);
    let filteredOrders = [...currentOrders];
    
    if (search) {
      filteredOrders = filteredOrders.filter(o => 
        o.id.toLowerCase().includes(search.toLowerCase()) || 
        o.customer.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (status && status !== 'All Statuses') {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    
    if (payment && payment !== 'All Payments') {
      filteredOrders = filteredOrders.filter(o => o.paymentStatus === payment);
    }
    
    if (sort === 'Newest First') {
      filteredOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sort === 'Oldest First') {
      filteredOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sort === 'Highest Amount') {
      filteredOrders.sort((a, b) => b.total - a.total);
    } else if (sort === 'Lowest Amount') {
      filteredOrders.sort((a, b) => a.total - b.total);
    }

    return filteredOrders;
  },

  getOrderById: async (id) => {
    await delay(400);
    const order = currentOrders.find(o => o.id === id);
    if (!order) throw new Error('Order not found');
    return { ...order };
  },

  updateOrderStatus: async (id, statusData) => {
    await delay(700);
    const index = currentOrders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');
    
    const order = currentOrders[index];
    order.status = statusData.status;
    
    const timelineStep = order.timeline.find(t => t.step === statusData.status);
    if (timelineStep) {
      timelineStep.completed = true;
      timelineStep.time = new Date().toISOString();
    }
    
    return { ...order };
  },

  cancelOrder: async (id) => {
    await delay(800);
    const index = currentOrders.findIndex(o => o.id === id);
    if (index === -1) throw new Error('Order not found');
    
    currentOrders[index].status = 'Cancelled';
    currentOrders[index].paymentStatus = 'Refunded';
    
    return { ...currentOrders[index] };
  },

  // Customers API
  getCustomers: async ({ search = '', status = 'All Customers', orders = 'All Orders', sort = 'Recently Active' } = {}) => {
    await delay(500);
    let filtered = [...currentCustomers];

    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(s) || 
        c.email.toLowerCase().includes(s) || 
        c.whatsapp.includes(s)
      );
    }

    if (status && status !== 'All Customers') {
      filtered = filtered.filter(c => c.status === status);
    }

    if (orders && orders !== 'All Orders') {
      if (orders === 'No Orders') filtered = filtered.filter(c => c.ordersCount === 0);
      if (orders === '1-5 Orders') filtered = filtered.filter(c => c.ordersCount >= 1 && c.ordersCount <= 5);
      if (orders === '6+ Orders') filtered = filtered.filter(c => c.ordersCount >= 6);
    }

    if (sort === 'Recently Active') {
      filtered.sort((a, b) => new Date(b.lastActivity) - new Date(a.lastActivity));
    } else if (sort === 'Highest Spend') {
      filtered.sort((a, b) => b.totalSpent - a.totalSpent);
    } else if (sort === 'Most Orders') {
      filtered.sort((a, b) => b.ordersCount - a.ordersCount);
    } else if (sort === 'Newest') {
      filtered.sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate));
    }

    return filtered;
  },

  getCustomerById: async (id) => {
    await delay(300);
    const customer = currentCustomers.find(c => c.id === id);
    if (!customer) throw new Error('Customer not found');
    return { ...customer };
  },

  // Conversations API
  getConversations: async ({ search = '', filter = 'All' } = {}) => {
    await delay(400);
    let filtered = [...currentConversations];

    if (search) {
      filtered = filtered.filter(c => c.customerName.toLowerCase().includes(search.toLowerCase()));
    }

    if (filter === 'Unread') {
      filtered = filtered.filter(c => c.unreadCount > 0);
    } else if (filter === 'AI Active') {
      filtered = filtered.filter(c => c.mode === 'ai');
    } else if (filter === 'Human') {
      filtered = filtered.filter(c => c.mode === 'human');
    }

    return filtered;
  },

  getConversationById: async (id) => {
    await delay(200);
    const conv = currentConversations.find(c => c.id === id);
    if (!conv) throw new Error('Conversation not found');
    return { ...conv };
  },

  sendMockMessage: async (conversationId, payload) => {
    await delay(500);
    const index = currentConversations.findIndex(c => c.id === conversationId);
    if (index === -1) throw new Error('Conversation not found');

    const isVoice = typeof payload === 'object' && payload !== null && payload.type === 'voice';
    const messageText = isVoice ? 'Voice Message' : payload;

    const newMessage = {
      id: `m${Date.now()}`,
      sender: 'human', 
      timestamp: new Date().toISOString(),
      ...(isVoice ? {
        type: 'voice',
        text: 'Voice Message',
        duration: payload.duration,
        transcript: payload.transcript
      } : {
        type: 'text',
        text: payload
      })
    };

    currentConversations[index].messages.push(newMessage);
    currentConversations[index].lastMessage = messageText;
    currentConversations[index].lastMessageTime = newMessage.timestamp;
    
    if (currentConversations[index].mode === 'ai') {
      setTimeout(() => {
        const aiMessage = {
          id: `m${Date.now()+1}`,
          sender: 'ai',
          text: "I am a mock AI. In production, I would use natural language processing to answer this.",
          timestamp: new Date().toISOString(),
          type: 'text'
        };
        currentConversations[index].messages.push(aiMessage);
        currentConversations[index].lastMessage = aiMessage.text;
        currentConversations[index].lastMessageTime = aiMessage.timestamp;
      }, 1500);
    }

    return newMessage;
  },

  // AI Agent Config API (Phase 5)
  getAiAgentConfig: async () => {
    await delay(400);
    return JSON.parse(JSON.stringify(currentAiConfig));
  },

  updateAiAgentConfig: async (updates) => {
    await delay(600);
    currentAiConfig = {
      ...currentAiConfig,
      ...updates,
      settings: { ...currentAiConfig.settings, ...(updates.settings || {}) },
      responseStyle: { ...currentAiConfig.responseStyle, ...(updates.responseStyle || {}) }
    };
    return JSON.parse(JSON.stringify(currentAiConfig));
  },

  resetAiAgentConfig: async () => {
    await delay(500);
    currentAiConfig = JSON.parse(JSON.stringify(mockAiConfig));
    return JSON.parse(JSON.stringify(currentAiConfig));
  },

  getMockAiTestResponse: async (message) => {
    await delay(1200); 
    
    const lowerMessage = message.toLowerCase();
    let response = "I'm the WA Commerce AI test agent. This is a simulated response.";

    if (lowerMessage.includes('headphones') || lowerMessage.includes('300')) {
      response = "Yes. We currently have several options under $300, including the Wireless Noise-Canceling Headphones for $249.99.";
    } else if (lowerMessage.includes('battery')) {
      response = "The Wireless Noise-Canceling Headphones provide up to 30 hours of battery life.";
    } else if (lowerMessage.includes('order')) {
      response = "I can certainly help you track an order. Could you please provide your order ID?";
    } else if (lowerMessage.includes('stock')) {
      response = "Yes, we have 45 units in stock ready to ship.";
    } else if (lowerMessage.includes('payment')) {
      response = "We support Credit Card (Stripe), PayPal, Apple Pay, and WhatsApp Pay.";
    }

    return response;
  },

  // WhatsApp Integration API (Phase 6)
  getWhatsAppConfig: async () => {
    await delay(400);
    return JSON.parse(JSON.stringify(currentWhatsAppConfig));
  },

  updateWhatsAppConfig: async (updates) => {
    await delay(700);
    currentWhatsAppConfig = {
      ...currentWhatsAppConfig,
      credentials: { ...currentWhatsAppConfig.credentials, ...(updates.credentials || {}) }
    };
    return JSON.parse(JSON.stringify(currentWhatsAppConfig));
  },

  resetWhatsAppConfig: async () => {
    await delay(500);
    currentWhatsAppConfig = JSON.parse(JSON.stringify(mockWhatsAppConfig));
    return JSON.parse(JSON.stringify(currentWhatsAppConfig));
  },

  testWhatsAppConnection: async () => {
    await delay(1200);
    if (currentWhatsAppConfig.status === 'Disconnected') {
      throw new Error('Cannot test connection while disconnected.');
    }
    return { success: true, message: 'WhatsApp connection is healthy' };
  },

  testWebhook: async () => {
    await delay(1000);
    return { success: true, message: 'Webhook verification successful' };
  },

  disconnectWhatsApp: async () => {
    await delay(800);
    currentWhatsAppConfig.status = 'Disconnected';
    currentWhatsAppConfig.webhookStatus = 'Error';
    return JSON.parse(JSON.stringify(currentWhatsAppConfig));
  },

  reconnectWhatsApp: async () => {
    await delay(1500);
    currentWhatsAppConfig.status = 'Connected';
    currentWhatsAppConfig.webhookStatus = 'Connected';
    currentWhatsAppConfig.lastConnected = new Date().toISOString();
    return JSON.parse(JSON.stringify(currentWhatsAppConfig));
  },

  // Settings API (Phase 7)
  getSettings: async () => {
    await delay(400);
    return JSON.parse(JSON.stringify(currentSettings));
  },

  updateSettings: async (section, updates) => {
    await delay(600);
    currentSettings[section] = {
      ...currentSettings[section],
      ...updates
    };
    return JSON.parse(JSON.stringify(currentSettings));
  },

  resetSettings: async () => {
    await delay(500);
    currentSettings = JSON.parse(JSON.stringify(mockSettings));
    return JSON.parse(JSON.stringify(currentSettings));
  },

  // System API
  getHealth: async () => {
    await delay(300);
    return {
      status: "ok",
      database: "connected (mock)",
      version: "1.0.0-prototype"
    };
  }
};

mockApiService.getProducts().then(console.log);