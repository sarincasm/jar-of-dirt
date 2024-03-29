
-- +migrate Up
CREATE TABLE updated_recipes (
  id INT GENERATED ALWAYS AS IDENTITY,
  recipe_id INT,
  old_title VARCHAR (255),
  new_title VARCHAR (255),
  time_of_update TIMESTAMP
);

-- +migrate StatementBegin
CREATE OR REPLACE FUNCTION log_updated_recipe_name()
  RETURNS
    TRIGGER
  LANGUAGE
    'plpgsql'
AS
$$
BEGIN
  IF OLD.title <> NEW.title THEN
    INSERT INTO
      updated_recipes (recipe_id, old_title, new_title, time_of_update)
    VALUES
      (NEW.recipe_id, OLD.title, NEW.title, NOW());
  END IF;
  RETURN NEW;
END;
$$;
-- +migrate StatementEnd

CREATE OR REPLACE TRIGGER updated_recipe_trigger
AFTER UPDATE ON recipes
  FOR EACH ROW EXECUTE PROCEDURE log_updated_recipe_name();

UPDATE recipes SET title = 'Best Cookies' WHERE title = 'Cookies';

-- +migrate Down
DROP TRIGGER updated_recipe_trigger ON recipes;
DROP FUNCTION log_updated_recipe_name();
DROP TABLE updated_recipes;
