-- Your insert statements go here
DELETE FROM human;

-- table for people, if i can figure out authentication via the database
INSERT INTO human(email, info) VALUES('molly@books.com', '{"email": "molly@books.com","password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y","roles": ["member"],"name": "Molly Member"}');
INSERT INTO human(email, info) VALUES('anna@books.com', '{"email": "anna@books.com","password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze","roles": ["member", "admin"],"name": "Anna Admin"}');
INSERT INTO human(email, info) VALUES('nobby@books.com', '{"email": "nobby@books.com","password": "$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm","roles": [],"name": "Nobby Nobody"}');

DELETE FROM people;

--people schema
/*
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
*/

INSERT INTO people (id, name, gender, other_gender, email, password, age, application_type, is_ucsc_student, other_school, current_company)
VALUES
  ('86cbd2ec-ccbb-4eb3-aa99-2e8415f9d302', 'John Doe', 'Male', NULL, 'john.doe@example.com', crypt('password1', gen_salt('bf')), '25', 'Hacker', true, NULL, NULL),
  ('2330c6d8-2bdb-4a5e-b4f9-091207f7f383', 'Jane Smith', 'Female', NULL, 'jane.smith@example.com', crypt('password2', gen_salt('bf')), '30', 'Judge', false, NULL, 'Company A'),
  ('6817e4c6-2ca6-4669-8056-50953f781be4', 'Mike Johnson', 'Male', NULL, 'mike.johnson@example.com', crypt('password3', gen_salt('bf')), '40', 'Hacker', true, 'Other School', NULL);
