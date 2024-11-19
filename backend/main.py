from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager
from routes.routes import router as user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

app = FastAPI(lifespan=lifespan)
app.include_router(user_router)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
