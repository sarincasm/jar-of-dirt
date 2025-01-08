import uvicorn
from fastapi import FastAPI

from tdd_api.routes import category_routes

app = FastAPI()


@app.get("/")
def hello():
    return {"Hello": "World"}


app.include_router(category_routes.router, prefix="/api/category", tags=["Category"])


def start():
    uvicorn.run("tdd_api.main:app", host="0.0.0.0", port=8000, reload=True)
