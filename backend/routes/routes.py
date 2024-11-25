from schemas.schemas import Client, ClientCreate, ClientUpdate, Admin, AdminCreate, AdminUpdate
from fastapi import APIRouter, HTTPException, status, Depends
from crud import crud
from models.db_helper import db_helper
from dependencies.dependencies import client_by_id, admin_by_id
from sqlalchemy.ext.asyncio import AsyncSession
from auth.auth import router as login_router


router = APIRouter(prefix='/api/v1/client', tags=["Clients"])
admin_router = APIRouter(prefix='/api/v1/admin', tags=["Admin"])
admin_router.include_router(login_router)


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


@router.get("/ssh/{client_id}/")
async def get_ssh_pair(
        client: Client = Depends(client_by_id),
        session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.get_ssh_pair(session=session, client=client)


@admin_router.get("/", response_model=list[Admin])
async def get_admins(
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.get_admins(session=session)


@admin_router.get("/{admin_id}/", response_model=Admin)
async def get_admin(
    admin: Admin = Depends(admin_by_id)
):
    return admin


@admin_router.post("/create/",
                   response_model=Admin,
                   status_code=status.HTTP_201_CREATED)
async def create_admin(
    admin: AdminCreate,
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.create_admin(session=session, admin_in=admin)


@admin_router.put("/{admin_id}/")
async def update_admin(
        admin_update: AdminUpdate,
        admin: Admin = Depends(admin_by_id),
        session: AsyncSession = Depends(db_helper.session_dependency)):

    return await crud.update_admin(
        session=session,
        admin=admin,
        admin_update=admin_update
    )


@admin_router.patch("/{admin_id}/")
async def update_admin_partial(
        admin_update: AdminUpdate,
        admin: Admin = Depends(admin_by_id),
        session: AsyncSession = Depends(db_helper.session_dependency)):

    return await crud.update_admin(
        session=session,
        admin=admin,
        admin_update=admin_update
    )


@admin_router.delete("/{admin_id}/", status_code=status.HTTP_204_NO_CONTENT)
async def delete_admin(
    admin: Admin = Depends(admin_by_id),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    return await crud.delete_admin(session=session, admin=admin)
