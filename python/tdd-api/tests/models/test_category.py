from sqlalchemy import Integer, String, Boolean


def test_condition_is_true():
    assert True


def test_model_structure_table_exists(db_inspector):
    assert db_inspector.has_table("category")


def test_model_structure_table_column_types(db_inspector):
    table_name = "category"
    columns = {
        columns["name"]: columns for columns in db_inspector.get_columns(table_name)
    }

    assert isinstance(columns["id"]["type"], Integer)
    assert isinstance(columns["name"]["type"], String)
    assert isinstance(columns["slug"]["type"], String)
    assert isinstance(columns["is_active"]["type"], Boolean)
    assert isinstance(columns["level"]["type"], Integer)
    assert isinstance(columns["parent_id"]["type"], Integer)
