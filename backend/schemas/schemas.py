from pydantic import BaseModel, EmailStr
from typing import Annotated
from annotated_types import MinLen, MaxLen


class CreateUser(BaseModel):
    email: EmailStr
    name: Annotated[str, MinLen(3), MaxLen(20)]
    password: Annotated[str, MinLen(8)]
