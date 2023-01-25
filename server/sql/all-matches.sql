SELECT
  tchMatch.id AS id,
  tchMatch.round,
  team.name AS opponent,
  IF(tchMatch.isHome, __address__, team.address) AS address,
  IF(tchMatch.isHome, __city__, team.city) AS city,
  IF(tchMatch.isHome, __zip__, team.zip) AS zip,
  tchMatch.date
FROM
  tchMatch
  JOIN team ON team.id = tchMatch.opponentId