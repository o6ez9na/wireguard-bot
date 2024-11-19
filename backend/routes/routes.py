from schemas.schemas import CreateUser
from fastapi import APIRouter
from crud import crud
router = APIRouter(prefix='/user', tags=["Users"])


@router.post("/create/")
def create_user(user: CreateUser):
    return crud.create_user(user_in=user)
