-- which movies made the most money
SELECT
  name, revenue
FROM
  movies
ORDER BY
  COALESCE(revenue, 0) DESC
LIMIT 5;

-- revenue of movies with keanu reaves
SELECT
  SUM(m.revenue) AS total
FROM
  movies m

INNER JOIN
  casts c
ON
  m.id = c.movie_id

INNER JOIN
  people p
ON
  c.person_id = p.id

WHERE
  p.name = 'Keanu Reeves';

-- 5 people in the movies that had the most revenue
SELECT
  p.name, SUM(m.revenue) AS total
FROM
  movies m

INNER JOIN
  casts c
ON
  m.id = c.movie_id

INNER JOIN
  people p
ON
  c.person_id = p.id

GROUP BY
  p.id, p.name

ORDER BY
  total DESC
  NULLS LAST

LIMIT 5;

-- 10 movies with the most keywords
SELECT
  m.name, COUNT(c.id) AS count
FROM
  movies m

INNER JOIN
  movie_keywords mk
ON
  mk.movie_id = m.id

INNER JOIN
  categories c
ON
  mk.category_id = c.id

GROUP BY
  m.id, m.name

ORDER BY
  count DESC

LIMIT 10;

-- category associated with the most movies
SELECT
  c.name, COUNT(mk.category_id) AS count
FROM
  movie_keywords mk

INNER JOIN
  categories c
ON
  c.id = mk.category_id

GROUP BY
  c.name, mk.category_id

ORDER BY
  count DESC

LIMIT 5;
