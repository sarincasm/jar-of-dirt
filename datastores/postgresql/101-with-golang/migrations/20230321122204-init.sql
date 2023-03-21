
-- +migrate Up
ALTER TABLE recipes
ADD COLUMN meta JSONB;

UPDATE
  recipes
SET
  meta='{ "tags": ["chocolate", "dessert", "cake"] }'
WHERE
  recipe_id=16;

UPDATE
  recipes
SET
  meta='{ "tags": ["dessert", "cake"] }'
WHERE
  recipe_id=20;

UPDATE
  recipes
SET
  meta='{ "tags": ["dessert", "fruit"] }'
WHERE
  recipe_id=45;

UPDATE
  recipes
SET
  meta='{ "tags": ["dessert", "fruit"] }'
WHERE
  recipe_id=47;

-- +migrate Down
