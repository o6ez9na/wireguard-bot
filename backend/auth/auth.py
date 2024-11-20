from schemas.schemas import TokenInfo, AdminBase
import auth.utils as utils
from fastapi import APIRouter, Depends, Form, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials, OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError

# http_bearer = HTTPBearer()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/admin/login/")
router = APIRouter()

john = AdminBase(
    username='john',
    telegram_id='1234',
    password=utils.hash_password("qwerty"),
    public_key='public_key',
    private_key='private_key',
    config='config',
)

sam = AdminBase(
    username='sam',
    telegram_id='12334',
    password=utils.hash_password("qwerty"),
    public_key='public_key',
    private_key='private_key',
    config='config',
)

admins_db: dict[str, AdminBase] = {
    john.username: john,
    sam.username: sam,
}


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


@ router.post('/login/', response_model=TokenInfo)
def auth_admin_issue_jwt(
    admin: AdminBase = Depends(validate_admin)
):
    jwt_payload = {
        "sub": admin.username,
        "name": admin.username,
        "password": admin.password
    }

    token = utils.encode_jwt(payload=jwt_payload)
    return TokenInfo(
        access_token=token,
        token_type="Bearer"
    )


def get_curent_token_payload(
    token: str = Depends(oauth2_scheme)
) -> AdminBase:
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
