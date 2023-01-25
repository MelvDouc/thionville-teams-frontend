SELECT
  tchMatch.id AS id,
  tchMatch.round AS round,
  whiteTeamId,
  wTeam.name AS whiteTeam,
  blackTeamId,
  bTeam.name AS blackTeam,
  IF(
    whiteTeamId = homeTeamId,
    wTeam.address,
    bTeam.address
  ) AS address,
  IF(whiteTeamId = homeTeamId, wTeam.city, bTeam.city) AS city,
  IF(whiteTeamId = homeTeamId, wTeam.zip, bTeam.zip) AS zip,
  tchMatch.date
FROM
  tchMatch
  JOIN team wTeam ON wTeam.id = whiteTeamId
  JOIN team bTeam ON bTeam.id = blackTeamId
WHERE
  tchMatch.id = ?
LIMIT
  1