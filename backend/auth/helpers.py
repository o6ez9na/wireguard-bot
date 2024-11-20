from schemas.schemas import Admin
from auth import utils
from core.config import settings
from datetime import timedelta
from fastapi import Depends, Form, HTTPException, status
from jwt.exceptions import InvalidTokenError
from fastapi.security import OAuth2PasswordBearer


TOKEN_TYPE_FIELD = "token"
ACCESS_TOKEN_TYPE = "access"
REFRESH_TOKEN_TYPE = "refresh"
