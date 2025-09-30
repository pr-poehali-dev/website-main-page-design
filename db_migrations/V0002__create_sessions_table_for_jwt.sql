-- Create sessions table for JWT tokens and refresh tokens
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    access_token VARCHAR(500) NOT NULL UNIQUE,
    refresh_token VARCHAR(500) NOT NULL UNIQUE,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on user_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);

-- Create index on access_token for faster validation
CREATE INDEX IF NOT EXISTS idx_sessions_access_token ON sessions(access_token);

-- Create index on expires_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions(expires_at);

-- Add column for storing hashed passwords with bcrypt
ALTER TABLE users 
ALTER COLUMN password_hash TYPE VARCHAR(500);