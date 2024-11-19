from fastapi import FastAPI
import uvicorn
from contextlib import asynccontextmanager
from models import Base, db_helper
from routes.routes import router as user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    async with db_helper.engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI()
app.include_router(user_router)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
