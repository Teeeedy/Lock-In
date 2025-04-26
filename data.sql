DROP TABLE IF EXISTS study_session;
DROP TABLE IF EXISTS follows;
DROP TABLE IF EXISTS users;


-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL
);

-- Follows table
CREATE TABLE follows (
    following_user_id INTEGER NOT NULL,
    followed_user_id INTEGER NOT NULL,
    PRIMARY KEY (following_user_id, followed_user_id),
    FOREIGN KEY (following_user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followed_user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Study sessions table
CREATE TABLE study_session (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    session_seconds INTEGER NOT NULL,
    session_date DATE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
