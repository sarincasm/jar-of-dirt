def test_condition_is_true():
    assert True


def test_model_structure_table_exists(db_inspector):
    assert db_inspector.has_table("category")
