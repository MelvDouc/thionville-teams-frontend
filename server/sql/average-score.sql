SELECT
  AVG(roster.result) AS average
FROM
  roster
  JOIN player ON player.id = roster.playerId
WHERE
  player.id = ?