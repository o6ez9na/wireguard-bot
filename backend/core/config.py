from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    user: str = "postgres"
    password: str = "postgres"
    host: str = "185.65.202.185"
    port: str = "5432"
    db_name: str = "wireguard"

    db_url: str = \
        f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{db_name}"

    db_echo: bool = True


settings = Settings()
