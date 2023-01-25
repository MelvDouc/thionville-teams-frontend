SELECT
  ffeId,
  CONCAT(firstName, " ", UPPER(lastName)) AS fullName,
  CONCAT(
    board,
    IF(
      (board % 2 = 1) = (whiteTeamId = player.teamId),
      "B",
      "N"
    )
  ) AS boardAndColor
FROM
  roster
  JOIN player ON roster.playerId = player.id
  JOIN tchMatch ON roster.matchId = tchMatch.id
WHERE
  tchMatch.id = ?
ORDER BY
  player.rating DESC