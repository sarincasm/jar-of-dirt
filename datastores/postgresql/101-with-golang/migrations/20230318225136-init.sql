
-- +migrate Up
CREATE TABLE recipes_photos (
  photo_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  url VARCHAR(255) NOT NULL,
  recipe_id INTEGER REFERENCES recipes(recipe_id) ON DELETE CASCADE
);

-- +migrate Down
DROP TABLE recipes_photos;
