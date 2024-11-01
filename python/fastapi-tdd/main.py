from fastapi import FastAPI

from pydantic import BaseModel
from typing import Dict


class Book(BaseModel):
    id: int
    title: str
    author: str
    availability: bool


class FakeDB:
    def __init__(self):
        self.data: Dict[int, Book] = {}

    def get_book(self, id: int) -> Book:
        return self.data.get(id)


db = FakeDB()
db.data = {1: Book(id=1, title="1984", author="George Orwell", availability=True)}

app = FastAPI()


@app.get("/books/{id}", response_model=Book)
def read_book(id: int):
    return db.get_book(id)
