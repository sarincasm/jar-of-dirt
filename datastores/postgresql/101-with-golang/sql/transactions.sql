BEGIN;

INSERT INTO ingredients (title, type) VALUES ('whiskey', 'other');
INSERT INTO ingredients (title, type) VALUES ('simple syrup', 'other');

INSERT INTO recipes (title, body) VALUES ('old fashioned', 'mmmmmmm old fashioned');

INSERT INTO recipe_ingredients
  (recipe_id, ingredient_id)
VALUES
  (
    (SELECT recipe_id FROM recipes where title='old fashioned'),
    (SELECT id FROM ingredients where title='whiskey')
  ),
  (
    (SELECT recipe_id FROM recipes where title='old fashioned'),
    (SELECT id FROM ingredients where title='simple syrup')
  );

COMMIT;

-- using variables
BEGIN WORK;

DO $$
DECLARE champagne INTEGER;
DECLARE orange_juice INTEGER;
DECLARE mimosa INTEGER;
BEGIN

INSERT INTO ingredients (title, type) VALUES ('champage', 'other') RETURNING id INTO champagne;
INSERT INTO ingredients (title, type) VALUES ('orange_juice', 'other') RETURNING id INTO orange_juice;

INSERT INTO recipes (title, body) VALUES ('mimosa', 'brunch anyone?') RETURNING recipe_id INTO mimosa;

INSERT INTO recipe_ingredients
  (recipe_id, ingredient_id)
VALUES
  (mimosa, champagne),
  (mimosa, orange_juice);

END $$;

COMMIT WORK;
