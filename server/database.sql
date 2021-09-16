CREATE DATABASE todly;
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(500),
);