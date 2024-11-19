from schemas.schemas import ClientCreate, ClientUpdate, ClientUpdateParital
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from sqlalchemy import select
from models.models import Client


async def create_client(session: AsyncSession, client_in: ClientCreate) -> dict:
    client = Client(**client_in.model_dump())
    session.add(client)
    await session.commit()
    return client


async def get_clients(session: AsyncSession) -> list[Client]:
    query = select(Client).order_by(Client.id)
    result: Result = await session.execute(query)
    client = result.scalars().all()
    return list(client)


async def get_client(session: AsyncSession, client_id: int) -> Client | None:
    return await session.get(Client, client_id)


async def update_client(session: AsyncSession, client: Client, client_update: ClientUpdate | ClientUpdateParital, partial: bool = False) -> Client:
    for name, value in client_update.model_dump(exclude_unset=partial).items():
        setattr(client, name, value)
    await session.commit()
    return client


async def delete_client(session: AsyncSession, client: Client) -> None:
    await session.delete(client)
    await session.commit()
