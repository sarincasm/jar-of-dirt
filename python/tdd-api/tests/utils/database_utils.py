import alembic.config
from alembic import command


def migrate_to_db(
    script_location,
    alembic_ini_path="alembic.ini",
    connection=None,
    revision="head",
    section="testdb",
):
    config = alembic.config.Config(alembic_ini_path)
    if connection:
        config.config_ini_section = section
        command.upgrade(config, revision)
