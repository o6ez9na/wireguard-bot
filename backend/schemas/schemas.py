from pydantic import BaseModel, ConfigDict
from typing import Annotated
from annotated_types import MinLen, MaxLen


class UserCreate(BaseModel):
    name: Annotated[str, MinLen(3), MaxLen(20)]
    telegram_id: str
    password: Annotated[str, MinLen(8)]
    public_key: str
    private_key: str
    config: str
    description: str


class User(UserCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
