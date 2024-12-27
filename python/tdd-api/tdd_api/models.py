from sqlalchemy import Column, Integer, String, Boolean

from .db_connection import Base


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100))
    slug = Column(String(120))
    is_active = Column(Boolean)
    level = Column(Integer)
    parent_id = Column(Integer)
