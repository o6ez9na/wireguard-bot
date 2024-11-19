from schemas.schemas import UserCreate, UserUpdate, UserUpdateParital
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from sqlalchemy import select
from models.models import User


async def create_user(session: AsyncSession, user_in: UserCreate) -> dict:
    user = User(**user_in.model_dump())
    session.add(user)
    await session.commit()
    # await session.refresh(user)
    return user


async def get_users(session: AsyncSession) -> list[User]:
    query = select(User).order_by(User.id)
    result: Result = await session.execute(query)
    users = result.scalars().all()
    return list(users)


async def get_user(session: AsyncSession, user_id: int) -> User | None:
    return await session.get(User, user_id)


async def update_user(session: AsyncSession, user: User, user_update: UserUpdate | UserUpdateParital, partial: bool = False) -> User:
    for name, value in user_update.model_dump(exclude_unset=partial).items():
        setattr(user, name, value)
    await session.commit()
    return user


async def delete_user(session: AsyncSession, user: User) -> None:
    await session.delete(user)
    await session.commit()
