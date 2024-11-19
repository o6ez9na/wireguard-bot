from schemas.schemas import UserCreate, User
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from sqlalchemy import select


async def create_user(session: AsyncSession, user_in: UserCreate) -> dict:
    user = User(**user_in.model_dump())
    session.add(user)
    await session.commit()
    # await session.refresh(user)
    return user


async def get_user(session: AsyncSession) -> list[User]:
    query = select(User).order_by(User.id)
    result: Result = await session.execute(query)
    users = result.scalars().all()
    return list(users)


async def get_user(session: AsyncSession, user_id: int) -> User | None:
    return await session.get(User, user_id)
