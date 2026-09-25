export const mockSettings = {
  general: {
    appName: 'WA Commerce AI',
    appDescription: 'AI-powered WhatsApp e-commerce assistant.',
    currency: 'PKR',
    timezone: 'Asia/Karachi',
    language: 'English',
    dateFormat: 'DD/MM/YYYY',
    theme: 'System'
  },
  businessProfile: {
    name: 'WA Commerce Store',
    category: 'E-Commerce',
    phone: '+92 300 1234567',
    email: 'support@wacommerce.example',
    address: 'Mansehra, Khyber Pakhtunkhwa, Pakistan',
    description: 'AI-powered WhatsApp shopping assistant that helps customers discover products, check prices, and manage orders.',
    logoUrl: null
  },
  aiAgent: {
    enabled: true,
    defaultModel: 'Gemini',
    responseLanguage: 'English',
    responseTone: 'Professional',
    responseLength: 'Balanced',
    conversationMemory: true,
    productRecommendations: true,
    orderAssistance: true,
    stockChecking: true,
    // Bargaining
    customerBargaining: true,
    maxDiscount: 10,
    maxNegotiationAttempts: 3,
    enforceMinimumSellingPrice: true,
    // Voice
    voiceSupport: true,
    speechToText: true,
    voiceResponses: false
  },
  notifications: {
    newOrder: true,
    orderStatus: true,
    newCustomerMsg: true,
    aiEscalation: true,
    lowStock: true,
    failedMessage: true,
    dailySummary: false,
    weeklySummary: true
  },
  security: {
    sessionTimeout: '30 minutes',
    twoFactorAuth: false,
    loginNotifications: true,
    credentialVisibility: 'Protected'
  }
};
