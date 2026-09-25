export const mockAiConfig = {
  status: 'Active',
  model: 'Gemini Pro 1.5',
  mode: 'E-Commerce Assistant',
  performance: {
    conversationsHandled: 1284,
    aiResponses: 3842,
    resolutionRate: '88.7%',
    avgResponseTime: '1.8s'
  },
  systemPrompt: `You are the AI shopping assistant for WA Commerce AI.

Your role is to help customers discover products, answer product-related questions, assist with orders, and provide clear and accurate information.

Only provide information available in the connected product and order data.

If information is unavailable, clearly tell the customer that you do not have that information.

Do not invent prices, stock levels, delivery estimates, or order information.

Maintain a professional, friendly, and helpful tone.

When appropriate, recommend relevant products based on the customer's request.`,
  settings: {
    aiEnabled: true,
    productRecommendations: true,
    orderAssistance: true,
    stockChecking: true,
    priceQuestions: true,
    conversationMemory: true
  },
  responseStyle: {
    tone: 'Professional', // Professional, Friendly, Casual
    length: 'Balanced', // Concise, Balanced, Detailed
    language: 'English + Urdu' // English, Urdu, Roman Urdu, English + Urdu
  },
  capabilities: [
    { id: 'c1', title: 'Product Search', desc: 'Find relevant products based on customer questions.', enabled: true },
    { id: 'c2', title: 'Order Assistance', desc: 'Help customers understand their order status.', enabled: true },
    { id: 'c3', title: 'Product Recommendations', desc: 'Recommend products based on customer needs.', enabled: true },
    { id: 'c4', title: 'FAQ Handling', desc: 'Answer common customer questions.', enabled: true },
    { id: 'c5', title: 'Stock Checking', desc: 'Provide current product availability.', enabled: true },
    { id: 'c6', title: 'Price Questions', desc: 'Answer product pricing questions.', enabled: true }
  ],
  suggestedPrompts: [
    "Show me products under $100",
    "Where is my order?",
    "Recommend a gift",
    "Do you have this in stock?",
    "What payment methods do you support?"
  ],
  activity: [
    { action: 'AI answered a product question', time: '2026-09-24T14:10:00Z' },
    { action: 'AI recommended Wireless Headphones', time: '2026-09-24T14:04:00Z' },
    { action: 'AI assisted order #ORD-10481', time: '2026-09-24T13:57:00Z' },
    { action: 'AI handled customer inquiry', time: '2026-09-24T13:51:00Z' }
  ]
};
