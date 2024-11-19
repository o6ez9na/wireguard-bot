from schemas.schemas import User, UserCreate
from fastapi import APIRouter, HTTPException, status, Depends
from crud import crud
from models.db_helper import db_helper
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix='/api/v1/user', tags=["Users"])


@router.get("/", response_model=list[User])
async def get_users(
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.get_users(session=session)


@router.get("/{user_id}/", response_model=User)
async def get_user(
        user_id: int,
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    user = await crud.get_user(session=session, user_id=user_id)
    if user:
        return user

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
    )


@router.post("/create/", response_model=User)
async def create_user(
        user: UserCreate,
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_user(session=session, user_in=user)
