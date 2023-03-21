-- add a column to each row
SELECT
  name, kind, vote_average, AVG(vote_average) OVER () AS all_average
FROM
  movies
LIMIT 50;

-- average over kind
SELECT
  name, kind, vote_average, AVG(vote_average) OVER (PARTITION BY kind) AS kind_average
FROM
  movies
LIMIT 50;

SELECT DISTINCT
  kind, AVG(vote_average) OVER (PARTITION BY kind) AS kind_vote_average
FROM movies;
