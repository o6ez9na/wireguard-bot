from .base import Base
from sqlalchemy.orm import Mapped


class Clients(Base):
    __tablename__ = 'clients'

    name: Mapped[str]
    description: Mapped[str]
    telegram_id: Mapped[str]
    public_key: Mapped[str]
    private_key: Mapped[str]
    config: Mapped[str]
