SELECT
  CONCAT(board, IF(isWhite = (board % 2 = 1), "B", "N")) AS boardAndColor,
  CONCAT(firstName, " ", UPPER(lastName)) AS fullName,
  result,
  team.name AS opponent
FROM
  roster
  JOIN player ON player.id = roster.playerId
  JOIN tchMatch ON tchMatch.id = roster.matchId
  JOIN team ON team.id = tchMatch.opponentId
WHERE
  tchMatch.id = ?