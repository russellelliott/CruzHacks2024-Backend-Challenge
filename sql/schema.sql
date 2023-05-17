-- Your schema DDL (create table statements) goes here 
DROP TABLE IF EXISTS human;

-- table for people, if i can figure out authentication via database
CREATE TABLE human(email VARCHAR(32), info jsonb);

DROP TABLE IF EXISTS people;

CREATE TABLE people (
  id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(60) NOT NULL,
  gender VARCHAR(10) NOT NULL,
  other_gender VARCHAR(30),
  email VARCHAR(320) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  age VARCHAR(10) NOT NULL,
  application_type VARCHAR(10) NOT NULL,
  is_ucsc_student BOOLEAN,
  other_school VARCHAR(50),
  current_company VARCHAR(50)
);