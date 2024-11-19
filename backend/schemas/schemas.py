from pydantic import BaseModel, ConfigDict
from typing import Annotated
from annotated_types import MinLen, MaxLen


class UserBase(BaseModel):
    name: Annotated[str, MinLen(3), MaxLen(20)]
    telegram_id: str
    password: Annotated[str, MinLen(8)]
    public_key: str
    private_key: str
    config: str
    description: str


class UserCreate(UserBase):
    pass


class UserUpdate(UserCreate):
    pass


class UserUpdateParital(UserCreate):
    name: Annotated[str, MinLen(3), MaxLen(20)] | None = None
    telegram_id: str | None = None
    password: Annotated[str, MinLen(8)] | None = None
    public_key: str | None = None
    private_key: str | None = None
    config: str | None = None
    description: str | None = None


class User(UserCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
