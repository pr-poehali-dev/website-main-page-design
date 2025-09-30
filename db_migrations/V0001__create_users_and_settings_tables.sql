-- Create users table for storing user settings
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    phone_verified BOOLEAN DEFAULT FALSE,
    password_hash VARCHAR(255) NOT NULL,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    telegram_connected BOOLEAN DEFAULT FALSE,
    telegram_username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_settings table for additional settings
CREATE TABLE IF NOT EXISTS user_settings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
    sitemap_enabled BOOLEAN DEFAULT TRUE,
    image_quality INTEGER DEFAULT 85 CHECK (image_quality >= 1 AND image_quality <= 100),
    panel_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- Create index on email for faster authentication
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Insert demo user for testing
INSERT INTO users (email, phone, phone_verified, password_hash, two_factor_enabled, telegram_connected, telegram_username)
VALUES (
    'demo@example.com',
    '+79991234567',
    TRUE,
    '$2b$10$demo_hashed_password',
    FALSE,
    FALSE,
    NULL
) ON CONFLICT (email) DO NOTHING;

-- Insert default settings for demo user
INSERT INTO user_settings (user_id, sitemap_enabled, image_quality, panel_enabled)
SELECT id, TRUE, 85, TRUE
FROM users
WHERE email = 'demo@example.com'
ON CONFLICT (user_id) DO NOTHING;