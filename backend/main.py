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
    # Разрешает доступ с любых доменов (например, из браузера на другом порту)
    allow_origins=["*"],
    allow_credentials=True,
    # Разрешает все HTTP-методы (GET, POST, PUT, DELETE и т.д.)
    allow_methods=["*"],
    allow_headers=["*"],  # Разрешает все заголовки
)

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
