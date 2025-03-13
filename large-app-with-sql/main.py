from fastapi import FastAPI
from contextlib import asynccontextmanager

from .routers import test
from .database import create_db_and_tables

# This is a context manager that will run before the app starts and after the app stops
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create the database and tables
    create_db_and_tables()
    yield
    # Close the database connection

app = FastAPI(lifespan=lifespan)

app.include_router(test.router)



