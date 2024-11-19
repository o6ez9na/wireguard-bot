from sqlalchemy.orm import Mapped

from .base import Base


class Client(Base):
    name: Mapped[str]
    password: Mapped[str]
    description: Mapped[str]
    telegram_id: Mapped[str]
    public_key: Mapped[str]
    private_key: Mapped[str]
    config: Mapped[str]
