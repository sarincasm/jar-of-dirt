# Python FastAPI TDD

Code & notes from [this course](https://www.udemy.com/course/try-fastapi-api-test-driven-development) by Very Academy.

## Setup

```bash
poetry install
```

## Run

```bash
poetry run start
```

## Test

Model tests:

```bash
poetry run pytest -m model
```

Unit tests:

```bash
poetry run pytest -m unit
```

Integration tests:

```bash
poetry run pytest -m integration
```

## Coverage

```bash
poetry run pytest --cov=tdd_api --cov-report=html
```

## PostgreSql Container

Create a `.env` file using the `.env.example` as a template.

```bash
docker compose up -d
```

## Setting up Migrations

```bash
alembic init migrations
```

## Creating a Migration

```bash
alembic -n devdb revision --autogenerate -m "message"
alembic -n devdb upgrade head
```
