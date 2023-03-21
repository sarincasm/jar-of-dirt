EXPLAIN ANALYZE SELECT * FROM movies WHERE name='Tron Legacy';
EXPLAIN ANALYZE SELECT * FROM movies WHERE id=21103;

EXPLAIN ANALYZE SELECT
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


CREATE INDEX idx_name ON movies(name);

-- Inverted index
CREATE INDEX ON movie_reviews USING gin(scores);
-- Using trigrams
CREATE INDEX ON movies USING gin(name gin_trgm_ops);

-- Partial index
CREATE INDEX idx_en_category_names ON category_names(language) WHERE language = 'en';

-- Index on Derived data
CREATE INDEX idx_movies_profit ON movies (COALESCE((revenue - budget), 0));
