import os

import pytest
from sqlalchemy import create_engine

from tests.utils.docker_utils import start_database_container
from tests.utils.database_utils import migrate_to_db


@pytest.fixture(scope="session", autouse=True)
def db_session():
    container = start_database_container()

    engine = create_engine(os.getenv("TEST_DATABASE_URL"))

    with engine.begin() as connection:
        migrate_to_db("migrations/", "alembic.ini", connection)

    # cleanup
    container.stop()
    container.remove()
