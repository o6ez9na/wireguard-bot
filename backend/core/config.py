from pydantic_settings import BaseSettings
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent


class Settings(BaseSettings):
    user: str = "postgres"
    password: str = "postgres"
    host: str = "192.168.1.248"
    port: str = "5432"
    db_name: str = "wireguard"

    db_url: str = \
        f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{db_name}"

    db_echo: bool = True


settings = Settings()
