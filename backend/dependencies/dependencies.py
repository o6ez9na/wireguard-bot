from typing import Annotated
from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from models.db_helper import db_helper
from crud import crud
from schemas.schemas import Client, Admin


async def client_by_id(
        client_id: Annotated[int, Path],
        session: AsyncSession = Depends(db_helper.session_dependency),
) -> Client:
    client = await crud.get_client(session=session, client_id=client_id)
    if client:
        return client

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Client not found",
    )


async def admin_by_id(
        admin_id: Annotated[int, Path],
        session: AsyncSession = Depends(db_helper.session_dependency),) -> Admin:
    admin = await crud.get_admin(session=session, admin_id=admin_id)
    if admin:
        return admin

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="Admin not found",
    )
