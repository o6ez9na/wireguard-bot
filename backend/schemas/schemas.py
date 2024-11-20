from pydantic import BaseModel, ConfigDict
from typing import Annotated
from annotated_types import MinLen, MaxLen
from pathlib import Path


class TokenInfo(BaseModel):
    access_token: str
    refresh_token: str | None = None
    token_type: str = "Bearer"


class ClientBase(BaseModel):
    name: Annotated[str, MinLen(3), MaxLen(20)]
    telegram_id: str
    public_key: str
    private_key: str
    config: str
    description: str
    is_active: bool = False


class ClientCreate(ClientBase):
    pass


class ClientUpdate(ClientCreate):
    pass


class ClientUpdatePartial(ClientCreate):
    pass


class Client(ClientCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
######################################################


class AdminBase(BaseModel):
    username: Annotated[str, MinLen(3), MaxLen(20)]
    telegram_id: str
    password: str
    public_key: str
    private_key: str
    config: str


class AdminCreate(AdminBase):
    pass


class AdminUpdate(AdminCreate):
    pass


class AdminUpdatePartial(AdminCreate):
    pass


class Admin(AdminCreate):
    model_config = ConfigDict(from_attributes=True, strict=True)

    id: int
