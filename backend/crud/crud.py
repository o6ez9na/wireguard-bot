from schemas.schemas import ClientCreate, ClientUpdate, ClientUpdatePartial, \
    AdminCreate, AdminUpdate, AdminUpdatePartial
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.engine import Result
from sqlalchemy import select
from models.models import Client, Admin
import paramiko
import io


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


async def update_client(session: AsyncSession, client: Client, client_update: ClientUpdate | ClientUpdatePartial, partial: bool = False) -> Client:
    for name, value in client_update.model_dump(exclude_unset=partial).items():
        setattr(client, name, value)
    await session.commit()
    return client


async def delete_client(session: AsyncSession, client: Client) -> None:
    await session.delete(client)
    await session.commit()


async def create_admin(session: AsyncSession, admin_in: AdminCreate) -> dict:
    admin = Admin(**admin_in.model_dump())
    session.add(admin)
    await session.commit()
    return admin


async def get_admins(session: AsyncSession) -> list[Admin]:
    query = select(Admin).order_by(Admin.id)
    result: Result = await session.execute(query)
    admin = result.scalars().all()
    return list(admin)


async def generate_ssh_pair():
    key = paramiko.RSAKey.generate(2048)
    private_key_io = io.StringIO()
    key.write_private_key(private_key_io)

    private_key = private_key_io.getvalue()
    public_key = f"{key.get_name()} {key.get_base64()}"
    return private_key, public_key


async def get_ssh_pair(session: AsyncSession, client: Client):

    private_key, public_key = await generate_ssh_pair()

    try:
        client.private_key = private_key
        client.public_key = public_key

        session.add(client)
        await session.commit()

        return {"private_key": private_key, "public_key": public_key}

    except Exception as e:
        await session.rollback()


async def get_admin(session: AsyncSession, admin_id: int) -> Admin | None:
    return await session.get(Admin, admin_id)


async def update_admin(session: AsyncSession, admin: Admin, admin_update: AdminUpdate | AdminUpdatePartial, partial: bool = False) -> Admin:
    for name, value in admin_update.model_dump(exclude_unset=partial).items():
        setattr(admin, name, value)
    await session.commit()
    return admin


async def delete_admin(session: AsyncSession, admin: Admin) -> None:
    await session.delete(admin)
    await session.commit()
