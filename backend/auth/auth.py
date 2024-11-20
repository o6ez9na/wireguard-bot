from schemas.schemas import TokenInfo, AdminBase
import auth.utils as utils
from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jwt.exceptions import InvalidTokenError

http_bearer = HTTPBearer()

router = APIRouter()

john = AdminBase(
    name='john',
    telegram_id='1234',
    password=utils.hash_password("qwerty"),
    public_key='public_key',
    private_key='private_key',
    config='config',
)

sam = AdminBase(
    name='sam',
    telegram_id='12334',
    password=utils.hash_password("qwerty"),
    public_key='public_key',
    private_key='private_key',
    config='config',
)

admins_db: dict[str, AdminBase] = {
    john.name: john,
    sam.name: sam,
}


def validate_admin(
    name: str = Form(),
    password: str = Form(),
):
    unauthed_exceptions = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="invalid name or password",
    )

    if not (admin := admins_db.get(name)):
        raise unauthed_exceptions

    if utils.validate_password(
        password=password,
        hashed_password=admin.password,
    ):
        return admin

    raise unauthed_exceptions


@ router.post('/login/', response_model=TokenInfo)
def auth_admin_issue_jwt(
    admin: AdminBase = Depends(validate_admin)
):
    jwt_payload = {
        "sub": admin.name,
        "name": admin.name,
        "password": admin.password
    }

    token = utils.encode_jwt(payload=jwt_payload)
    return TokenInfo(
        access_token=token,
        token_type="Bearer"
    )


def get_curent_token_payload(
    credentials: HTTPAuthorizationCredentials = Depends(http_bearer)
) -> AdminBase:
    token = credentials.credentials
    try:
        payload = utils.decode_jwt(token=token)
    except InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="invalid token"
        )
    return payload


def get_curent_auth_admin(
    payload: dict = Depends(get_curent_token_payload)
) -> AdminBase:
    name: str | None = payload.get("sub")
    if admin := admins_db.get(name):
        return admin
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="token invalid"
    )


@ router.get("/me/")
def auth_admin_check_sef_info(
    admin: AdminBase = Depends(get_curent_auth_admin),
):
    return {
        "name": admin.name,
        "telegram_id": admin.telegram_id,
        "config": admin.config,
    }
