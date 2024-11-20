from auth.helpers import TOKEN_TYPE_FIELD, ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE
from jwt.exceptions import InvalidTokenError
from fastapi.security import HTTPBearer, OAuth2PasswordBearer
from fastapi import APIRouter, Depends, Form, HTTPException, status
from schemas.schemas import TokenInfo, Admin
import auth.utils as utils
from core.config import settings
from datetime import timedelta

http_bearer = HTTPBearer(auto_error=False)
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/admin/login/")

router = APIRouter(dependencies=[Depends(http_bearer)])

john = Admin(
    id=1,
    username='john',
    telegram_id='1234',
    password=utils.hash_password("qwerty"),
    public_key='public_key',
    private_key='private_key',
    config='config',
)

sam = Admin(
    id=2,
    username='sam',
    telegram_id='12334',
    password=utils.hash_password("qwerty"),
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


def validate_admin(
    username: str = Form(),
    password: str = Form(),
):
    unauthed_exceptions = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid name or password",
    )

    if not (admin := admins_db.get(username)):
        raise unauthed_exceptions

    if utils.validate_password(
        password=password,
        hashed_password=admin.password,
    ):
        return admin

    raise unauthed_exceptions


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


def validate_admin(
    username: str = Form(),
    password: str = Form(),
):
    unauthed_exceptions = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid name or password",
    )

    if not (admin := admins_db.get(username)):
        raise unauthed_exceptions

    if utils.validate_password(
        password=password,
        hashed_password=admin.password,
    ):
        return admin

    raise unauthed_exceptions


def get_current_token_payload(
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


def get_user_by_token_sub(payload: dict) -> Admin:
    name: str | None = payload.get("sub")
    if admin := admins_db.get(name):
        return admin
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="token invalid"
    )

#! фабрика


def get_auth_admin_from_token_of_type(token_type: str):
    def get_auth_admin_from_token(payload: dict = Depends(get_current_token_payload)) -> Admin:
        validate_token_type(payload=payload, token_type=token_type)
        return get_user_by_token_sub(payload=payload)
    return get_auth_admin_from_token


get_current_auth_admin = get_auth_admin_from_token_of_type(ACCESS_TOKEN_TYPE)
get_current_auth_user_for_refresh = get_auth_admin_from_token_of_type(
    REFRESH_TOKEN_TYPE)


@ router.post('/login/', response_model=TokenInfo)
def auth_admin_issue_jwt(
    admin: Admin = Depends(validate_admin)
):
    access_token = create_access_token(admin)
    refresh_token = create_refresh_token(admin)
    return TokenInfo(
        access_token=access_token,
        refresh_token=refresh_token
    )


@router.post(
    '/refresh/',
    response_model=TokenInfo,
    response_model_exclude_none=True
)
def auth_refresh_jwt(
    admin: Admin = Depends(get_current_auth_user_for_refresh)
):
    access_token = create_access_token(admin)
    return TokenInfo(
        access_token=access_token,
    )


@ router.get("/me/")
def auth_admin_check_sef_info(
    admin: Admin = Depends(get_current_auth_admin),
):
    return {
        "name": admin.username,
        "telegram_id": admin.telegram_id,
        "config": admin.config,
    }
