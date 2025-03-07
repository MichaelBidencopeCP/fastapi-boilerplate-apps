
from fastapi import APIRouter

router = APIRouter(
    prefix="/home",
    tags=["home"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def home() -> dict:
    """
        Home route
    """
    return {"message": "Hello World"}

