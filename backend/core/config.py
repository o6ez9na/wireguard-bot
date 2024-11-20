from pydantic_settings import BaseSettings
from pydantic import BaseModel
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent


class AuthJWT(BaseModel):
    private_key_path: Path = BASE_DIR / "auth" / "keys" / "jwt-private.pem"
    public_key_path: Path = BASE_DIR / "auth" / "keys" / "jwt-public.pem"

    algorithm: str = "RS256"
    access_token_expire_minutes: int = 3


class Settings(BaseSettings):
    user: str = "postgres"
    password: str = "postgres"
    host: str = "185.65.202.185"
    port: str = "5432"
    db_name: str = "wireguard"

    auth_jwt: AuthJWT = AuthJWT()

    db_url: str = \
        f"postgresql+asyncpg://{user}:{password}@{host}:{port}/{db_name}"

    db_echo: bool = True


settings = Settings()
