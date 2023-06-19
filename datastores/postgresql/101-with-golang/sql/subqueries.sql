-- find cast of movie
SELECT
  p.name
FROM
  casts c

INNER JOIN
  people p
ON
  c.person_id = p.id

WHERE
  c.movie_id = (
    SELECT
      id
    FROM
      movies
    WHERE
      name = 'Tron Legacy'
  );

-- all keywords for all star wars
-- uses array constructor
SELECT
  m.name,
  ARRAY(
    SELECT
      ecn.name
    FROM
      english_category_names ecn
    INNER JOIN
      movie_keywords mk
    ON
      mk.category_id = ecn.category_id
    WHERE
      m.id = mk.movie_id
    LIMIT 5
  ) AS keywords
FROM
  movies m
WHERE
  name ILIKE '%star wars%';
