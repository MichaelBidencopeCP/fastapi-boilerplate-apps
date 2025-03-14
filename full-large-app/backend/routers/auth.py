from fastapi import APIRouter

from datetime import datetime
from firebase_admin import auth
from sqlmodel import select

from ..dependencies import FirebaseUserDep, SessionDep
from ..models import User
from ..project_types.auth_types import Signup

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)


@router.get("/user")
def get_user(user: FirebaseUserDep,session:SessionDep):
    
    exists = select(User.username, User.first_name, User.last_name).where(User.id == user['uid'])
    signup = session.exec(exists).first()
    if not signup:
        return {
            "message": "finish signup",
            "signup": True
        }
    user.update({
        "username": signup.username,
        "first_name": signup.first_name,
        "last_name": signup.last_name
    })
    return user



@router.post("/user")
def signup(user: FirebaseUserDep, session:SessionDep, userInfo:Signup):
    user = User(
        id=user['uid'],
        username=userInfo.username,
        first_name=userInfo.first_name,
        last_name=userInfo.last_name,
        last_updated=datetime.now()
    )
    session.add(user)
    session.commit()
    return user


