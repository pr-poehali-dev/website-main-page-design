-- Update demo user password to hashed version for login test
-- Password: demopass123
-- Hash (SHA256 with salt 'poehali_salt_2025'): calculated hash
UPDATE users 
SET password_hash = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
WHERE email = 'demo@example.com';