from sqlalchemy import Integer


def test_model_structure_table_exists(db_inspector):
    assert db_inspector.has_table("product_line_attribute_value")


def test_model_structure_column_data_types(db_inspector):
    table_name = "product_line_attribute_value"
    columns = {
        columns["name"]: columns for columns in db_inspector.get_columns(table_name)
    }

    assert isinstance(columns["id"]["type"], Integer)
    assert isinstance(columns["product_line_id"]["type"], Integer)
    assert isinstance(columns["attribute_value_id"]["type"], Integer)


def test_model_structure_foreign_key(db_inspector):
    table_name = "product_line_attribute_value"
    foreign_keys = db_inspector.get_foreign_keys(table_name)
    product_line_attribute_value_foreign_key = next(
        (
            fk
            for fk in foreign_keys
            if set(fk["constrained_columns"]) == {"product_line_id"}
            or set(fk["constrained_columns"]) == {"attribute_value_id"}
        ),
        None,
    )
    assert product_line_attribute_value_foreign_key is not None


def test_model_structure_nullable_constraints(db_inspector):
    table_name = "product_line_attribute_value"
    columns = db_inspector.get_columns(table_name)

    expected_nullable = {
        "id": False,
        "attribute_value_id": False,
        "product_line_id": False,
    }

    for column in columns:
        column_name = column["name"]
        assert column["nullable"] == expected_nullable.get(
            column_name
        ), f"column '{column_name}' is not nullable as expected"


def test_model_structure_unique_constraints(db_inspector):
    table_name = "product_line_attribute_value"
    constraints = db_inspector.get_unique_constraints(table_name)

    assert any(
        constraint["name"] == "uq_product_line_attribute_value"
        for constraint in constraints
    )
