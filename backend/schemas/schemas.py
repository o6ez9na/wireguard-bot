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


class UserUpdatePartial(UserCreate):
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

######################################################
class ClientBase(UserBase):
    pass


class ClientCreate(UserBase):
    pass


class ClientUpdate(UserCreate):
    pass


class ClientUpdatePartial(UserCreate):
   pass
######################################################

class Client(UserCreate):
    pass

class AdminBase(UserBase):
    pass

class AdminCreate(UserBase):
    pass

class AdminUpdate(UserCreate):
    pass

class AdminUpdatePartial(UserCreate):
    pass

class Admin(UserCreate):
    pass