from fastapi import FastAPI

from backend.routers import home

app = FastAPI()

app.include_router(home.router)



