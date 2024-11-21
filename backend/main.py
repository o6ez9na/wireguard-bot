from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager
from routes.routes import router as user_router, admin_router
from starlette.middleware.cors import CORSMiddleware


app = FastAPI(debug=True)
app.include_router(user_router)
app.include_router(admin_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
