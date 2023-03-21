-- cat names that have german translation but not english
SELECT
  c1.category_id, c1.language AS de_lang, c1.name as de_name, c2.language AS en_lang, c2.name AS en_name
FROM
  category_names c1

LEFT JOIN
  category_names c2
ON
  c1.category_id = c2.category_id
AND
  c2.language = 'en'

WHERE
  c2.language IS NULL
AND
  c1.language = 'de'

LIMIT 50;