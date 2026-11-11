# E-commerce

Frontend: React + TypeScript + Vite
Backend: Python FastAPI (พอร์ต 5000)

## เปิดใช้งาน Backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate    macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
python main.py
```

หรือใช้ `uvicorn main:app --reload --port 5000`

Backend จะทำงานที่ http://localhost:5000
(เปลี่ยนพอร์ตได้ด้วยตัวแปร `PORT` ในไฟล์ `.env` ดูตัวอย่างที่ `.env.example`)

Endpoints:
- `GET /`
- `POST /api/auth/login`
- `POST /api/auth/register`

## เปิดใช้งาน Frontend

```bash
cd frontend
npm install
npm run dev
```

เปิดที่ http://localhost:5173
