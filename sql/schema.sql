-- Your schema DDL (create table statements) goes here 
DROP TABLE IF EXISTS human;

-- table for people, if i can figure out authentication via database
CREATE TABLE human(email VARCHAR(32), info jsonb);