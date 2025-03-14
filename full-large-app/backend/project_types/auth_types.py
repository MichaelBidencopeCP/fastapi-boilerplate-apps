from pydantic import BaseModel
#Auth Pydantic Types

class Signup(BaseModel):
    username: str
    first_name: str
    last_name: str

