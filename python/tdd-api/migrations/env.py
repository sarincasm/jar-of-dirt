import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import engine_from_config, pool

from tdd_api import models

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Modify the database URLs in the Alembic config
config.set_section_option("devdb", "sqlalchemy.url", os.environ.get("DEV_DATABASE_URL"))
config.set_section_option(
    "testdb", "sqlalchemy.url", os.environ.get("TEST_DATABASE_URL")
)
config.set_section_option(
    "integrationtestdb",
    "sqlalchemy.url",
    "postgresql+psycopg2://postgres:postgres@127.0.0.1:5435/inventory",
)

target_metadata = models.Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    connectable = engine_from_config(
        context.config.get_section(context.config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
