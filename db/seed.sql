CREATE TABLE helo_users
(
    helo_users_id SERIAL PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    password VARCHAR(50) NOT NULL,
    profile_pic TEXT
);
CREATE TABLE helo_posts
(
    helo_posts_id SERIAL PRIMARY KEY,
    title VARCHAR(45) NOT NULL,
    content TEXT,
    img TEXT,
    author_id INTEGER REFERENCES helo_users(helo_users_id),
    date_created TIMESTAMP
);