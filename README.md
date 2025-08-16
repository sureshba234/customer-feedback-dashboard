
# Customer Feedback Dashboard - Render Ready

This project contains a FastAPI backend and React frontend, prepared to deploy on Render.com.
Follow the steps below to run locally and deploy.

## Local Run
### Backend
cd backend
python -m venv .venv
# Windows: .\.venv\Scripts\Activate.ps1
source .venv/bin/activate
pip install -r requirements.txt
uvicorn backend.app.main:app --reload --port 8080

### Frontend
cd frontend
npm install
cp .env.example .env
# edit .env if needed to set VITE_API_URL
npm run dev

## Deploy on Render
1. Push this repo to GitHub.
2. On Render dashboard, click New -> Web Service, connect your repo, and pick 'feedback-backend' (or add manually using backend/Dockerfile).
3. Click New -> Static Site, connect the same repo, use build command `npm install && npm run build` and publish directory `dist`.
4. Set environment variable VITE_API_URL in frontend service to your backend URL if needed.

## Training Model
cd backend/app
python train_model.py --data ../../sample_data/feedback_labeled.csv --out ./model.json
