
-- +migrate Up
ALTER TABLE ingredients
ADD COLUMN image VARCHAR ( 255 ),
ADD COLUMN type VARCHAR ( 50 ) NOT NULL DEFAULT 'vegetable';

-- +migrate Down
ALTER TABLE ingredients
DROP COLUMN image,
DROP COLUMN type;
