from sqlalchemy.orm import Mapped

from .base import Base


class UserBase(Base):
    __abstract__ = True

    name: Mapped[str]
    password: Mapped[str]
    description: Mapped[str]
    telegram_id: Mapped[str]
    public_key: Mapped[str]
    private_key: Mapped[str]
    config: Mapped[str]


class Client(UserBase):
    pass


class Admin(UserBase):
    pass
