import { mockApiService } from './testService.mjs'; mockApiService.getProducts().then(res => console.log('Length:', res.length)).catch(console.error);
