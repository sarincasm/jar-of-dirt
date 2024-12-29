from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    UniqueConstraint,
    text,
    Text,
    DateTime,
    Enum,
    ForeignKey,
    func,
    Float,
    DECIMAL,
)
from sqlalchemy.dialects.postgresql import UUID

from .db_connection import Base


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    slug = Column(String(120), nullable=False)
    is_active = Column(Boolean, nullable=False)
    level = Column(Integer, nullable=False)
    parent_id = Column(Integer, ForeignKey("category.id"), nullable=True)

    #  alembic cannot auto detect - CheckConstraint & default server values

    __table_args__ = (
        UniqueConstraint("name", "level", name="uq_category_name_level"),
        UniqueConstraint("slug", name="uq_category_slug"),
    )


class Product(Base):
    __tablename__ = "product"

    id = Column(Integer, primary_key=True, nullable=False)
    pid = Column(
        UUID(as_uuid=True),
        nullable=False,
        server_default=text("uuid_generate_v4()"),
    )
    name = Column(String(200), nullable=False)
    slug = Column(String(220), nullable=False)
    description = Column(Text, nullable=True)
    is_digital = Column(Boolean, nullable=False, default=False, server_default="False")
    created_at = Column(
        DateTime, server_default=text("CURRENT_TIMESTAMP"), nullable=False
    )
    updated_at = Column(
        DateTime,
        server_default=text("CURRENT_TIMESTAMP"),
        onupdate=func.now(),
        nullable=False,
    )
    is_active = Column(Boolean, nullable=False, default=False, server_default="False")
    stock_status = Column(
        Enum("oos", "is", "obo", name="status_enum"),
        nullable=False,
        server_default="oos",
    )
    category_id = Column(Integer, ForeignKey("category.id"), nullable=False)
    seasonal_id = Column(Integer, ForeignKey("seasonal_event.id"), nullable=True)

    __table_args__ = (
        UniqueConstraint("name", name="uq_product_name"),
        UniqueConstraint("slug", name="uq_product_slug"),
        UniqueConstraint("pid", name="uq_product_pid"),
    )


class ProductLine(Base):
    __tablename__ = "product_line"

    id = Column(Integer, primary_key=True, nullable=False)
    price = Column(DECIMAL(5, 2), nullable=False)
    sku = Column(
        UUID(as_uuid=True),
        nullable=False,
        server_default=text("uuid_generate_v4()"),
    )
    stock_qty = Column(Integer, nullable=False, default=0, server_default="0")
    is_active = Column(Boolean, nullable=False, default=False, server_default="False")
    order = Column(Integer, nullable=False)
    weight = Column(
        Float,
        nullable=False,
    )
    created_at = Column(
        DateTime, server_default=text("CURRENT_TIMESTAMP"), nullable=False
    )
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "order", "product_id", name="uq_product_line_order_product_id"
        ),
        UniqueConstraint("sku", name="uq_product_line_sku"),
    )


class ProductImage(Base):
    __tablename__ = "product_image"

    id = Column(Integer, primary_key=True, nullable=False)
    alternative_text = Column(String(100), nullable=False)
    url = Column(String(100), nullable=False)
    order = Column(Integer, nullable=False)
    product_line_id = Column(Integer, ForeignKey("product_line.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "order", "product_line_id", name="uq_product_image_order_product_line_id"
        ),
    )


class SeasonalEvent(Base):
    __tablename__ = "seasonal_event"

    id = Column(Integer, primary_key=True, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    name = Column(String(100), nullable=False)

    __table_args__ = (UniqueConstraint("name", name="uq_seasonal_event_name"),)


class Attribute(Base):
    __tablename__ = "attribute"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(String(100), nullable=True)

    __table_args__ = (UniqueConstraint("name", name="uq_attribute_name"),)


class ProductType(Base):
    __tablename__ = "product_type"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String(100), nullable=False)
    level = Column(
        Integer,
        nullable=False,
    )
    parent_id = Column(Integer, ForeignKey("product_type.id"), nullable=True)

    __table_args__ = (
        UniqueConstraint("name", "level", name="uq_product_type_name_level"),
    )


class AttributeValue(Base):
    __tablename__ = "attribute_value"

    id = Column(Integer, primary_key=True, nullable=False)
    attribute_value = Column(String(100), nullable=False)
    attribute_id = Column(Integer, ForeignKey("attribute.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "attribute_value", "attribute_id", name="uq_attribute_value_attribute_id"
        ),
    )


class ProductLineAttributeValue(Base):
    __tablename__ = "product_line_attribute_value"

    id = Column(Integer, primary_key=True, nullable=False)
    attribute_value_id = Column(
        Integer, ForeignKey("attribute_value.id"), nullable=False
    )
    product_line_id = Column(Integer, ForeignKey("product_line.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "attribute_value_id",
            "product_line_id",
            name="uq_product_line_attribute_value",
        ),
    )


class ProductProductType(Base):
    __tablename__ = "product_product_type"

    id = Column(Integer, primary_key=True, nullable=False)
    product_type_id = Column(Integer, ForeignKey("product_type.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("product.id"), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            "product_type_id",
            "product_id",
            name="uq_product_id_product_type_id",
        ),
    )
