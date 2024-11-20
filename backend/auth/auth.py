from auth.helpers import create_access_token, create_refresh_token, validate_admin
from auth.dependencies import http_bearer, get_current_auth_admin, get_current_auth_user_for_refresh
from fastapi import APIRouter, Depends
from schemas.schemas import TokenInfo, Admin


router = APIRouter(dependencies=[Depends(http_bearer)])


@ router.post('/login/', response_model=TokenInfo)
def auth_admin_issue_jwt(
    admin: Admin = Depends(validate_admin)
):
    access_token = create_access_token(admin)
    refresh_token = create_refresh_token(admin)
    return TokenInfo(
        access=access_token,
        refresh=refresh_token
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
        access=access_token,
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
