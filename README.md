# AI WhatsApp E-Commerce Agent

This is an AI E-Commerce Agent that communicates with customers through WhatsApp, uses Gemini as the AI brain, stores business data in MongoDB, and provides an admin dashboard.

## Phase 3 Features (Current)
- Google Gemini AI Integration (`google-genai`)
- Product-aware AI agent that retrieves catalog context from MongoDB
- Strict Anti-Hallucination rules to prevent inventing prices or stock
- AI Test Chat page in the Admin Dashboard

## Project Structure
- `backend/`: FastAPI backend with service/repository architecture
- `frontend/`: React + Vite frontend dashboard
- `docs/`: Documentation

## Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB instance (local or Atlas)

### Database Options
**Option 1: Local MongoDB**
Ensure you have MongoDB Community Edition installed and running on `mongodb://localhost:27017`.

**Option 2: MongoDB Atlas (Cloud)**
Create a free cluster on MongoDB Atlas and get your connection string.

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy the environment variables example and configure your database and API keys:
   ```bash
   cp .env.example .env
   ```
   *Note: Never commit your `.env` file to git. You MUST add your `GEMINI_API_KEY` for the AI chat to work.*
5. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

### Testing
Run backend tests using pytest from the `backend` directory:
```bash
pytest
```
*Note: The test suite mocks the Gemini API and MongoDB, so you can run the tests even without an internet connection or active database.*

### API Endpoints
#### System
- `GET /api/v1/health` - API and DB Status
#### AI Chat
- `POST /api/v1/chat/` - Chat with the product-aware AI assistant
#### Products
- `POST /api/v1/products/` - Create a product
- `GET /api/v1/products/` - List products (supports `search`, `category`, `is_active` query params)
- `GET /api/v1/products/{id}` - Get a product by ID
- `PUT /api/v1/products/{id}` - Update a product
- `DELETE /api/v1/products/{id}` - Delete a product

## AI Chat Example
**Request:**
```json
{
  "message": "Do you have any electronics?",
  "conversation_history": []
}
```
**Response:**
```json
{
  "response": "Yes, we have several electronics available including...",
  "products": [
    {
      "id": "1",
      "name": "Wireless Mouse",
      "price": 2500,
      "category": "Electronics"
    }
  ],
  "source": "catalog"
}
```
