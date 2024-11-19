from schemas.schemas import User, UserCreate, UserUpdate
from fastapi import APIRouter, HTTPException, status, Depends
from crud import crud
from models.db_helper import db_helper
from dependencies.dependencies import user_by_id
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix='/api/v1/user', tags=["Users"])


@router.get("/", response_model=list[User])
async def get_users(
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.get_users(session=session)


@router.get("/{user_id}/", response_model=User)
async def get_user(
    user: User = Depends(user_by_id)
):
    return user


@router.post(
    "/create/",
    response_model=User,
    status_code=status.HTTP_201_CREATED
)
async def create_user(
        user: UserCreate,
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_user(session=session, user_in=user)


@router.put("/{user_id}/")
async def update_user(
    user_update: UserUpdate,
    user: User = Depends(user_by_id),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.update_user(
        session=session,
        user=user,
        user_update=user_update)


@router.patch("/{user_id}/")
async def update_user_partial(
    user_update: UserUpdate,
    user: User = Depends(user_by_id),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.update_user(
        session=session,
        user=user,
        user_update=user_update,
        partial=True)


@router.delete("/{user_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user: User = Depends(user_by_id),
    session: AsyncSession = Depends(db_helper.session_dependency),
) -> None:
    return await crud.delete_user(session=session, user=user)
