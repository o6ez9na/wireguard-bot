from sqlalchemy.orm import Mapped

from .base import Base


class ClientBase(Base):
    __abstract__ = True

    name: Mapped[str]
    description: Mapped[str]
    telegram_id: Mapped[str]
    public_key: Mapped[str]
    private_key: Mapped[str]
    config: Mapped[str]
    is_active: Mapped[bool]


class AdminBase(Base):
    __abstract__ = True

    username: Mapped[str]
    password: Mapped[str]
    telegram_id: Mapped[str]
    public_key: Mapped[str]
    private_key: Mapped[str]
    config: Mapped[str]


class Client(ClientBase):
    pass


class Admin(AdminBase):
    pass
