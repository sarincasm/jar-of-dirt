import uvicorn
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def hello():
    return {"Hello": "World"}


def start():
    uvicorn.run("tdd_api.main:app", host="0.0.0.0", port=8000, reload=True)
