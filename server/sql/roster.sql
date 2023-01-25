SELECT
  player.ffeId,
  CONCAT(firstName, " ", UPPER(lastName)) AS fullName,
  CONCAT(board, IF(isWhite = (board % 2 = 1), "B", "N")) AS boardAndColor
FROM
  roster
  JOIN player ON roster.playerId = player.id
  JOIN tchMatch ON roster.matchId = tchMatch.id
WHERE
  tchMatch.id = ?
ORDER BY
  player.rating DESC