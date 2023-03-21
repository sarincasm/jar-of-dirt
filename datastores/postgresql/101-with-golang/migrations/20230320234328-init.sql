
-- +migrate Up
ALTER TABLE ingredients
ADD CONSTRAINT type_enums
CHECK
  (type IN ('meat','fruit','vegetable','other'));

-- +migrate Down
