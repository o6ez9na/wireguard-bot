from auth.helpers import validate_token_type, Depends, get_current_token_payload, Admin, get_user_by_token_sub
from fastapi.security import HTTPBearer
from auth.helpers import ACCESS_TOKEN_TYPE, REFRESH_TOKEN_TYPE


def get_auth_admin_from_token_of_type(token_type: str):
    def get_auth_admin_from_token(payload: dict = Depends(get_current_token_payload)) -> Admin:
        validate_token_type(payload=payload, token_type=token_type)
        return get_user_by_token_sub(payload=payload)
    return get_auth_admin_from_token


http_bearer = HTTPBearer(auto_error=False)

get_current_auth_admin = get_auth_admin_from_token_of_type(ACCESS_TOKEN_TYPE)
get_current_auth_user_for_refresh = get_auth_admin_from_token_of_type(
    REFRESH_TOKEN_TYPE)
