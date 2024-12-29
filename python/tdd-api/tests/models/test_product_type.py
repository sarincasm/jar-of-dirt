from sqlalchemy import Integer, String


def test_model_structure_table_exists(db_inspector):
    assert db_inspector.has_table("product_type")


def test_model_structure_column_data_types(db_inspector):
    table_name = "product_type"
    columns = {
        columns["name"]: columns for columns in db_inspector.get_columns(table_name)
    }

    assert isinstance(columns["id"]["type"], Integer)
    assert isinstance(columns["name"]["type"], String)
    assert isinstance(columns["level"]["type"], Integer)
    assert isinstance(columns["parent_id"]["type"], Integer)


def test_model_structure_nullable_constraints(db_inspector):
    table_name = "product_type"
    columns = db_inspector.get_columns(table_name)

    expected_nullable = {
        "id": False,
        "name": False,
        "level": False,
        "parent_id": True,
    }

    for column in columns:
        column_name = column["name"]
        assert column["nullable"] == expected_nullable.get(
            column_name
        ), f"column '{column_name}' is not nullable as expected"


def test_model_structure_column_lengths(db_inspector):
    table_name = "product_type"
    columns = {
        columns["name"]: columns for columns in db_inspector.get_columns(table_name)
    }

    assert columns["name"]["type"].length == 100


def test_model_structure_unique_constraints(db_inspector):
    table_name = "product_type"
    constraints = db_inspector.get_unique_constraints(table_name)

    assert any(
        constraint["name"] == "uq_product_type_name_level" for constraint in constraints
    )
