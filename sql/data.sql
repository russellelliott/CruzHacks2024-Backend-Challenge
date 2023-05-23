-- Your insert statements go here
DELETE FROM human;

-- table for people, if i can figure out authentication via the database
INSERT INTO human(email, info) VALUES('molly@books.com', '{"email": "molly@books.com","password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y","roles": ["member"],"name": "Molly Member"}');
INSERT INTO human(email, info) VALUES('anna@books.com', '{"email": "anna@books.com","password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze","roles": ["member", "admin"],"name": "Anna Admin"}');
INSERT INTO human(email, info) VALUES('nobby@books.com', '{"email": "nobby@books.com","password": "$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm","roles": [],"name": "Nobby Nobody"}');

DELETE FROM people;

INSERT INTO people (id, name, gender, other_gender, email, password, age, application_type, is_ucsc_student, other_school, current_company) VALUES ('86cbd2ec-ccbb-4eb3-aa99-2e8415f9d302', 'Molly Member', 'Male', NULL, 'molly@books.com', crypt('mollymember', gen_salt('bf')), '25', 'Hacker', true, NULL, NULL);

INSERT INTO people (id, name, gender, other_gender, email, password, age, application_type, is_ucsc_student, other_school, current_company) VALUES ('2330c6d8-2bdb-4a5e-b4f9-091207f7f383', 'Anna Admin', 'Female', NULL, 'anna@books.com', crypt('annaadmin', gen_salt('bf')), '30', 'Judge', false, NULL, 'Company A');

INSERT INTO people (id, name, gender, other_gender, email, password, age, application_type, is_ucsc_student, other_school, current_company) VALUES ('6817e4c6-2ca6-4669-8056-50953f781be4', 'Nobby Nobody', 'Male', NULL, 'nobby@books.com', crypt('nobbynobody', gen_salt('bf')), '40', 'Hacker', true, 'Other School', NULL);
