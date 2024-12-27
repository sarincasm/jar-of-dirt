from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    UniqueConstraint,
)

from .db_connection import Base


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    slug = Column(String(120), nullable=False)
    is_active = Column(Boolean, nullable=False)
    level = Column(Integer, nullable=False)
    parent_id = Column(Integer, nullable=True)

    #  alembic cannot auto detect - CheckConstraint & default server values

    __table_args__ = (
        UniqueConstraint("name", "level", name="uq_category_name_level"),
        UniqueConstraint("slug", name="uq_category_slug"),
    )
