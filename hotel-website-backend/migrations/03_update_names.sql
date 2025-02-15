-- Update existing records to set first_name and last_name from full_name if they are empty
UPDATE users 
SET 
  first_name = CASE 
    WHEN first_name IS NULL OR first_name = '' THEN 
      SPLIT_PART(full_name, ' ', 1)
    ELSE first_name 
  END,
  last_name = CASE 
    WHEN last_name IS NULL OR last_name = '' THEN 
      SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1)
    ELSE last_name 
  END
WHERE (first_name IS NULL OR first_name = '' OR last_name IS NULL OR last_name = '');
