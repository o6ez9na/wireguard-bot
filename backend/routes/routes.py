from schemas.schemas import Client, ClientCreate, ClientUpdate
from fastapi import APIRouter, HTTPException, status, Depends
from crud import crud
from models.db_helper import db_helper
from dependencies.dependencies import client_by_id
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(prefix='/api/v1/client', tags=["Clients"])


@router.get("/", response_model=list[Client])
async def get_clients(
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.get_clients(session=session)


@router.get("/{client_id}/", response_model=Client)
async def get_client(
    client: Client = Depends(client_by_id)
):
    return client


@router.post(
    "/create/",
    response_model=Client,
    status_code=status.HTTP_201_CREATED
)
async def create_client(
        client: ClientCreate,
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_client(session=session, client_in=client)


@router.put("/{client_id}/")
async def update_client(
    client_update: ClientUpdate,
    client: Client = Depends(client_by_id),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.update_client(
        session=session,
        client=client,
        client_update=client_update)


@router.patch("/{client_id}/")
async def update_client_partial(
    client_update: ClientUpdate,
    client: Client = Depends(client_by_id),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.update_client(
        session=session,
        client=client,
        client_update=client_update,
        partial=True)


@router.delete("/{client_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_client(
    client: Client = Depends(client_by_id),
    session: AsyncSession = Depends(db_helper.session_dependency),
) -> None:
    return await crud.delete_client(session=session, client=client)
