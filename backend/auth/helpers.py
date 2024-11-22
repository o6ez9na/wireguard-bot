from sqlalchemy import select
from models.db_helper import db_helper
from sqlalchemy.ext.asyncio import AsyncSession
from models.models import Admin
from auth import utils
from core.config import settings
from datetime import timedelta
from fastapi import Depends, Form, HTTPException, status
from jwt.exceptions import InvalidTokenError
from fastapi.security import OAuth2PasswordBearer


TOKEN_TYPE_FIELD = "token"
ACCESS_TOKEN_TYPE = "access"
REFRESH_TOKEN_TYPE = "refresh"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/admin/login/")

john = Admin(
    id=1,
    username='john',
    telegram_id='1234',
    password="qwerty",
    public_key='public_key',
    private_key='private_key',
    config='config',
)

sam = Admin(
    id=2,
    username='sam',
    telegram_id='12334',
    password="qwerty",
    public_key='public_key',
    private_key='private_key',
    config='config',
)

admins_db: dict[str, Admin] = {
    john.username: john,
    sam.username: sam,
}


def get_curent_token_payload(
    token: str = Depends(oauth2_scheme)
) -> Admin:
    try:
        payload = utils.decode_jwt(token=token)
    except InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )
    return payload


def create_jwt(
        token_type: str,
        token_data: dict,
        expire_minutes: int = settings.auth_jwt.access_token_expire_minutes,
        expire_timedelta: timedelta | None = None
) -> str:
    jwt_payload = {TOKEN_TYPE_FIELD: token_type}
    jwt_payload.update(token_data)

    return utils.encode_jwt(payload=jwt_payload,
                            expire=expire_minutes,
                            expire_timedelta=expire_timedelta
                            )


def create_access_token(admin: Admin) -> str:
    jwt_payload = {
        "sub": admin.username,
        "name": admin.username,
    }

    return create_jwt(
        token_type=ACCESS_TOKEN_TYPE,
        token_data=jwt_payload,
        expire_minutes=settings.auth_jwt.access_token_expire_minutes
    )


def create_refresh_token(admin: Admin) -> str:
    jwt_payload = {
        "sub": admin.username,
        "name": admin.username,
    }
    return create_jwt(
        token_type=REFRESH_TOKEN_TYPE,
        token_data=jwt_payload,
        expire_timedelta=timedelta(
            days=settings.auth_jwt.refresh_token_expire_days)
    )


async def get_admin_by_username(username: str, session: AsyncSession) -> Admin:
    query = select(Admin).where(Admin.username == username)
    print(session)
    result = await session.execute(query)
    admin = result.scalar_one_or_none()

    return admin


async def validate_admin(
    username: str = Form(),
    password: str = Form(),
    session: AsyncSession = Depends(db_helper.session_dependency),
):
    unauthed_exceptions = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid name or password",
    )

    if not (admin := await get_admin_by_username(username, session=session)):
        raise unauthed_exceptions

    if utils.validate_password(
        password=password,
        hashed_password=admin.password,
    ):
        return admin

    raise unauthed_exceptions


async def get_current_token_payload(
    token: str = Depends(oauth2_scheme)
) -> Admin:
    try:
        payload = utils.decode_jwt(token=token)
    except InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )
    return payload


def validate_token_type(payload: dict, token_type: str) -> bool:
    current_token_type = payload.get(TOKEN_TYPE_FIELD)
    if current_token_type == token_type:
        return True

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid token type"
    )


async def get_user_by_token_sub(payload: dict,
                                session: AsyncSession,
                                ) -> Admin:
    name: str | None = payload.get("sub")
    if name:
        admin = await get_admin_by_username(username=name, session=session)
        if admin:
            return admin

    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="token invalid"
    )
