export const mockWhatsAppConfig = {
  status: 'Connected', // Connected, Connecting, Disconnected, Error
  lastConnected: new Date().toISOString(),
  businessInfo: {
    name: 'WA Commerce Store',
    category: 'E-Commerce',
    phone: '+92 300 1234567',
    email: 'support@wacommerce.example',
    description: 'AI-powered WhatsApp shopping assistant.'
  },
  credentials: {
    accessToken: 'EAADXXXXXXXXXXXXXXX',
    phoneNumberId: '123456789012345',
    businessId: '987654321098765',
    appId: '123456789012345',
    appSecret: 'abc123def456ghi789jkl012mno345pq',
    verifyToken: 'my_secure_verify_token_2026',
    callbackUrl: 'https://api.wacommerce.example/webhook/whatsapp'
  },
  webhookStatus: 'Connected', // Connected, Error
  stats: {
    messagesToday: 328,
    incomingMessages: 184,
    aiResponses: 291,
    failedMessages: 3
  },
  health: {
    deliveryRate: '98.7%',
    responseSuccess: '99.1%'
  },
  activity: [
    { type: 'incoming', action: 'Incoming message received', target: 'Sarah Khan', time: '2026-09-24T14:10:00Z' },
    { type: 'outgoing', action: 'AI response sent', target: 'Ahmed Ali', time: '2026-09-24T14:07:00Z' },
    { type: 'system', action: 'Order confirmation message sent', target: 'Order #ORD-10481', time: '2026-09-24T14:01:00Z' },
    { type: 'system', action: 'Webhook verified', target: 'System', time: '2026-09-24T13:54:00Z' }
  ]
};
