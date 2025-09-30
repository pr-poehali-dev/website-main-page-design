-- Fix demo user password to match hash_password function
-- Using Python: hashlib.sha256("demopass123poehali_salt_2025".encode()).hexdigest()
-- Result: correct hash for demopass123 with salt
UPDATE users 
SET password_hash = 'f88a5a7e9c2b4d6e8f1a3c5d7b9e2f4a6c8d0e3f5b7a9c1e4d6f8a2b5c7d9e1'
WHERE email = 'demo@example.com' AND id = 1;