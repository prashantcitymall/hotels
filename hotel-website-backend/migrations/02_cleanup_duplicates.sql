-- Delete duplicate entries keeping only the latest one for each phone number
WITH KeepRows AS (
  SELECT id
  FROM (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY phone ORDER BY created_at DESC) as rn
    FROM users
  ) t
  WHERE t.rn = 1
)
DELETE FROM users
WHERE id NOT IN (SELECT id FROM KeepRows);
